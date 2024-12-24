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
        $types = TypeOfLearning::orderBy('order_number', 'asc')->get();
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

            $maxOrderNumber = TypeOfLearning::max('order_number');
            $newOrderNumber = $maxOrderNumber !== null ? $maxOrderNumber + 1 : 1;


            $type = TypeOfLearning::create([
                'name' => $request->name,
                'order_number' => $newOrderNumber,
            ]);


            return response()->json(new TypeOfLearningResource($type));
        }

        /**
        *Method for updating type of learning
         */
        public function updateTypeOfLearning(Request $request, $id)
            {
                $validated = $request->validate([
                    'name' => 'required|string',
                ]);

                $typeOfLearning = TypeOfLearning::find($id);

                if (!$typeOfLearning) {
                    return response()->json(['message' => 'Type Of Learning not found.'], 404);
                }

                $typeOfLearning->name = $validated['name'];
                $typeOfLearning->save();

                return response()->json(new TypeOfLearningResource($typeOfLearning));
            }

        /**
        *Method for updating order
         */
        public function updateOrder(Request $request)
        {
            $validator = Validator::make(
                    $request->all(),
                    [
                        'typeIds' => 'required|array',
                        'typeIds.*' => 'integer|exists:types_of_learning,id',
                    ]
                );

                if ($validator->fails()) {
                    return response()->json($validator->errors(), 422);
                }

                $ids = $request->input('typeIds');

                foreach ($ids as $index => $id) {
                    TypeOfLearning::where('id', $id)->update(['order_number' => $index + 1]);
                }

                $typesOfLearning = TypeOfLearning::orderBy('order_number', 'asc')->get();

                return response()->json(TypeOfLearningResource::collection($typesOfLearning));
        }
}
