<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPoint extends Model
{
    use HasFactory;
    protected $with = ['user'];
    protected $fillable = [
        'user_id',
        'total_points',
        'remaining_points',
        'last_clover_order_id',
        'last_bigCommerce_order_id',
    ];
    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
