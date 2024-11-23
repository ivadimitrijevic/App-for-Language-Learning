<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'city',
        'country',
        'address',
        'max_people',
        'language',
        'event_maker',
        'date',
        'time',
        'picture',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
    ];

    public function host()
    {
        return $this->belongsTo(User::class, 'event_maker');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'event_user');
    }

}
