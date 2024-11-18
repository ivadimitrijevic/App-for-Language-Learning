<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;
use App\Models\User;
use App\Http\Resources\RatingResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    /**
    *Method for getting all the ratings from user
     */
    public function getRatings($userId)
    {
        $ratings = Rating::where('to_user', $userId)
            ->get();

        return response()->json(['ratings' => RatingResource::collection($ratings)]);
    }

    /**
    *Method for creating rating
     */
    public function createRating(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'fromUser' => ['required', Rule::exists(User::class, 'id')],
                'toUser' => ['required', Rule::exists(User::class, 'id')],
                'rating' => 'required|integer',
                'text' => 'nullable|string|max:255',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $rating = Rating::create([
            'from_user' => $request->fromUser,
            'to_user' => $request->toUser,
            'rating' => $request->rating,
            'text' => $request->text,
        ]);

        return response()->json(new RatingResource($rating));
    }
}
