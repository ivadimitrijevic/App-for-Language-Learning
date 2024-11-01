<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Http\Resources\RoleResource;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    /**
    *Method for getting all the roles
     */
    public function getAll() {
        $roles = Role::all();
        return RoleResource::collection($roles);
    }
}
