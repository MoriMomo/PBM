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
     */
    public function callback(Request $request): JsonResponse
    {
        $apiKey = env('DUITKU_API_KEY', '1c9e7b636968f30614f3c4824d1851e8');
        $merchantCode = $request->input('merchantCode');
        $amount = $request->input('amount');
        $merchantOrderId = $request->input('merchantOrderId');
        $signature = $request->input('signature');
        $resultCode = $request->input('resultCode');

        // Verify Duitku v2 signature: HMAC-SHA256(merchantCode + amount + merchantOrderId, apiKey)
        $stringToSign = $merchantCode . $amount . $merchantOrderId;
        $calcSignature = hash_hmac('sha256', $stringToSign, $apiKey);

        if ($signature && $signature !== $calcSignature) {
            Log::warning('Duitku callback signature mismatch', ['received' => $signature, 'calculated' => $calcSignature]);
            return response()->json(['status' => 'Bad Signature'], 400);
        }

        // If resultCode == '00', payment success
        if ($resultCode === '00') {
            Order::where('order_number', $merchantOrderId)->update([
                'status' => 'paid',
            ]);
            Log::info("Duitku Payment Success for Order: {$merchantOrderId}");
        } else {
            Log::info("Duitku Payment Pending/Failed ({$resultCode}) for Order: {$merchantOrderId}");
        }

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
