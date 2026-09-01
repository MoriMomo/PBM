<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DuitkuController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Analytics tracking endpoint (public)
Route::post('/analytics/track', [AnalyticsController::class, 'track'])->name('analytics.track');

// Checkout Registration endpoint (public)
Route::post('/checkout/register', [CheckoutController::class, 'register'])->name('checkout.register');

// Duitku Payment Gateway Callbacks
Route::post('/payment/duitku/callback', [DuitkuController::class, 'callback'])->name('payment.duitku.callback');
Route::get('/payment/duitku/finish', [DuitkuController::class, 'finish'])->name('payment.duitku.finish');

// Admin Analytics & A/B Testing Labs Dashboard
Route::prefix('admin')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/labs', [AdminDashboardController::class, 'labs'])->name('admin.labs');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
