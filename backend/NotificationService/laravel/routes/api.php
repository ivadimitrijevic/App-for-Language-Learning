<?php

use App\Http\Controllers\NotificationController;

Route::get('/notification/getNotifications/{userId}', [NotificationController::class, 'getNotifications']);
Route::post('/notification/createNotification', [NotificationController::class, 'createNotification']);
Route::post('/notification/updateNotification/{id}', [NotificationController::class, 'updateNotification']);
