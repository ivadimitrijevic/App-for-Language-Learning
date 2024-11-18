<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class NotificationResource extends JsonResource
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
            'fromUser' => new UserResource($this->user1),
            'toUser' => new UserResource($this->user2),
            'seen' => $this->resource->seen ? true : false,
            'text' => $this->resource->text,
            'type'=> $this->resource->type,
        ];
    }
}
