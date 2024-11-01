<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gender;
use App\Models\Role;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Models\User;



class UserController extends Controller
{
     /**
     * Method for registering new user
     */
      public function register(Request $request)
        {

            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required|string|max:255',
                    'surname' => 'required|string|max:255',
                    'email' => 'required|string|max:255|email|unique:users',
                    'password' => 'required|string|min:5',
                    'age' => 'nullable|integer',
                    'gender' => ['required', Rule::exists(Gender::class, 'id')],
                    'phoneNumber' => 'nullable|string|max:20',
                    'city' => 'required|string|max:255',
                    'country' => 'required|string|max:255',
                    'picture' => 'nullable|string|max:255',
                    'role' => ['required', Rule::exists(Role::class, 'id')],
                    'description' => 'nullable|string|max:255',
                    'active' => 'required|boolean'

                ]
            );

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }


            $user = User::create([
                'name' => $request->name,
                'surname' => $request->surname,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'age' => $request->age,
                'gender_id' => $request->gender,
                'phone_number' => $request->phoneNumber,
                'city' => $request->city,
                'country' => $request->country,
                'picture' => $request->picture,
                'role_id' => $request->role,
                'description' => $request->description,
                'active' => $request->active,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);


            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['success' => true, 'response' => 'You have been successfully registered!', 'created_user' => new UserResource($user), 'access_token' => $token, 'token_type' => 'Bearer']);
        }

        /**
        *Method for getting information about the user
         */
        public function getUser($id)
        {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json(['user' => new UserResource($user)]);
        }

        /**
        *Method for logging in user
         */
        public function login(Request $request)
            {
                if (!Auth::attempt($request->only('email', 'password'))) {
                    return response()->json(['success' => 'false']);
                }

                $user = User::where('email', $request['email'])->first();

                $token = $user->createToken('auth_token')->plainTextToken;

                return response()->json(['success' => 'true', 'access_token' => $token, 'token_type' => 'user', 'user' => new UserResource($user)]);
            }
}
