<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\{SubscriptionController,ProfileController};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['json.response']], function () {
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/login', [LoginController::class, 'login']);
});
Route::group(['middleware' => ['json.response', 'auth:sanctum','verified']], function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::apiResource('subscription', SubscriptionController::class);
});
