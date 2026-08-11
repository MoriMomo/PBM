<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\MetaCapiService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    protected MetaCapiService $capiService;

    public function __construct(MetaCapiService $capiService)
    {
        $this->capiService = $capiService;
    }

    /**
     * Store new webinar registration & generate WhatsApp redirect URL.
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
            $phone = '628' . substr($phone, 2);
        } elseif (str_starts_with($phone, '8')) {
            $phone = '628' . substr($phone, 1);
        }

        // Generate unique order number
        $orderNumber = 'PBM-' . date('Ymd') . '-' . strtoupper(Str::random(4));

        // Save order to database
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

        // Hash user data for Meta CAPI
        $userData = [
            'em' => hash('sha256', strtolower(trim($validated['email']))),
            'ph' => hash('sha256', $phone),
            'fn' => hash('sha256', strtolower(trim(explode(' ', $validated['name'])[0]))),
        ];

        // Send CAPI InitiateCheckout & Lead events
        $eventId = 'reg_' . $order->id . '_' . time();
        $this->capiService->sendEvent('InitiateCheckout', [
            'value' => 79000.00,
            'currency' => 'IDR',
            'content_name' => 'Webinar Bedah Landing Page CRO Specialist',
            'order_id' => $orderNumber,
        ], $eventId, $userData);

        $this->capiService->sendEvent('Lead', [
            'content_name' => 'Webinar Registration',
        ], 'lead_' . $order->id, $userData);

        // Build Admin WhatsApp Redirect Message
        $adminPhone = config('services.admin.whatsapp') ?? env('ADMIN_WHATSAPP_NUMBER', '628111040342');
        
        $message = "Halo Admin PBM Agency, saya *" . $order->name . "* (" . $order->email . ") mau konfirmasi pendaftaran Webinar Bedah Landing Page (Rp79.000).\n\n"
            . "📋 *Kode Order*: " . $orderNumber . "\n"
            . "📱 *WhatsApp*: " . $phone . "\n"
            . "💰 *Total Investasi*: Rp79.000\n\n"
            . "Mohon info instruksi pembayaran QRIS / Rekening Bank. Terima kasih!";

        $whatsappUrl = "https://api.whatsapp.com/send?phone={$adminPhone}&text=" . urlencode($message);

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil! Mengalihkan Anda ke WhatsApp Admin...',
            'order' => $order,
            'whatsapp_url' => $whatsappUrl,
        ]);
    }
}
