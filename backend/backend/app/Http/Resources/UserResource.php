<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\RoleResource;
use App\Http\Resources\GenderResource;

class UserResource extends JsonResource
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
            'name' => $this->resource->name,
            'surname' => $this->resource->surname,
            'age' => $this->resource->age,
            'gender' => new GenderResource($this->gender),
            'phoneNumber' => $this->resource->phone_number,
            'city' => $this->resource->city,
            'country' => $this->resource->country,
            'picture' => $this->resource->picture,
            'role' => new RoleResource($this->role),
            'description' => $this->resource->description,
            'email' => $this->resource->email,
            'active' => $this->resource->active ? true : false,
        ];
    }
}
