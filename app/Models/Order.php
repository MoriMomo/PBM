<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'name',
        'email',
        'whatsapp',
        'amount',
        'status',
        'notes',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'fbp',
        'fbc',
    ];

    /**
     * Scope for pending orders.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for paid orders.
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }
}
