<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\RegisterResource;
use App\Models\User;
use App\Services\BigCommerce\CreateUserService;
use App\Services\Clover\CreateCloverUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class RegisterController extends Controller
{
    public $createUserService;
    public $createCloverUserService;
    public function __construct(CreateUserService $createUserService, CreateCloverUserService $createCloverUserService)
    {
        $this->createUserService = $createUserService;
        $this->createCloverUserService = $createCloverUserService;
    }
    public function register(RegisterRequest $request)
    {
        $bigCommerce = $this->createUserService->createUser($request->all());

        $clover = $this->createCloverUserService->createUser($request->all());
        // dd($bigCommerce);
        $user = User::create([
            'email' => $request->email,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'phone' => $request->phone,
            'country' => $request->country,
            'password' => Hash::make($request->password),
            'subscription_id' => $request->subscriptionId,
            'postal_code' => $request->postalCode,
            'street_address' => $request->streetAddress,
            'city' => $request->city,
            'region' => $request->region,
            'role_id' => User::USER_ROLE_ID,
            'bigcommerce_id' => $bigCommerce['id'],
            'clover_id' => $clover['id'],
        ]);
        $token = $user->createToken('Task Management Token Grant')->plainTextToken;
        $user_detail = User::where('id', $user->id)->first();
        $response = ['success' => true, 'token' => $token, 'user' => $user_detail];
        return new RegisterResource($response);
    }
}
