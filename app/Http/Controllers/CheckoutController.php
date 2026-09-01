<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\DuitkuService;
use App\Services\MetaCapiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    protected MetaCapiService $capiService;
    protected DuitkuService $duitkuService;

    public function __construct(MetaCapiService $capiService, DuitkuService $duitkuService)
    {
        $this->capiService = $capiService;
        $this->duitkuService = $duitkuService;
    }

    /**
     * Store new webinar registration & generate Payment / WhatsApp redirect URL.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'whatsapp' => 'required|string|max:20',
            'utm_source' => 'nullable|string|max:50',
            'utm_medium' => 'nullable|string|max:50',
            'utm_campaign' => 'nullable|string|max:50',
        ]);

        // Normalize WhatsApp phone number to international format (628...)
        $phone = preg_replace('/[^0-9]/', '', $validated['whatsapp']);
        if (str_starts_with($phone, '08')) {
            $phone = '628'.substr($phone, 2);
        } elseif (str_starts_with($phone, '8')) {
            $phone = '628'.substr($phone, 1);
        }

        // Generate unique order number
        $orderNumber = 'PBM-'.date('Ymd').'-'.strtoupper(Str::random(4));
        $order = null;

        // Auto-migrate if orders table is missing on fresh serverless instance
        try {
            if (!Schema::hasTable('orders')) {
                Artisan::call('migrate', ['--force' => true]);
            }
        } catch (\Throwable $e) {
            Log::warning('Auto-migration failed in CheckoutController: ' . $e->getMessage());
        }

        // Save order to database safely
        try {
            $order = Order::create([
                'order_number' => $orderNumber,
                'name' => trim($validated['name']),
                'email' => strtolower(trim($validated['email'])),
                'whatsapp' => $phone,
                'amount' => 79000.00,
                'status' => 'pending',
                'utm_source' => $validated['utm_source'] ?? null,
                'utm_medium' => $validated['utm_medium'] ?? null,
                'utm_campaign' => $validated['utm_campaign'] ?? null,
                'fbp' => $request->cookie('_fbp') ?? $request->input('fbp'),
                'fbc' => $request->cookie('_fbc') ?? $request->input('fbc'),
            ]);
        } catch (\Throwable $e) {
            Log::error('Order creation in DB failed: ' . $e->getMessage());
        }

        // Send CAPI Events safely without blocking checkout
        try {
            $userData = [
                'em' => hash('sha256', strtolower(trim($validated['email']))),
                'ph' => hash('sha256', $phone),
                'fn' => hash('sha256', strtolower(trim(explode(' ', $validated['name'])[0]))),
            ];

            $eventId = 'reg_'.($order ? $order->id : $orderNumber).'_'.time();
            $this->capiService->sendEvent('InitiateCheckout', [
                'value' => 79000.00,
                'currency' => 'IDR',
                'content_name' => 'Webinar Bedah Landing Page CRO Specialist',
                'order_id' => $orderNumber,
            ], $eventId, $userData);

            $this->capiService->sendEvent('Lead', [
                'content_name' => 'Webinar Registration',
            ], 'lead_'.($order ? $order->id : $orderNumber), $userData);
        } catch (\Throwable $e) {
            Log::warning('CAPI tracking in CheckoutController failed: ' . $e->getMessage());
        }

        // 1. Try generating Duitku Payment Gateway Invoice URL
        $paymentUrl = null;
        try {
            $paymentUrl = $this->duitkuService->createInvoice([
                'order_id' => $orderNumber,
                'amount' => 79000,
                'name' => trim($validated['name']),
                'email' => strtolower(trim($validated['email'])),
                'phone' => $phone,
                'product_name' => 'Webinar Bedah Landing Page CRO Specialist (Rp79.000)',
            ]);
        } catch (\Throwable $e) {
            Log::error('Duitku createInvoice error: ' . $e->getMessage());
        }

        // 2. Build Admin WhatsApp Redirect Message as fallback
        $adminPhone = config('services.admin.whatsapp') ?? env('ADMIN_WHATSAPP_NUMBER', '628111040342');
        $message = 'Halo Admin PBM Agency, saya *'.trim($validated['name']).'* ('.strtolower(trim($validated['email'])).") mau konfirmasi pendaftaran Webinar Bedah Landing Page (Rp79.000).\n\n"
            .'📋 *Kode Order*: '.$orderNumber."\n"
            .'📱 *WhatsApp*: '.$phone."\n"
            ."💰 *Total Investasi*: Rp79.000\n\n"
            .'Mohon info instruksi pembayaran QRIS / Rekening Bank. Terima kasih!';
        $whatsappUrl = "https://api.whatsapp.com/send?phone={$adminPhone}&text=".urlencode($message);

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil! Mengalihkan ke pembayaran...',
            'order' => $order,
            'order_number' => $orderNumber,
            'payment_url' => $paymentUrl,
            'whatsapp_url' => $whatsappUrl,
            'redirect_url' => $paymentUrl ?? $whatsappUrl,
            'duitku_error' => $this->duitkuService->getLastError(),
        ]);
    }
}
