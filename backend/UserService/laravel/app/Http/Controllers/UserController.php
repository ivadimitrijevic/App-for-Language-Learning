<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Services\Neo4jService;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    private $neo4j;

    public function __construct(Neo4jService $neo4j)
    {
        $this->neo4j = $neo4j;
    }

    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:5',
                'age' => 'nullable|integer',
                'gender' => 'required|string',
                'phoneNumber' => 'nullable|string|max:20',
                'city' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'picture' => 'nullable|string|max:255',
                'role' => 'required|string',
                'description' => 'nullable|string|max:255',
                'active' => 'required|boolean'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->all();
        $data['password'] = Hash::make($data['password']);

            $createdUser = $this->neo4j->createUserNode($data);

            return response()->json([
                'success' => true,
                'response' => 'You have been successfully registered!',
                'created_user' => $createdUser
            ]);
    }

    public function login(Request $request)
    {
        $user = $this->neo4j->getUserByEmail($request->email);

        if (!$user || !Hash::check($request->password, $user['properties']['password'])) {
            return response()->json(['success' => false], 401);
        }

        return response()->json([
            'success' => true,
            'user' => new UserResource($user)
        ]);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string',
            'surname' => 'nullable|string',
            'age' => 'nullable|integer',
            'gender' => 'nullable|string',
            'phoneNumber' => 'nullable|string',
            'description' => 'nullable|string',
            'picture' => 'nullable|string',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'email' => 'required|email',
        ]);

        $updatedUser = $this->neo4j->updateUserNode($validatedData['email'], $validatedData);

        if (!$updatedUser) {
            return response()->json([
                'success' => false,
                'response' => 'User not found!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'response' => 'You have successfully changed your information!',
            'user' => new UserResource((object)$updatedUser)
        ]);
    }

    public function getUsers(Request $request)
    {
        $perPage = 9;
        $page = $request->get('page', 1);

        $filters = [
            'city' => $request->query('city'),
            'country' => $request->query('country'),
            'language' => $request->query('language'),
            'currentUserId' => $request->query('currentUserId'),
        ];

        $users = $this->neo4j->getUsers($filters, $page, $perPage);

        return response()->json([
            'currentPage' => $page,
            'perPage' => $perPage,
            'total' => count($users),
            'users' => $users,
        ]);
    }

    public function createFriend(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'user' => 'required|integer',
                'friend' => 'required|integer',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $friendship = $this->neo4j->createFriendship(
            $request->input('user'),
            $request->input('friend'),
        );

        if (empty($friendship)) {
            return response()->json(['error' => 'One or both users not found'], 404);
        }

        return response()->json([
            'success' => true,
            'friendship' => $friendship
        ]);
    }

    public function getFriends(string $id)
    {
        $friends = $this->neo4j->getFriendsOfUser($id);

        return response()->json([
            'userId' => $id,
            'friends' => $friends,
        ]);
    }

    public function getUsersByIds(Request $request)
    {
        $ids = $request->input('ids', []);

        $users = $this->neo4j->getUsersByIds($ids);

        return response()->json($users);
    }
}
