<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gender;
use App\Http\Resources\GenderResource;
use Illuminate\Validation\Rule;

class GenderController extends Controller
{
    /**
    *Method for getting all the genders
     */
    public function getAll() {
        $genders = Gender::all();
        return GenderResource::collection($genders);
    }
}
