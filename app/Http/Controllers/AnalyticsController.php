<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    /**
     * Store analytic event from frontend (safe dummy response)
     */
    public function track(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
        ]);
    }
}
