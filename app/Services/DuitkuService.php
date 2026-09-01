<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DuitkuService
{
    protected string $merchantCode;
    protected string $apiKey;
    protected string $mode;
    protected string $baseUrl;

    public function __construct()
    {
        $this->merchantCode = env('DUITKU_MERCHANT_CODE', '');
        $this->apiKey = env('DUITKU_API_KEY', '1c9e7b636968f30614f3c4824d1851e8');
        $this->mode = env('DUITKU_ENV', 'production'); // 'sandbox' or 'production'

        $this->baseUrl = $this->mode === 'sandbox'
            ? 'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry'
            : 'https://passport.duitku.com/webapi/api/merchant/v2/inquiry';
    }

    /**
     * Create Invoice / Payment URL with Duitku
     */
    public function createInvoice(array $params): ?string
    {
        if (empty($this->merchantCode) || empty($this->apiKey)) {
            Log::warning('Duitku credentials missing: merchant code or API key not set.');
            return null;
        }

        $merchantOrderId = $params['order_id'];
        $paymentAmount = (int) $params['amount'];
        $email = $params['email'];
        $phoneNumber = $params['phone'];
        $customerName = $params['name'];
        $productDetails = $params['product_name'] ?? 'Webinar PBM Agency';
        
        $callbackUrl = env('APP_URL') . '/payment/duitku/callback';
        $returnUrl = env('APP_URL') . '/payment/duitku/finish';

        // Signature format: MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
        $signature = md5($this->merchantCode . $merchantOrderId . $paymentAmount . $this->apiKey);

        $payload = [
            'merchantCode' => $this->merchantCode,
            'paymentAmount' => $paymentAmount,
            'merchantOrderId' => $merchantOrderId,
            'productDetails' => $productDetails,
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'customerVaName' => $customerName,
            'callbackUrl' => $callbackUrl,
            'returnUrl' => $returnUrl,
            'signature' => $signature,
            'expiryPeriod' => 1440, // 24 hours
            'itemDetails' => [
                [
                    'name' => $productDetails,
                    'price' => $paymentAmount,
                    'quantity' => 1,
                ]
            ],
        ];

        try {
            $response = Http::timeout(10)->post($this->baseUrl, $payload);

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['paymentUrl']) && !empty($data['paymentUrl'])) {
                    return $data['paymentUrl'];
                }
                Log::warning('Duitku response missing paymentUrl', ['response' => $data]);
            } else {
                Log::error('Duitku API HTTP error', ['status' => $response->status(), 'body' => $response->body()]);
            }
        } catch (\Exception $e) {
            Log::error('Duitku createInvoice exception: ' . $e->getMessage());
        }

        return null;
    }
}
