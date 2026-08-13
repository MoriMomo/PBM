<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MetaCapiService
{
    protected string $pixelId;

    protected string $accessToken;

    public function __construct()
    {
        $this->pixelId = config('services.meta.pixel_id') ?? '';
        $this->accessToken = config('services.meta.access_token') ?? '';
    }

    /**
     * Send event to Meta Conversion API (CAPI)
     */
    public function sendEvent(string $eventName, array $customData = [], ?string $eventId = null, array $userData = []): bool
    {
        if (empty($this->pixelId) || empty($this->accessToken)) {
            // Meta CAPI credentials not configured yet in .env
            return false;
        }

        $url = "https://graph.facebook.com/v19.0/{$this->pixelId}/events";

        $payload = [
            'data' => [
                [
                    'event_name' => $eventName,
                    'event_time' => time(),
                    'event_id' => $eventId ?? uniqid('evt_'),
                    'action_source' => 'website',
                    'event_source_url' => request()->fullUrl(),
                    'user_data' => array_merge([
                        'client_ip_address' => request()->ip(),
                        'client_user_agent' => request()->userAgent(),
                    ], $userData),
                    'custom_data' => $customData,
                ],
            ],
            'access_token' => $this->accessToken,
        ];

        try {
            $response = Http::post($url, $payload);

            if ($response->failed()) {
                Log::error('Meta CAPI Request Failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return false;
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Meta CAPI Exception: '.$e->getMessage());

            return false;
        }
    }
}
