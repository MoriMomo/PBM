<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_analytics', function (Blueprint $table) {
            $table->id();
            $table->string('session_id')->index();
            $table->string('event_type')->index(); // visit, scroll, engagement, cta_click, conversion, payment
            $table->integer('scroll_depth')->nullable(); // 25, 50, 75, 90
            $table->integer('engagement_time')->nullable(); // in seconds
            $table->string('location_id')->nullable(); // hero_primary, faq_primary, pricing_cta, etc.
            $table->text('page_url')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('ip_address')->nullable();
            $table->json('meta_data')->nullable(); // utm parameters, referral, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_analytics');
    }
};
