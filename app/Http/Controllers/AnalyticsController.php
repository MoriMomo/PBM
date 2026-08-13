<?php

namespace App\Http\Controllers;

use App\Models\UserAnalytic;
use App\Services\MetaCapiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AnalyticsController extends Controller
{
    protected MetaCapiService $capiService;

    public function __construct(MetaCapiService $capiService)
    {
        $this->capiService = $capiService;
    }

    /**
     * Store analytic event from frontend
     */
    public function track(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'session_id' => 'required|string',
            'event_type' => 'required|string|in:visit,scroll,engagement,cta_click,conversion,payment',
            'scroll_depth' => 'nullable|integer|in:25,50,75,90',
            'engagement_time' => 'nullable|integer',
            'location_id' => 'nullable|string',
            'page_url' => 'nullable|string',
            'event_id' => 'nullable|string',
            'meta_data' => 'nullable|array',
        ]);

        $analytic = UserAnalytic::create([
            'session_id' => $validated['session_id'],
            'event_type' => $validated['event_type'],
            'scroll_depth' => $validated['scroll_depth'] ?? null,
            'engagement_time' => $validated['engagement_time'] ?? null,
            'location_id' => $validated['location_id'] ?? null,
            'page_url' => $validated['page_url'] ?? $request->header('referer'),
            'user_agent' => $request->userAgent(),
            'ip_address' => $request->ip(),
            'meta_data' => $validated['meta_data'] ?? null,
        ]);

        // Dual Tracking with Meta CAPI
        $eventId = $validated['event_id'] ?? 'evt_'.Str::random(10);

        if ($validated['event_type'] === 'visit') {
            $this->capiService->sendEvent('PageView', [], $eventId);
        } elseif ($validated['event_type'] === 'conversion' || ($validated['event_type'] === 'cta_click' && ($validated['location_id'] ?? '') === 'pricing_cta')) {
            $coursePrice = env('VITE_COURSE_PRICE', 0);
            $this->capiService->sendEvent('AddToCart', [
                'currency' => 'IDR',
                'value' => (float) $coursePrice,
                'content_name' => 'Landing Page CTA Conversion',
            ], $eventId);
        }

        return response()->json([
            'success' => true,
            'analytic_id' => $analytic->id,
        ]);
    }
}
