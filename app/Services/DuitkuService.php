<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DuitkuService
{
    protected ?string $lastError = null;

    public function getLastError(): ?string
    {
        return $this->lastError;
    }

    protected function getMerchantCode(): string
    {
        return trim(
            config('services.duitku.merchant_code') 
            ?: (getenv('DUITKU_MERCHANT_CODE') 
            ?: ($_ENV['DUITKU_MERCHANT_CODE'] 
            ?: ($_SERVER['DUITKU_MERCHANT_CODE'] ?? '')))
        );
    }

    protected function getApiKey(): string
    {
        return trim(
            config('services.duitku.api_key') 
            ?: (getenv('DUITKU_API_KEY') 
            ?: ($_ENV['DUITKU_API_KEY'] 
            ?: ($_SERVER['DUITKU_API_KEY'] ?? '1c9e7b636968f30614f3c4824d1851e8')))
        );
    }

    /**
     * Create Invoice / Payment URL using Duitku POP API (createInvoice)
     * Docs: https://docs.duitku.com/pop/id/?php#pendahuluan
     */
    public function createInvoice(array $params): ?string
    {
        $merchantCode = $this->getMerchantCode();
        $apiKey = $this->getApiKey();

        if (empty($merchantCode)) {
            $this->lastError = 'DUITKU_MERCHANT_CODE is empty in environment variables.';
            Log::info($this->lastError);
            return null;
        }

        $merchantOrderId = $params['order_id'];
        $paymentAmount = (int) $params['amount'];
        $email = trim($params['email']);
        $phoneNumber = trim($params['phone']);
        $customerName = trim($params['name']);
        $productDetails = $params['product_name'] ?? 'Webinar Bedah Landing Page CRO Specialist (Rp79.000)';

        // Split name into first and last name
        $nameParts = explode(' ', $customerName, 2);
        $firstName = $nameParts[0] ?? 'Customer';
        $lastName = $nameParts[1] ?? $firstName;
        
        $appUrl = rtrim(env('APP_URL') ?: (config('app.url') ?: 'https://pbm-dun.vercel.app'), '/');
        $callbackUrl = $appUrl . '/payment/duitku/callback';
        $returnUrl = $appUrl . '/payment/duitku/finish';

        // 1. Duitku POP Headers: Timestamp in milliseconds & HMAC-SHA256 signature
        $timestamp = (string) round(microtime(true) * 1000);
        $stringToSign = $merchantCode . $timestamp;
        $signature = hash_hmac('sha256', $stringToSign, $apiKey);

        $headers = [
            'Content-Type' => 'application/json',
            'x-duitku-signature' => $signature,
            'x-duitku-timestamp' => $timestamp,
            'x-duitku-merchantcode' => $merchantCode,
        ];

        // 2. Duitku POP Request Body
        $payload = [
            'paymentAmount' => $paymentAmount,
            'merchantOrderId' => (string) $merchantOrderId,
            'productDetails' => $productDetails,
            'additionalParam' => '',
            'merchantUserInfo' => '',
            'paymentMethod' => '',
            'customerVaName' => substr($customerName, 0, 20),
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'itemDetails' => [
                [
                    'name' => substr($productDetails, 0, 50),
                    'price' => $paymentAmount,
                    'quantity' => 1,
                ]
            ],
            'customerDetail' => [
                'firstName' => $firstName,
                'lastName' => $lastName,
                'email' => $email,
                'phoneNumber' => $phoneNumber,
            ],
            'callbackUrl' => $callbackUrl,
            'returnUrl' => $returnUrl,
            'expiryPeriod' => 1440, // 24 hours
        ];

        // Endpoints to try (Production first, fallback to Sandbox or vice-versa)
        $isExplicitSandbox = str_starts_with(strtoupper($merchantCode), 'DS') || env('DUITKU_ENV') === 'sandbox';
        
        $endpoints = $isExplicitSandbox
            ? [
                'https://api-sandbox.duitku.com/api/merchant/createInvoice',
                'https://api-prod.duitku.com/api/merchant/createInvoice',
                'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry',
            ]
            : [
                'https://api-prod.duitku.com/api/merchant/createInvoice',
                'https://api-sandbox.duitku.com/api/merchant/createInvoice',
                'https://passport.duitku.com/webapi/api/merchant/v2/inquiry',
            ];

        foreach ($endpoints as $url) {
            try {
                // If endpoint is legacy v2 inquiry, adjust signature to v2 style
                if (str_contains($url, '/v2/inquiry')) {
                    $v2Signature = hash_hmac('sha256', $merchantCode . $merchantOrderId . $paymentAmount, $apiKey);
                    $v2Payload = array_merge($payload, [
                        'merchantCode' => $merchantCode,
                        'signature' => $v2Signature,
                    ]);
                    $response = Http::timeout(10)->post($url, $v2Payload);
                } else {
                    // Duitku POP createInvoice API with x-duitku-* headers
                    $response = Http::timeout(10)->withHeaders($headers)->post($url, $payload);
                }

                if ($response->successful()) {
                    $data = $response->json();
                    if (isset($data['paymentUrl']) && !empty($data['paymentUrl'])) {
                        Log::info("Duitku POP Payment URL created successfully via {$url} for {$merchantOrderId}: " . $data['paymentUrl']);
                        $this->lastError = null;
                        return $data['paymentUrl'];
                    }
                    $this->lastError = 'Duitku Response: ' . ($data['statusMessage'] ?? json_encode($data));
                    Log::warning($this->lastError, ['endpoint' => $url, 'response' => $data]);
                } else {
                    $this->lastError = "HTTP {$response->status()} from {$url}: " . $response->body();
                    Log::warning($this->lastError);
                }
            } catch (\Throwable $e) {
                $this->lastError = "Exception connecting to {$url}: " . $e->getMessage();
                Log::error($this->lastError);
            }
        }

        return null;
    }
}
