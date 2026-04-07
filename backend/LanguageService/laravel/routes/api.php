<?php

use App\Http\Controllers\LanguageLevelController;
use App\Http\Controllers\TypeOfLearningController;
use App\Http\Controllers\LanguageController;

Route::get('/language/getLanguageLevels', [LanguageLevelController::class, 'getAll']);
Route::post('/language/createLanguageLevel', [LanguageLevelController::class, 'create']);
Route::post('/language/updateLanguageLevel/{id}', [LanguageLevelController::class, 'updateLanguageLevel']);
Route::post('/language/updateOrderLanguageLevels', [LanguageLevelController::class, 'updateOrder']);

Route::get('/language/getTypesOfLearning', [TypeOfLearningController::class, 'getAll']);
Route::post('/language/createTypeOfLearning', [TypeOfLearningController::class, 'create']);
Route::post('/language/updateTypeOfLearning/{id}', [TypeOfLearningController::class, 'updateTypeOfLearning']);
Route::post('/language/updateOrderTypesOfLearning', [TypeOfLearningController::class, 'updateOrder']);

Route::get('/language/getKnownLanguages/{userId}', [LanguageController::class, 'getKnownLanguagesFromUser']);
Route::get('/language/getLearningLanguages/{userId}', [LanguageController::class, 'getLearningLanguagesFromUser']);
Route::post('/language/createLanguage', [LanguageController::class, 'create']);
Route::delete('/language/deleteLanguage/{id}', [LanguageController::class, 'deleteLanguage']);
Route::post('/language/updateLanguage/{id}', [LanguageController::class, 'updateLanguage']);
