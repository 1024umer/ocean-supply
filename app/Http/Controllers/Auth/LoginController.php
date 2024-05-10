<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\Setting;
use App\Models\UserPoint;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Services\Clover\OrderCloverUserService;
use App\Services\BigCommerce\OrderBigCommerceService;

class LoginController extends Controller
{
    public function login(Request $request, OrderBigCommerceService $bigCommerce, OrderCloverUserService $orderClover)
    {
        $amount = Setting::where('key', 'amount')->first();
        $points = Setting::where('key', 'points')->first();
        $value = Setting::where('key', 'value')->first();
        $lastCloverOrderId = '';
        $lastBigCommerceOrderId = 0;
        $is_active = Setting::where('key', 'is_active')->first();
        $totalBigCommerceAmount = 0;
        $totalCloverAmount = 0;
        $grandTotal = 0;
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

                        if ($is_active->value == "1") {

                            $userPoints = UserPoint::where('user_id', $user->id)->first();
                            if(!$userPoints){
                                $userPoints = new UserPoint();
                                $userPoints->user_id = $user->id;
                                $userPoints->total_points = 0;
                                $userPoints->remaining_points = 0;
                                $userPoints->last_clover_order_id = '';
                                $userPoints->last_bigCommerce_order_id = 0;
                                $userPoints->save();
                            }
                            $bigCommerceOrders = $bigCommerce->bigCommerceOrders($user);
                            $orderClover = $orderClover->getAllOrders($user);

                            $BigCommerceIndex = null;
                            if($bigCommerceOrders && count($bigCommerceOrders) > 0){
                                foreach ($bigCommerceOrders as $index => $order) {
                                    if($order['id'] == $userPoints->last_bigCommerce_order_id){
                                        $BigCommerceIndex = $index;
                                        break;
                                    }
                                }

                                foreach ($bigCommerceOrders as $index => $order) {
                                    // Skip orders before $BigCommerceIndex
                                    if ($index-1 < $BigCommerceIndex) {
                                        continue;
                                    }
                                    // Add the subtotal of the current order to totalBigCommerceAmount
                                        $lastBigCommerceOrderId = $order['id'];
                                        $totalBigCommerceAmount += $order['subtotal_inc_tax'];
                                }
                            }

                            $CloverIndex = null;
                            if(count($orderClover->elements) > 0){

                                foreach($orderClover->elements as $index => $order) {
                                    if($order->id == $userPoints->last_clover_order_id){
                                        $CloverIndex = $index;
                                        break;
                                    }
                                }

                                foreach ($orderClover->elements as $index => $order) {
                                    // Skip orders before $CloverIndex
                                    if ($index-1 < $CloverIndex) {
                                        continue;
                                    }
                                    // Add the price of the current order to totalCloverAmount
                                    $lastCloverOrderId = $order->id;
                                    $totalCloverAmount += $order->lineItems->elements[0]->price/100 ??0;
                                }
                            }

                            // dd($totalCloverAmount);

                            $grandTotal = $totalBigCommerceAmount + $totalCloverAmount;
                            if ($grandTotal >= $amount->value) {

                                $points = $points->value;
                                $shoppingAmount = $amount->value;
                                $pointsEarned = floor($grandTotal / $shoppingAmount) * $points;

                                if($userPoints && ($userPoints->last_clover_order_id != $lastCloverOrderId || $userPoints->last_bigCommerce_order_id != $lastBigCommerceOrderId)){
                                    if($lastCloverOrderId != ''){
                                        $userPoints->last_clover_order_id = $lastCloverOrderId;
                                    }
                                    if($lastBigCommerceOrderId != 0){
                                        $userPoints->last_bigCommerce_order_id = $lastBigCommerceOrderId;
                                    }
                                    $userPoints->total_points += $pointsEarned;
                                    $userPoints->remaining_points += $pointsEarned;
                                    $userPoints->save();
                                    return response($response, 200);
                                    // dd("Points earned");
                                }
                            } else {
                                return response($response, 200);
                                // dd("No Points");
                            }
                        }
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
