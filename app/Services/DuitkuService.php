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
     * Create Invoice / Payment URL with Duitku API v2
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
        
        $appUrl = rtrim(env('APP_URL') ?: (config('app.url') ?: 'https://pbm-dun.vercel.app'), '/');
        $callbackUrl = $appUrl . '/payment/duitku/callback';
        $returnUrl = $appUrl . '/payment/duitku/finish';

        // Official Duitku v2 Signature: HMAC-SHA256(merchantCode + merchantOrderId + paymentAmount, apiKey)
        $stringToSign = $merchantCode . $merchantOrderId . $paymentAmount;
        $signature = hash_hmac('sha256', $stringToSign, $apiKey);

        $payload = [
            'merchantCode' => $merchantCode,
            'paymentAmount' => $paymentAmount,
            'merchantOrderId' => $merchantOrderId,
            'productDetails' => $productDetails,
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'customerVaName' => substr($customerName, 0, 20),
            'callbackUrl' => $callbackUrl,
            'returnUrl' => $returnUrl,
            'signature' => $signature,
            'expiryPeriod' => 1440, // 24 hours
            'itemDetails' => [
                [
                    'name' => substr($productDetails, 0, 50),
                    'price' => $paymentAmount,
                    'quantity' => 1,
                ]
            ],
            'customerDetail' => [
                'firstName' => $customerName,
                'email' => $email,
                'phoneNumber' => $phoneNumber,
            ],
        ];

        // Endpoints to try (Production & Sandbox)
        $isExplicitSandbox = str_starts_with(strtoupper($merchantCode), 'DS') || env('DUITKU_ENV') === 'sandbox';
        $endpoints = $isExplicitSandbox
            ? [
                'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry',
                'https://passport.duitku.com/webapi/api/merchant/v2/inquiry',
            ]
            : [
                'https://passport.duitku.com/webapi/api/merchant/v2/inquiry',
                'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry',
            ];

        foreach ($endpoints as $url) {
            try {
                $response = Http::timeout(10)->post($url, $payload);

                if ($response->successful()) {
                    $data = $response->json();
                    if (isset($data['paymentUrl']) && !empty($data['paymentUrl'])) {
                        Log::info("Duitku Payment URL created successfully via {$url} for {$merchantOrderId}: " . $data['paymentUrl']);
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
