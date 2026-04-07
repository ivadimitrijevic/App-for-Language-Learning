<?php

use App\Http\Controllers\UserController;

Route::post('/user/register', [UserController::class, 'register']);
Route::post('/user/login', [UserController::class, 'login']);
Route::get('/user/getUser/{id}', [UserController::class, 'getUser']);
Route::get('/user/getUsersByIds', [UserController::class, 'getUsersByIds']);
Route::get('/user/getUsers', [UserController::class, 'getUsers']);
Route::post('/user/updateUser/{id}', [UserController::class, 'update']);

Route::get('/user/getFriends/{userId}', [UserController::class, 'getFriends']);
Route::post('/user/createFriend', [UserController::class, 'createFriend']);

