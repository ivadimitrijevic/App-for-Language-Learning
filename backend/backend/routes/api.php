<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\GenderController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\LanguageLevelController;
use App\Http\Controllers\TypeOfLearningController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventUserController;
use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/getUser/{id}', [UserController::class, 'getUser']);
Route::get('/getUsers', [UserController::class, 'getUsers']);
Route::get('/getAllUsers', [UserController::class, 'getAllUsers']);
Route::post('/updateUser/{id}', [UserController::class, 'update']);
Route::post('/updateUserActiveStatus/{id}', [UserController::class, 'updateUserActiveStatus']);

Route::get('/getGenders', [GenderController::class, 'getAll']);

Route::get('/getRoles', [RoleController::class, 'getAll']);

Route::get('/getLanguageLevels', [LanguageLevelController::class, 'getAll']);
Route::post('/createLanguageLevel', [LanguageLevelController::class, 'create']);
Route::post('/updateLanguageLevel/{id}', [LanguageLevelController::class, 'updateLanguageLevel']);
Route::post('/updateOrderLanguageLevels', [LanguageLevelController::class, 'updateOrder']);

Route::get('/getTypesOfLearning', [TypeOfLearningController::class, 'getAll']);
Route::post('/createTypeOfLearning', [TypeOfLearningController::class, 'create']);
Route::post('/updateTypeOfLearning/{id}', [TypeOfLearningController::class, 'updateTypeOfLearning']);
Route::post('/updateOrderTypesOfLearning', [TypeOfLearningController::class, 'updateOrder']);

Route::get('/getKnownLanguages/{userId}', [LanguageController::class, 'getKnownLanguagesFromUser']);
Route::get('/getLearningLanguages/{userId}', [LanguageController::class, 'getLearningLanguagesFromUser']);
Route::post('/createLanguage', [LanguageController::class, 'create']);
Route::delete('/deleteLanguage/{id}', [LanguageController::class, 'deleteLanguage']);
Route::post('/updateLanguage/{id}', [LanguageController::class, 'updateLanguage']);

Route::get('/getFriends/{userId}', [FriendController::class, 'getFriends']);
Route::post('/createFriend', [FriendController::class, 'createFriend']);
Route::post('/updateFriend', [FriendController::class, 'updateFriend']);

Route::get('/getRatings/{userId}', [RatingController::class, 'getRatings']);
Route::post('/createRating', [RatingController::class, 'createRating']);

Route::get('/getNotifications/{userId}', [NotificationController::class, 'getNotifications']);
Route::post('/createNotification', [NotificationController::class, 'createNotification']);
Route::post('/updateNotification/{id}', [NotificationController::class, 'updateNotification']);

Route::post('/createEvent', [EventController::class, 'createEvent']);
Route::post('/updateEvent/{id}', [EventController::class, 'updateEvent']);
Route::get('/getEvents', [EventController::class, 'getEvents']);


Route::post('/createEventUser', [EventUserController::class, 'createEventUser']);
Route::get('/getUserEvents/{userId}', [EventUserController::class, 'getUserEvents']);
Route::get('/getEventUsers/{eventId}', [EventUserController::class, 'getEventUsers']);
Route::post('/deleteEventUser', [EventUserController::class, 'removeUserFromEvent']);

Route::post('/messages', [ChatController::class, 'sendMessage']);
Route::get('/messages/{senderId}/{receiverId}', [ChatController::class, 'getMessagesBetweenUsers']);
