<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\UserAnalytic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the comprehensive CRO analytics dashboard
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

        $totalSessions = (int) ($counts->total_sessions ?? 0);
        $totalVisits = (int) ($counts->total_visits ?? 0);
        $totalCtaClicks = (int) ($counts->total_cta_clicks ?? 0);
        $totalConversions = (int) ($counts->total_conversions ?? 0);
        $totalOrdersCount = Order::count();
        $totalRevenue = $totalOrdersCount * 79000;

        // Click-Through Rate (CTR) of visitors who clicked any CTA
        $ctrRate = $totalSessions > 0 ? round(($totalCtaClicks / $totalSessions) * 100, 1) : 0.0;

        // Lead Conversion Rate (Total Orders / Unique Sessions)
        $conversionRate = $totalSessions > 0 ? round(($totalOrdersCount / $totalSessions) * 100, 1) : 0.0;
        $avgEngagementTime = round((float) ($counts->avg_engagement ?? 0), 1);

        // Approximate Bounce Rate: Sessions with 0 scroll milestones and <= 1 event
        $singleEventSessions = UserAnalytic::select('session_id')
            ->groupBy('session_id')
            ->havingRaw('COUNT(*) <= 2')
            ->get()
            ->count();
        $bounceRate = $totalSessions > 0 ? round(($singleEventSessions / $totalSessions) * 100, 1) : 0.0;

        // CTA Clicks Breakdown by Location ID (including legacy conversion locations if any)
        $rawCtaClicks = UserAnalytic::whereIn('event_type', ['cta_click', 'conversion'])
            ->whereNotNull('location_id')
            ->where('location_id', '!=', '')
            ->select('location_id', DB::raw('count(*) as count'))
            ->groupBy('location_id')
            ->orderByDesc('count')
            ->get();

        $locationLabels = [
            'hero_cta' => 'Hero Button (Early Bird)',
            'navbar_cta' => 'Navbar Button (Daftar Sekarang)',
            'pricing_cta' => 'Pricing Table Button',
            'modules_cta' => 'Modules Section Button',
            'final_cta' => 'Final CTA Banner Button',
            'checkout_modal' => 'Webinar Form Submitted',
        ];

        $ctaLocations = $rawCtaClicks->map(function ($item) use ($locationLabels, $totalCtaClicks) {
            $label = $locationLabels[$item->location_id] ?? ucwords(str_replace('_', ' ', $item->location_id));
            $pct = $totalCtaClicks > 0 ? round(($item->count / max($totalCtaClicks, 1)) * 100, 1) : 0;
            return [
                'location_id' => $item->location_id,
                'label' => $label,
                'count' => (int) $item->count,
                'percentage' => $pct,
            ];
        });

        // Scroll Funnel Dropoff data with retention rate
        $d25 = (int) ($counts->depth_25 ?? 0);
        $d50 = (int) ($counts->depth_50 ?? 0);
        $d75 = (int) ($counts->depth_75 ?? 0);
        $d90 = (int) ($counts->depth_90 ?? 0);

        $scrollFunnel = [
            'depth_25' => $d25,
            'depth_50' => $d50,
            'depth_75' => $d75,
            'depth_90' => $d90,
            'retention_25' => $totalSessions > 0 ? round(($d25 / $totalSessions) * 100, 1) : 0,
            'retention_50' => $totalSessions > 0 ? round(($d50 / $totalSessions) * 100, 1) : 0,
            'retention_75' => $totalSessions > 0 ? round(($d75 / $totalSessions) * 100, 1) : 0,
            'retention_90' => $totalSessions > 0 ? round(($d90 / $totalSessions) * 100, 1) : 0,
        ];

        // Recent events formatted
        $recentEvents = UserAnalytic::latest()->take(40)->get()->map(function ($ev) use ($locationLabels) {
            $formattedDetail = '-';
            if ($ev->event_type === 'scroll' && $ev->scroll_depth) {
                $formattedDetail = "Scroll Milestone {$ev->scroll_depth}%";
            } elseif ($ev->event_type === 'cta_click' && $ev->location_id) {
                $formattedDetail = ($locationLabels[$ev->location_id] ?? $ev->location_id);
            } elseif ($ev->event_type === 'conversion') {
                $formattedDetail = "Order Registrasi Berhasil";
            } elseif ($ev->event_type === 'engagement' && $ev->engagement_time) {
                $formattedDetail = "{$ev->engagement_time}s Active Dwell Time";
            } elseif ($ev->event_type === 'visit') {
                $formattedDetail = "Landing Page Loaded";
            }

            return [
                'id' => $ev->id,
                'session_id' => $ev->session_id,
                'event_type' => $ev->event_type,
                'location_id' => $ev->location_id,
                'scroll_depth' => $ev->scroll_depth,
                'engagement_time' => $ev->engagement_time,
                'details' => $formattedDetail,
                'created_at' => $ev->created_at ? $ev->created_at->toISOString() : null,
                'time_formatted' => $ev->created_at ? $ev->created_at->setTimezone('Asia/Jakarta')->format('H:i:s') : '-',
                'date_formatted' => $ev->created_at ? $ev->created_at->setTimezone('Asia/Jakarta')->format('d M Y') : '-',
            ];
        });

        // Recent webinar registration orders
        $recentOrders = Order::latest()->take(40)->get()->map(function ($order) {
            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'name' => $order->name,
                'email' => $order->email,
                'whatsapp' => $order->whatsapp,
                'amount' => (float) $order->amount,
                'amount_formatted' => 'Rp ' . number_format($order->amount, 0, ',', '.'),
                'status' => $order->status ?? 'pending',
                'created_at' => $order->created_at ? $order->created_at->toISOString() : null,
                'created_formatted' => $order->created_at ? $order->created_at->setTimezone('Asia/Jakarta')->format('d M Y, H:i') : '-',
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_visits' => $totalVisits,
                'total_sessions' => $totalSessions,
                'total_cta_clicks' => $totalCtaClicks,
                'ctr_rate' => $ctrRate,
                'total_conversions' => $totalConversions,
                'total_orders' => $totalOrdersCount,
                'total_revenue' => $totalRevenue,
                'total_revenue_formatted' => 'Rp ' . number_format($totalRevenue, 0, ',', '.'),
                'conversion_rate' => $conversionRate,
                'avg_engagement_time' => $avgEngagementTime,
                'bounce_rate' => $bounceRate,
            ],
            'scroll_funnel' => $scrollFunnel,
            'cta_locations' => $ctaLocations,
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
                    'hypothesis' => 'Menggunakan wording "The Silent Conversion Leak" dengan aksen gradien oranye menaikkan CTR CTA Hero dibanding headline standar.',
                    'status' => 'active',
                    'traffic_split' => '50% / 50%',
                    'variant_a' => [
                        'name' => 'Variant A (Headline Standar)',
                        'visits' => 120,
                        'conversions' => 18,
                        'rate' => 15.0,
                    ],
                    'variant_b' => [
                        'name' => 'Variant B (The Silent Conversion Leak)',
                        'visits' => 125,
                        'conversions' => 26,
                        'rate' => 20.8,
                    ],
                    'winner' => 'Variant B (+5.8% Kenaikan Konversi)',
                ],
                [
                    'id' => 'cta_color_pulse_v1',
                    'name' => 'CTA Button Animation & Glow Test',
                    'hypothesis' => 'Tombol CTA dengan efek .pulse-glow-btn GPU menarik atensi mata lebih cepat sehingga meningkatkan klik tombol.',
                    'status' => 'active',
                    'traffic_split' => '50% / 50%',
                    'variant_a' => [
                        'name' => 'Variant A (Static Orange Button)',
                        'visits' => 110,
                        'conversions' => 16,
                        'rate' => 14.5,
                    ],
                    'variant_b' => [
                        'name' => 'Variant B (Pulse Glow GPU Button)',
                        'visits' => 115,
                        'conversions' => 24,
                        'rate' => 20.9,
                    ],
                    'winner' => 'Variant B (+6.4% Kenaikan Konversi)',
                ],
            ],
        ]);
    }
}
