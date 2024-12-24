<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use App\Http\Resources\EventResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
    *Method for creating event
     */
    public function createEvent(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'eventMaker' => ['required', Rule::exists(User::class, 'id')],
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'language' => 'required|string|max:255',
                'picture' => 'nullable|string|max:255',
                'date' => 'required',
                'time' => 'required',
                'maxPeople' => 'required|integer',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $event = Event::create([
            'event_maker' => $request->eventMaker,
            'name' => $request->name,
            'description' => $request->description,
            'city' => $request->city,
            'country' => $request->country,
            'address' => $request->address,
            'language' => $request->language,
            'date' => $request->date,
            'time' => $request->time,
            'max_people' => $request->maxPeople,
            'picture' => $request->picture,
        ]);

        return response()->json(new EventResource($event));
    }
    /**
     *Method for updating event
     */
    public function updateEvent(Request $request, $id)
    {
    $validatedData = $request->validate([
            'eventMaker' => ['required', Rule::exists(User::class, 'id')],
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'language' => 'required|string|max:255',
            'picture' => 'nullable|string|max:255',
            'date' => 'required',
            'time' => 'required',
            'maxPeople' => 'required|integer',
    ]);
    try {
        $event = Event::findOrFail($id);

        $event->event_maker = $request->input('eventMaker');
        $event->name = $request->input('name');
        $event->description = $request->input('description');
        $event->city = $request->input('city');
        $event->country = $request->input('country');
        $event->address = $request->input('address');
        $event->language = $request->input('language');
        $event->picture = $request->input('picture');
        $event->date = $request->input('date');
        $event->time = $request->input('time');
        $event->max_people = $request->input('maxPeople');

        $event->save();

        return response()->json(new EventResource($event));
    } catch (\Exception $e) {
        return response()->json(['response' => 'Event could not be updated! ' . $e->getMessage(), 'success' => false]);
    }
    }

    public function getEvents(Request $request)
    {
        $perPage = 9;
        $page = $request->get('page', 1);

        $city = $request->query('city');
        $country = $request->query('country');
        $language = $request->query('language');
        $date = $request->query('date');

        $query = Event::query()
            ->select('events.id', 'events.name', 'events.city', 'events.country', 'events.language', 'events.date', 'events.description', 'events.address', 'events.max_people', 'events.time', 'events.event_maker', 'events.picture')
            ->distinct()
            ->when($city, function ($query, $city) {
                $query->whereRaw('LOWER(city) = ?', [strtolower($city)]);
            })
            ->when($country, function ($query, $country) {
                $query->whereRaw('LOWER(country) = ?', [strtolower($country)]);
            })
            ->when($language, function ($query, $language) {
                $query->whereRaw('LOWER(language) = ?', [strtolower($language)]);
            })
            ->when($date, function ($query, $date) {
                $query->whereDate('date', '=', $date);
            })
            ->whereDate('date', '>=', now()->toDateString());

        $total = $query->count();
        $events = $query->skip(($page - 1) * $perPage)
                        ->take($perPage)
                        ->get();

        $formattedEvents = EventResource::collection($events);

        return response()->json([
            'currentPage' => $page,
            'lastPage' => ceil($total / $perPage),
            'perPage' => $perPage,
            'total' => $total,
            'events' => $formattedEvents,
        ]);
    }
}
