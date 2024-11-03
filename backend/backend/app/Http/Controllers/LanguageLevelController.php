<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LanguageLevel;
use App\Http\Resources\LanguageLevelResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class LanguageLevelController extends Controller
{
    /**
    *Method for getting all the language levels
     */
    public function getAll() {
        $levels = LanguageLevel::all();
        return LanguageLevelResource::collection($levels);
    }

    /**
         * Method for creating language level
         */
        public function create(Request $request)
        {
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required|string|max:255',
                ]
            );

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }


            $level = LanguageLevel::create([
                'name' => $request->name,
            ]);


            return response()->json(new LanguageLevelResource($level));
        }
}
