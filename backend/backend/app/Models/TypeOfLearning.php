<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LanguagesTypesOfLearning;
use App\Models\Language;

class TypeOfLearning extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    protected $table = 'types_of_learning';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
    ];

    public function languages()
    {
        return $this->belongsToMany(Language::class, 'languages_types_of_learning', 'type_id', 'language_id');
    }


//     public function languageType()
//     {
//         return $this->hasMany(LanguagesTypesOfLearning::class, 'type_id');
//     }

}
