<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 404);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if ($user->is_email_verified == 1) {
                if (Hash::check($request->password, $user->password)) {
                    $token = $user->createToken('Ocean Supply')->plainTextToken;
                    $response = ['token' => $token, 'user' => $user];
                    return response($response, 200);
                } else {
                    $response = ["success" => false, "message" => "Password mismatch"];
                    return response($response, 404);
                }
            } else {
                if (Hash::check($request->password, $user->password)) {
                    $token = $user->createToken('Ocean Supply')->plainTextToken;
                    $response = ['success' => true, 'token' => $token, 'user' => $user];
                    return response($response, 200);
                }
                $response = ['success' => false, "message" => "Password doesn't match"];
                return response($response, 404);
            }
        } else {
            $response = ['success' => false, "message" => 'User does not exist'];
            return response($response, 404);
        }
    }
    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        $response = ['success' => true, 'message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }
}
