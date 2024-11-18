<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Language;
use App\Models\Friend;
use App\Models\Rating;
use App\Models\Notification;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'age',
        'gender_id',
        'phone_number',
        'city',
        'country',
        'picture',
        'description',
        'email',
        'password',
        'active',
        'role_id'
    ];

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
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class, 'gender_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function language()
    {
        return $this->hasMany(Language::class, 'user_id');
    }

    public function friends1()
    {
        return $this->hasMany(Friend::class, 'user_id');
    }

    public function friends2()
    {
        return $this->hasMany(Friend::class, 'friend_id');
    }

    public function rating1()
    {
        return $this->hasMany(Rating::class, 'from_user');
    }

    public function rating2()
    {
        return $this->hasMany(Rating::class, 'to_user');
    }

    public function notification1()
    {
        return $this->hasMany(Notification::class, 'from_user');
    }

    public function notification2()
    {
        return $this->hasMany(Notification::class, 'to_user');
    }
}
