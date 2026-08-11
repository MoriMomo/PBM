<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnalytic extends Model
{
    use HasFactory;

    protected $table = 'user_analytics';

    protected $fillable = [
        'session_id',
        'event_type',
        'scroll_depth',
        'engagement_time',
        'location_id',
        'page_url',
        'user_agent',
        'ip_address',
        'meta_data',
    ];

    protected $casts = [
        'meta_data' => 'array',
        'scroll_depth' => 'integer',
        'engagement_time' => 'integer',
    ];
}
