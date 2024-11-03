<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Language;
use App\Models\User;
use App\Models\LanguageLevel;
use App\Models\TypeOfLearning;
use App\Http\Resources\LanguageResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class LanguageController extends Controller
{
    /**
     * Method for getting known languages from user
     */
    public function getKnownLanguagesFromUser($userId)
    {
        try {
            $languages = Language::where('user_id', $userId)
            ->where('know', true)
            ->with('types')
            ->get();
            return response()->json(LanguageResource::collection($languages));
        } catch (\Exception $e) {
            return response()->json(['response' => 'Error  ' . $e->getMessage(), 'success' => false]);
        }
    }

    /**
         * Method for getting unknown languages from user
         */
        public function getLearningLanguagesFromUser($userId)
        {
            try {
                $languages = Language::where('user_id', $userId)
                ->where('know', false)
                ->with('types')
                ->get();
                return response()->json(LanguageResource::collection($languages));
            } catch (\Exception $e) {
                return response()->json(['response' => 'Error  ' . $e->getMessage(), 'success' => false]);
            }
        }

    /**
         * Method for creating language
         */
        public function create(Request $request)
        {
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required|string|max:255',
                    'user' => ['required', Rule::exists(User::class, 'id')],
                    'level' => ['required', Rule::exists(LanguageLevel::class, 'id')],
                    'know' => 'required|boolean',
                    'types' => 'required|array',
                    'types.*' => ['integer', Rule::exists(TypeOfLearning::class, 'id')]
                ]
            );

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }


            $language = Language::create([
                'name' => $request->name,
                'user_id' => $request->user,
                'level_id' => $request->level,
                'know' => $request->know,
            ]);

            foreach ($request->types as $typeId) {
                DB::table('languages_types_of_learning')->insert([
                    'language_id' => $language->id,
                    'type_id' => $typeId,
                ]);
            }


            return response()->json(new LanguageResource($language));
        }
}
