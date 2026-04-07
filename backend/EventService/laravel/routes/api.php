<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\EventUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/event/createEvent', [EventController::class, 'createEvent']);
Route::post('/event/updateEvent/{id}', [EventController::class, 'updateEvent']);
Route::get('/event/getEvents', [EventController::class, 'getEvents']);


Route::post('/event/createEventUser', [EventUserController::class, 'createEventUser']);
Route::get('/event/getUserEvents/{userId}', [EventUserController::class, 'getUserEvents']);
Route::get('/event/getEventUsers/{eventId}', [EventUserController::class, 'getEventUsers']);
Route::post('/event/deleteEventUser', [EventUserController::class, 'removeUserFromEvent']);
