<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::group(['middleware' => ['cors', 'json.response']], function () {
	Route::post('/register', [RegisterController::class, 'register']);
});
