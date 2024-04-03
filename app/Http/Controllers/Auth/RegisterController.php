<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\RegisterResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        // dd($request->all());
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
        ]);
        $token = $user->createToken('Task Management Token Grant')->accessToken;
        $user_detail = User::where('id', $user->id)->first();
        $response = ['success' => true, 'token' => $token, 'user' => $user_detail];
        return new RegisterResource($response);
    }
}
