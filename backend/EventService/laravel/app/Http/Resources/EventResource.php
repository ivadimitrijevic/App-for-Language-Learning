<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'eventMaker' => $this->resource->event_maker,
            'name'=> $this->resource->name,
            'description'=> $this->resource->description,
            'city'=> $this->resource->city,
            'country'=> $this->resource->country,
            'address'=> $this->resource->address,
            'maxPeople'=> $this->resource->max_people,
            'date'=> $this->resource->date,
            'time'=> $this->resource->time,
            'language'=> $this->resource->language,
            'picture'=> $this->resource->picture,
        ];
    }
}
