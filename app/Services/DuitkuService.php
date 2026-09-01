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
            ?: ($_SERVER['DUITKU_MERCHANT_CODE'] ?? 'DS34863')))
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
     * Create Invoice using Duitku API v2 (Permintaan Transaksi / Inquiry)
     * Docs: https://docs.duitku.com/api/id/?php#permintaan-transaksi
     *
     * Endpoint Production: https://passport.duitku.com/webapi/api/merchant/v2/inquiry
     * Endpoint Sandbox:    https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry
     *
     * Signature formula (VERIFIED WORKING):
     *   $signature = md5($merchantCode . $merchantOrderId . $paymentAmount . $apiKey);
     */
    public function createInvoice(array $params): ?string
    {
        $merchantCode = $this->getMerchantCode();
        $apiKey = $this->getApiKey();

        if (empty($merchantCode)) {
            $merchantCode = 'DS34863';
        }

        if (empty($apiKey)) {
            $apiKey = '1c9e7b636968f30614f3c4824d1851e8';
        }

        $merchantOrderId = (string) $params['order_id'];
        $paymentAmount = (int) $params['amount'];
        $email = trim($params['email']);
        $phoneNumber = trim($params['phone']);
        $customerName = trim($params['name']);
        $productDetails = $params['product_name'] ?? 'Webinar Bedah Landing Page CRO Specialist (Rp79.000)';

        // Split name
        $nameParts = explode(' ', $customerName, 2);
        $firstName = $nameParts[0] ?? 'Customer';
        $lastName = $nameParts[1] ?? '';
        
        $appUrl = rtrim(env('APP_URL') ?: (config('app.url') ?: 'https://pbm-dun.vercel.app'), '/');
        $callbackUrl = $appUrl . '/payment/duitku/callback';
        $returnUrl = $appUrl . '/payment/duitku/finish';

        // --- Duitku API v2 Signature (MD5) ---
        // Formula: md5(merchantCode + merchantOrderId + paymentAmount + apiKey)
        $signature = md5($merchantCode . $merchantOrderId . $paymentAmount . $apiKey);

        // --- Duitku API v2 Request Body ---
        $payload = [
            'merchantCode' => $merchantCode,
            'paymentAmount' => $paymentAmount,
            'paymentMethod' => 'VC',
            'merchantOrderId' => $merchantOrderId,
            'productDetails' => $productDetails,
            'additionalParam' => '',
            'merchantUserInfo' => '',
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
            'signature' => $signature,
            'expiryPeriod' => 1440, // 24 hours in minutes
        ];

        Log::info('Duitku v2 Request', [
            'merchantCode' => $merchantCode,
            'merchantOrderId' => $merchantOrderId,
            'paymentAmount' => $paymentAmount,
            'signature' => $signature,
            'callbackUrl' => $callbackUrl,
            'returnUrl' => $returnUrl,
        ]);

        // Try sandbox first if DS, else passport
        $isSandbox = str_starts_with(strtoupper($merchantCode), 'DS') 
            || (config('services.duitku.env') ?: env('DUITKU_ENV')) === 'sandbox';
        
        $endpoints = $isSandbox
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
                $response = Http::timeout(15)
                    ->withoutVerifying()
                    ->withHeaders([
                        'Content-Type' => 'application/json',
                    ])
                    ->post($url, $payload);

                $httpCode = $response->status();
                $data = $response->json();

                Log::info("Duitku v2 Response from {$url}", [
                    'httpCode' => $httpCode,
                    'response' => $data,
                ]);

                if ($response->successful() && isset($data['paymentUrl']) && !empty($data['paymentUrl'])) {
                    Log::info("Duitku Payment URL created: {$data['paymentUrl']} (reference: " . ($data['reference'] ?? 'N/A') . ")");
                    $this->lastError = null;
                    return $data['paymentUrl'];
                }

                $this->lastError = "HTTP {$httpCode} from {$url}: " . ($data['Message'] ?? $data['statusMessage'] ?? $response->body());
                Log::warning($this->lastError);

            } catch (\Throwable $e) {
                $this->lastError = "Exception connecting to {$url}: " . $e->getMessage();
                Log::error($this->lastError);
            }
        }

        return null;
    }
}
