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
     * Create Invoice / Payment URL with Duitku API v2
     */
    public function createInvoice(array $params): ?string
    {
        if (empty($this->merchantCode) || empty($this->apiKey)) {
            Log::info('Duitku merchant code not set, falling back to WhatsApp flow.');
            return null;
        }

        $merchantOrderId = $params['order_id'];
        $paymentAmount = (int) $params['amount'];
        $email = $params['email'];
        $phoneNumber = $params['phone'];
        $customerName = $params['name'];
        $productDetails = $params['product_name'] ?? 'Webinar Bedah Landing Page CRO Specialist (Rp79.000)';
        
        $appUrl = rtrim(env('APP_URL', 'https://pbm-dun.vercel.app'), '/');
        $callbackUrl = $appUrl . '/payment/duitku/callback';
        $returnUrl = $appUrl . '/payment/duitku/finish';

        // Official Duitku v2 Signature: HMAC-SHA256(merchantCode + merchantOrderId + paymentAmount, apiKey)
        $stringToSign = $this->merchantCode . $merchantOrderId . $paymentAmount;
        $signature = hash_hmac('sha256', $stringToSign, $this->apiKey);

        $payload = [
            'merchantCode' => $this->merchantCode,
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

        try {
            $response = Http::timeout(10)->post($this->baseUrl, $payload);

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['paymentUrl']) && !empty($data['paymentUrl'])) {
                    Log::info("Duitku Payment URL created successfully for {$merchantOrderId}: " . $data['paymentUrl']);
                    return $data['paymentUrl'];
                }
                Log::warning('Duitku response status: ' . ($data['statusMessage'] ?? 'Unknown error'), ['response' => $data]);
            } else {
                Log::error('Duitku HTTP error (' . $response->status() . '): ' . $response->body());
            }
        } catch (\Throwable $e) {
            Log::error('Duitku createInvoice exception: ' . $e->getMessage());
        }

        return null;
    }
}
