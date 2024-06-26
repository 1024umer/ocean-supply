<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $with = ['role', 'subscription'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'subscription_id',
        'email',
        'phone',
        'country',
        'street_address',
        'city',
        'region',
        'postal_code',
        'password',
        'role_id',
        'bigcommerce_id',
        'clover_id',
    ];
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }
    public const ADMIN_ROLE_ID = 1;
    public const USER_ROLE_ID = 2;
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function point()
    {
        return $this->hasMany(UserPoint::class);
    }
}
