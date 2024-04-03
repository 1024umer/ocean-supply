<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        dd($request->all());
        $user = User::create([
            'email' => $request->email,
            'first_name' => $request->name,
            'username' => $request->username,
            'phone' => $request->phone,
            'country_id' => $request->country_id,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'skills' => $request->skills,
        ]);
        if ($request->image) {
            $this->file->create([$request->image], 'users', $user->id, 1);
        }
        $token = $user->createToken('Task Management Token Grant')->accessToken;
        $user_detail = User::where('id', $user->id)->first();
        $response = ['success' => true, 'token' => $token, 'user' => $user_detail];
        return response($response, 200);
    }
}
