<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserGetController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\{SubscriptionController,ProfileController,UserController,OrderController,InventoryController};


Route::group(['middleware' => ['json.response']], function () {
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/login', [LoginController::class, 'login']);
});
Route::group(['middleware' => ['json.response', 'auth:sanctum','verified']], function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::apiResource('subscription', SubscriptionController::class)->only(['store', 'show', 'update', 'destroy']);
    Route::apiResource('/user',UserController::class);
    Route::get('/order/{id}',[OrderController::class,'getOrders']);
    Route::get('/getUsers',[UserGetController::class,'getUsers']);
    Route::get('/getCloverUsers',[UserGetController::class,'getCloverUsers']);
    Route::get('/getBigCommerceUsers',[UserGetController::class,'getBigCommerceUsers']);
    Route::apiResource('inventory',InventoryController::class);
    Route::post('/create-order',[OrderController::class,'store']);
    Route::post('/refund-order/{id}',[OrderController::class,'refundOrder']);
    Route::get('/loyalty-points/{id}',[UserController::class,'loyaltyPoints']);
    Route::apiResource('setting',SettingController::class);
    Route::get('/getAllOrders',[OrderController::class,'getAllOrders']);
    Route::get('/getAllPayment/{id}',[PaymentController::class,'index']);
    Route::get('/getCloverSingleCustomer/{id}',[UserGetController::class,'getCloverSingleCustomer']);
    Route::post('/settingUpdate',[SettingController::class,'update']);
    Route::get('/order/show/{id}',[OrderController::class,'show']);
});
Route::get('/subscriptionList', [SubscriptionController::class, 'subscriptionList']);
