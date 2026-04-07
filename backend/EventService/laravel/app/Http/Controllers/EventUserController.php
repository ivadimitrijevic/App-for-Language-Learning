<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Http\Resources\EventUserResource;
use App\Http\Resources\EventResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class EventUserController extends Controller
{
    /**
    *Method for creating eventUser
     */
    public function createEventUser(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'userId' => ['required'],
                'eventId' => ['required', Rule::exists(Event::class, 'id')],
            ]
        );

        $event = Event::findOrFail($request->eventId);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $event->users()->attach($user->id);
        $eventUser = $event->users()->where('user_id', $user->id)->first();

        return response()->json(new EventUserResource($eventUser));
    }

    /**
         * Method for deleting eventUser
         */
         public function removeUserFromEvent(Request $request)
        {
            $request->validate([
                'userId' => 'required|exists:users,id',
                'eventId' => 'required|exists:events,id',
            ]);

            $event = Event::findOrFail($request->eventId);
            $user = User::findOrFail($request->userId);

            if (!$event->users()->where('user_id', $user->id)->exists()) {
                return response()->json(['message' => 'User is not registered for this event'], 400);
            }

            $event->users()->detach($user->id);

            return response()->json(['message' => 'User successfully removed from event']);
        }

/**
     * Method for getting events from user
     */
    public function getUserEvents($userId)
    {
        $user = User::findOrFail($userId);

        $events = $user->events()->where('date', '>=', Carbon::today())->get();

        return response()->json(EventResource::collection($events));
    }
    /**
     *Method for getting users from events
     */
    public function getEventUsers($eventId)
    {
        $event = Event::findOrFail($eventId);

        $users = $event->users;

        return response()->json(UserResource::collection($users));
    }
}
