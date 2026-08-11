<?php

namespace App\Http\Controllers;

use App\Models\UserAnalytic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the main analytics dashboard
     */
    public function index(Request $request): Response
    {
        // Optimized single-pass aggregation query for CRO stats
        $counts = UserAnalytic::selectRaw("
            COUNT(CASE WHEN event_type = 'visit' THEN 1 END) as total_visits,
            COUNT(DISTINCT session_id) as total_sessions,
            COUNT(CASE WHEN event_type = 'cta_click' THEN 1 END) as total_cta_clicks,
            COUNT(CASE WHEN event_type = 'conversion' THEN 1 END) as total_conversions,
            COUNT(CASE WHEN event_type = 'scroll' AND scroll_depth = 25 THEN 1 END) as depth_25,
            COUNT(CASE WHEN event_type = 'scroll' AND scroll_depth = 50 THEN 1 END) as depth_50,
            COUNT(CASE WHEN event_type = 'scroll' AND scroll_depth = 75 THEN 1 END) as depth_75,
            COUNT(CASE WHEN event_type = 'scroll' AND scroll_depth = 90 THEN 1 END) as depth_90,
            AVG(CASE WHEN event_type = 'engagement' THEN engagement_time END) as avg_engagement
        ")->first();

        $totalSessions = $counts->total_sessions ?? 0;
        $totalConversions = $counts->total_conversions ?? 0;
        
        $conversionRate = $totalSessions > 0 ? round(($totalConversions / $totalSessions) * 100, 2) : 0;
        $avgEngagementTime = round((float) ($counts->avg_engagement ?? 0), 1);

        // CTA Clicks by Location ID
        $ctaClicksByLocation = UserAnalytic::where('event_type', 'cta_click')
            ->select('location_id', DB::raw('count(*) as count'))
            ->groupBy('location_id')
            ->get();

        // Recent events
        $recentEvents = UserAnalytic::latest()->take(20)->get();

        // Recent webinar registration orders
        $recentOrders = \App\Models\Order::latest()->take(20)->get();
        $totalOrdersCount = \App\Models\Order::count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_visits' => (int) $counts->total_visits,
                'total_sessions' => (int) $counts->total_sessions,
                'total_cta_clicks' => (int) $counts->total_cta_clicks,
                'total_conversions' => (int) $counts->total_conversions,
                'total_orders' => $totalOrdersCount,
                'conversion_rate' => $conversionRate,
                'avg_engagement_time' => $avgEngagementTime,
            ],
            'scroll_funnel' => [
                'depth_25' => (int) $counts->depth_25,
                'depth_50' => (int) $counts->depth_50,
                'depth_75' => (int) $counts->depth_75,
                'depth_90' => (int) $counts->depth_90,
            ],
            'cta_locations' => $ctaClicksByLocation,
            'recent_events' => $recentEvents,
            'recent_orders' => $recentOrders,
        ]);
    }

    /**
     * Display A/B Testing Dashboard (/admin/labs)
     */
    public function labs(): Response
    {
        return Inertia::render('Admin/ABTesting', [
            'experiments' => [
                [
                    'id' => 'hero_headline_test_v1',
                    'name' => 'Hero Headline A/B Test',
                    'status' => 'active',
                    'variant_a' => ['name' => 'Original Headline', 'visits' => 120, 'conversions' => 18, 'rate' => 15.0],
                    'variant_b' => ['name' => 'CRO Optimized Headline', 'visits' => 125, 'conversions' => 26, 'rate' => 20.8],
                    'winner' => 'Variant B (+5.8%)',
                ]
            ]
        ]);
    }
}
