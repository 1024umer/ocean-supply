<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Services\BigCommerce\OrderBigCommerceService;

class LoginController extends Controller
{
    public function login(Request $request, OrderBigCommerceService $bigCommerce)
    {
        $amount = Setting::where('key', 'amount')->first();
        $points = Setting::where('key', 'points')->first();
        $is_active = Setting::where('key', 'is_active')->first();
        $totalAmount = 0;

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

                    // if ($is_active->value == "1") {

                    //     $bigCommerceOrders = $bigCommerce->bigCommerceOrders($user);
                    //     foreach ($bigCommerceOrders as $order) {
                    //         $totalAmount += $order['subtotal_inc_tax'];
                    //     }

                    //     if ($totalAmount >= $amount->value) {
                    //         $pointValue = $amount->value / $points->value;
                    //         dd($pointValue * $totalAmount);
                    //         dd("Points+");
                    //     } else {
                    //         dd("No Points");
                    //     }

                    // }
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
