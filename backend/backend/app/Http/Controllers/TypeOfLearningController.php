<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeOfLearning;
use App\Http\Resources\TypeOfLearningResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class TypeOfLearningController extends Controller
{
    /**
    *Method for getting all the types of learning
     */
    public function getAll() {
        $types = TypeOfLearning::all();
        return TypeOfLearningResource::collection($types);
    }

    /**
         * Method for creating type of learning
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


            $type = TypeOfLearning::create([
                'name' => $request->name,
            ]);


            return response()->json(new TypeOfLearningResource($type));
        }
}
