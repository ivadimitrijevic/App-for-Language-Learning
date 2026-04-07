<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Laudis\Neo4j\Types\Node;

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
            'id' => $this->resource['id'] ?? null,
            'name' => $this->resource['name'] ?? null,
            'surname' => $this->resource['surname'] ?? null,
            'age' => $this->resource['age'] ?? null,
            'gender' => $this->resource['gender'] ?? null,
            'phoneNumber' => $this->resource['phoneNumber'] ?? null,
            'city' => $this->resource['city'] ?? null,
            'country' => $this->resource['country'] ?? null,
            'picture' => $this->resource['picture'] ?? null,
            'role' => $this->resource['role'] ?? null,
            'description' => $this->resource['description'] ?? null,
            'email' => $this->resource['email'] ?? null,
            'active' => isset($this->resource['active']) ? (bool)$this->resource['active'] : null,
            'createdAt' => $this->resource['createdAt'] ?? null,
        ];
    }
}
