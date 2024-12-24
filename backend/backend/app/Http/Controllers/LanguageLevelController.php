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
        $levels = LanguageLevel::orderBy('order_number', 'asc')->get();
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

            $maxOrderNumber = LanguageLevel::max('order_number');
            $newOrderNumber = $maxOrderNumber !== null ? $maxOrderNumber + 1 : 1;

            $level = LanguageLevel::create([
                'name' => $request->name,
                'order_number' => $newOrderNumber,
            ]);


            return response()->json(new LanguageLevelResource($level));
        }
        /**
        *Method for updating language level
         */
        public function updateLanguageLevel(Request $request, $id)
            {
                $validated = $request->validate([
                    'name' => 'required|string',
                ]);

                $level = LanguageLevel::find($id);

                if (!$level) {
                    return response()->json(['message' => 'Language level not found.'], 404);
                }

                $level->name = $validated['name'];
                $level->save();

                return response()->json(new LanguageLevelResource($level));
            }

        /**
        *Method for updating order
         */
        public function updateOrder(Request $request)
        {
            $validator = Validator::make(
                    $request->all(),
                    [
                        'levelIds' => 'required|array',
                        'levelIds.*' => 'integer|exists:language_levels,id',
                    ]
                );

                if ($validator->fails()) {
                    return response()->json($validator->errors(), 422);
                }

                $ids = $request->input('levelIds');

                foreach ($ids as $index => $id) {
                    LanguageLevel::where('id', $id)->update(['order_number' => $index + 1]);
                }

                $languageLevels = LanguageLevel::orderBy('order_number', 'asc')->get();

                return response()->json(LanguageLevelResource::collection($languageLevels));
        }
}
