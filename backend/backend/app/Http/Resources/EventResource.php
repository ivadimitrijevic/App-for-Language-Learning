<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

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
            'eventMaker' => new UserResource($this->host),
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
