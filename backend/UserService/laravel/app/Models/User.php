<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use GlobalInnovation\NeoEloquent\Eloquent\Model as NeoEloquentModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends NeoEloquentModel implements
    AuthenticatableContract,
    AuthorizableContract,
    CanResetPasswordContract
{
    use Authenticatable,
        Authorizable,
        CanResetPassword,
        MustVerifyEmail,
        HasApiTokens,
        HasFactory,
        Notifiable;


    protected $label = 'User';


    protected $fillable = [
        'name',
        'surname',
        'age',
        'gender',
        'phone_number',
        'city',
        'country',
        'picture',
        'description',
        'email',
        'password',
        'active',
        'role'
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
            'password'          => 'hashed',
            'active'            => 'boolean',
        ];
    }

    public function addFriend(User $friend)
    {
        $this->friends()->attach($friend, ['type' => 'FRIENDS_WITH']);

        $friend->friends()->attach($this, ['type' => 'FRIENDS_WITH']);
    }

}
