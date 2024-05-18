<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Setting;
use App\Models\UserPoint;
use App\Services\Clover\GetCloverSingleOrder;
use App\Services\Clover\RefundCloverOrder;
use Illuminate\Http\Request;
use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Services\Clover\CloverCreateOrder;
use App\Services\Clover\getCloverAllOrders;
use App\Services\Clover\OrderCloverUserService;
use App\Services\BigCommerce\OrderBigCommerceService;
use App\Services\BigCommerce\UpdateBigCommerceUserService;

class OrderController extends Controller
{
    public function getOrders($id, OrderBigCommerceService $bigCommerce, OrderCloverUserService $orderClover)
    {
        $user = User::find($id);
        if ($user) {
            $cloverOrders = $orderClover->getAllOrders($user);
            $bigCommerceOrders = $bigCommerce->bigCommerceOrders($user);

            return [
                'clover_orders' => new OrderResource($cloverOrders),
                'big_commerce_orders' => new OrderResource($bigCommerceOrders),
            ];
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
    public function store(UpdateBigCommerceUserService $UpdateBigCommerceUserService, CloverCreateOrder $cloverCreateOrder, OrderRequest $request)
    {
        $points = Setting::where('key', 'points')->value('value');
        $value = Setting::where('key', 'value')->value('value');
        $discountAmount = $request->discount;
        $userPoints = $request->pointUser;
        $perPointValue = $value / $points;
        $discountInPoints = $discountAmount / $perPointValue;
        $updatedUserPoints = $userPoints - $discountInPoints;

        $user = User::where('id', $request->user)->first();
        $data = $cloverCreateOrder->createOrder($user, $request->all());

        if ($data) {
            $userPoints = UserPoint::where('user_id', $user->id)->first();
            $userPoints->remaining_points = $updatedUserPoints;
            $userPoints->store_credit_amount -= $request->discount;
            $userPoints->save();
            $StoreCreditAmount = $userPoints->store_credit_amount;
            $Service = $UpdateBigCommerceUserService->updateStoreCreditAmount($user, $StoreCreditAmount);
        }
        return $data[2]->id;
        // return new OrderResource($data);
    }
    public function show($id, GetCloverSingleOrder $getCloverSingleOrder){
        $response = $getCloverSingleOrder->singleOrder($id);
        return response()->json($response);
    }
    public function getAllOrders(getCloverAllOrders $getCloverAllOrders)
    {
        $response = $getCloverAllOrders->getCloverAllOrders();
        return response()->json($response);
    }
    public function refundOrder($orderId, RefundCloverOrder $refundCloverOrder)
    {
        $response = $refundCloverOrder->refund($orderId);
        return response()->json($response);
    }
}
