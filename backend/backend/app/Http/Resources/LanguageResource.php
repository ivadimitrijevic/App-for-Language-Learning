<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\LanguageLevelResource;

class LanguageResource extends JsonResource
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
            'user' => new UserResource($this->user),
            'level' => new LanguageLevelResource($this->level),
            'know' => $this->resource->know,
            'types' => TypeOfLearningResource::collection($this->whenLoaded('types'))
        ];
    }
}
