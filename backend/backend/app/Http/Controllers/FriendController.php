<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\User;
use App\Models\Rating;
use App\Http\Resources\FriendResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class FriendController extends Controller
{
    /**
    *Method for getting all the friends from user
     */
     public function getFriends($userId)
     {
         $friendships = Friend::where(function ($query) use ($userId) {
             $query->where('user_id', $userId)
                   ->orWhere('friend_id', $userId);
         })
         ->where('active', true)
         ->get();

         $friendsWithReviews = $friendships->map(function ($friendship) use ($userId) {
             $otherUserId = $friendship->user_id === $userId ? $friendship->friend_id : $friendship->user_id;

             $leftReview = Rating::where('from_user', $userId)
                                 ->where('to_user', $otherUserId)
                                 ->exists();

             $friendResource = new FriendResource($friendship);
             $friendData = $friendResource->resolve();

             $friendData['leftReview'] = $leftReview;

             return $friendData;
         });

         return response()->json(['friends' => $friendsWithReviews]);
     }


//      public function getFriends($userId)
//      {
//          $friendships = Friend::where(function ($query) use ($userId) {
//              $query->where('user_id', $userId)
//                    ->orWhere('friend_id', $userId);
//          })
//          ->where('active', true)
//          ->get()
//          ->map(function ($friendship) use ($userId) {
//              // Identifikovanje druge osobe u prijateljstvu
//              $otherUserId = $friendship->user_id === $userId ? $friendship->friend_id : $friendship->user_id;
//
//              // Provera da li postoji recenzija
//              $leftReview = Rating::where('from_user', $userId)
//                                  ->where('to_user', $otherUserId)
//                                  ->exists();
//
//              // Dodavanje `leftReview` polja
//              $friendship->leftReview = $leftReview;
//
//              return $friendship;
//          });
//
//          return response()->json(['friends' => FriendResource::collection($friendships)]);
//      }

//     public function getFriends($userId)
//         {
//         $friendships = Friend::where(function ($query) use ($userId) {
//                 $query->where('user_id', $userId)
//                       ->orWhere('friend_id', $userId);
//             })
//             ->where('active', true)
//             ->get();
//
//             return response()->json(['friends' => FriendResource::collection($friendships)]);
//         }

    public function createFriend(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'user' => ['required', Rule::exists(User::class, 'id')],
                'friend' => ['required', Rule::exists(User::class, 'id')],
                'active' => 'required|boolean',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $friend = friend::create([
            'user_id' => $request->user,
            'friend_id' => $request->friend,
            'active' => $request->active,
        ]);

        return response()->json(new FriendResource($friend));
    }

    public function updateFriend(Request $request)
    {
        $validatedData = $request->validate([
            'active' => 'required|integer',
            'fromUser' => 'required|integer',
            'toUser' => 'required|integer',
        ]);
        try {
            $friend = Friend::where('user_id', $validatedData['fromUser'])
                        ->where('friend_id', $validatedData['toUser'])
                        ->firstOrFail();

            $friend->active = $request->input('active');
            $friend->save();

            return response()->json(['response' => 'Friendship updated successfully!', 'success' => true, 'friend' => new FriendResource($friend)]);
        } catch (\Exception $e) {
            return response()->json(['response' => 'Friendship could not be updated! ' . $e->getMessage(), 'success' => false]);
        }
    }
}
