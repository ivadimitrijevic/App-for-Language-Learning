<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\GenderController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\LanguageLevelController;
use App\Http\Controllers\TypeOfLearningController;
use App\Http\Controllers\LanguageController;
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

Route::get('/getGenders', [GenderController::class, 'getAll']);

Route::get('/getRoles', [RoleController::class, 'getAll']);

Route::get('/getLanguageLevels', [LanguageLevelController::class, 'getAll']);
Route::post('/createLanguageLevel', [LanguageLevelController::class, 'create']);

Route::get('/getTypesOfLearning', [TypeOfLearningController::class, 'getAll']);
Route::post('/createTypeOfLearning', [TypeOfLearningController::class, 'create']);

Route::get('/getKnownLanguages/{userId}', [LanguageController::class, 'getKnownLanguagesFromUser']);
Route::get('/getLearningLanguages/{userId}', [LanguageController::class, 'getLearningLanguagesFromUser']);
Route::post('/createLanguage', [LanguageController::class, 'create']);
