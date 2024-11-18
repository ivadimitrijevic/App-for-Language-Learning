<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\User;
use App\Http\Resources\NotificationResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    /**
    *Method for getting all the notifications to user
     */
    public function getNotifications($userId)
    {
        $notifications = Notification::where('to_user', $userId)
            ->get();

        return response()->json(['notifications' => NotificationResource::collection($notifications)]);
    }

    /**
    *Method for creating notification
     */
    public function createNotification(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'fromUser' => ['required', Rule::exists(User::class, 'id')],
                'toUser' => ['required', Rule::exists(User::class, 'id')],
                'seen' => 'required|boolean',
                'text' => 'nullable|string|max:255',
                'type' => 'nullable|string|max:255',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $notification = Notification::create([
            'from_user' => $request->fromUser,
            'to_user' => $request->toUser,
            'seen' => $request->seen,
            'text' => $request->text,
            'type' => $request->type,
        ]);

        return response()->json(new NotificationResource($notification));
    }
    /**
     *Method for updating notification
     */
    public function updateNotification(Request $request, $id)
        {
        $validatedData = $request->validate([
                'seen' => 'required|boolean',
            ]);
            try {
                $notification = Notification::findOrFail($id);

                $notification->seen = $request->input('seen');

                $notification->save();

                return response()->json(['response' => 'Notification updated successfully!', 'success' => true]);
            } catch (\Exception $e) {
                return response()->json(['response' => 'Notification could not be updated! ' . $e->getMessage(), 'success' => false]);
            }
        }
}
