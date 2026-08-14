<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Preconnect to Font Asset & External Domain Storage -->
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        <!-- Preload Key Hero Image for Instant LCP -->
        <link rel="preload" as="image" href="/images/checklist.webp" type="image/webp" fetchpriority="high" />

        <!-- Preload Critical WOFF2 Fonts to prevent rendering delays on mobile -->
        <link rel="preload" href="https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVnskPMA.woff2" as="font" type="font/woff2" crossorigin>

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#050811] text-slate-100 selection:bg-brand-500/30 selection:text-white overflow-x-hidden">
        @inertia
        <div id="app-ssr-fallback" class="hidden">
            <!-- First-Frame Instant LCP Hero Skeleton for fast paint -->
            <section class="pt-28 sm:pt-36 pb-16 px-4 text-center max-w-5xl mx-auto">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-black text-white tracking-tight leading-[1.12] mb-6">
                    Iklan Sudah Jalan, Metrik Bagus — Tapi Kenapa Closing Masih Seret?
                </h1>
            </section>
        </div>
    </body>
</html>
