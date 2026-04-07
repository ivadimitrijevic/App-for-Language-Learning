<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TypesOfLearning;
use App\Models\Language;

class LanguagesTypesOfLearning extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    protected $table = 'languages_types_of_learning';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'language_id',
        'type_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
    ];

   public function language()
   {
       return $this->belongsTo(Language::class, 'language_id');
   }

   public function type()
      {
          return $this->belongsTo(TypesOfLearning::class, 'type_id');
      }

}
