<?php

use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/messages', [ChatController::class, 'sendMessage']);
Route::get('/messages/{senderId}/{receiverId}', [ChatController::class, 'getMessagesBetweenUsers']);
