<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DuitkuController extends Controller
{
    /**
     * Handle Duitku Payment Notification / Callback
     * Docs: https://docs.duitku.com/api/id/?php#callback
     *
     * Callback signature formula (Duitku API v2):
     *   $stringToSign = $merchantCode . $amount . $merchantOrderId . $apiKey;
     *   $signature = hash_hmac('sha256', $stringToSign, $apiKey);
     */
    public function callback(Request $request): JsonResponse
    {
        $apiKey = trim(
            config('services.duitku.api_key')
            ?: (getenv('DUITKU_API_KEY')
            ?: ($_ENV['DUITKU_API_KEY']
            ?: ($_SERVER['DUITKU_API_KEY'] ?? '')))
        );

        $merchantCode = $request->input('merchantCode');
        $amount = $request->input('amount');
        $merchantOrderId = $request->input('merchantOrderId');
        $signature = $request->input('signature');
        $resultCode = $request->input('resultCode');

        Log::info('Duitku Callback Received', [
            'merchantCode' => $merchantCode,
            'merchantOrderId' => $merchantOrderId,
            'amount' => $amount,
            'resultCode' => $resultCode,
        ]);

        // Verify Duitku API v2 callback signature
        // Formula: hash_hmac('sha256', merchantCode + amount + merchantOrderId + apiKey, apiKey)
        $stringToSign = $merchantCode . $amount . $merchantOrderId . $apiKey;
        $calcSignature = hash_hmac('sha256', $stringToSign, $apiKey);

        if ($signature && $signature !== $calcSignature) {
            Log::warning('Duitku callback signature mismatch', [
                'received' => $signature,
                'calculated' => $calcSignature,
                'stringToSign' => $merchantCode . $amount . $merchantOrderId . '***',
            ]);
            return response()->json(['status' => 'Bad Signature'], 400);
        }

        // resultCode '00' = Payment Success
        if ($resultCode === '00') {
            Order::where('order_number', $merchantOrderId)->update([
                'status' => 'paid',
            ]);
            Log::info("Duitku Payment SUCCESS for Order: {$merchantOrderId}, Amount: {$amount}");
        } elseif ($resultCode === '01') {
            Log::info("Duitku Payment PENDING for Order: {$merchantOrderId}");
        } else {
            Order::where('order_number', $merchantOrderId)->update([
                'status' => 'failed',
            ]);
            Log::info("Duitku Payment FAILED ({$resultCode}) for Order: {$merchantOrderId}");
        }

        // Duitku requires HTTP 200 response
        return response()->json(['status' => 'SUCCESS'], 200);
    }

    /**
     * Handle Duitku Return / Finish redirect
     */
    public function finish(Request $request)
    {
        return redirect('/')->with('message', 'Pembayaran berhasil diproses.');
    }
}
