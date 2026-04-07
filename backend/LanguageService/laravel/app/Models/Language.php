<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\LanguageLevel;
use App\Models\LanguagesTypesOfLearning;
use App\Models\TypeOfLearning;

class Language extends Model
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
        'user_id',
        'level_id',
        'know',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
    ];

   public function level()
   {
       return $this->belongsTo(LanguageLevel::class, 'level_id');
   }

//    public function user()
//   {
//       return $this->belongsTo(User::class, 'user_id');
//   }

    public function types()
    {
        return $this->belongsToMany(TypeOfLearning::class, 'languages_types_of_learning', 'language_id', 'type_id');
    }

}
