<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\User;
use App\Services\Clover\CloverCreateOrder;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Services\Clover\OrderCloverUserService;
use App\Services\BigCommerce\OrderBigCommerceService;

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
    public function store(CloverCreateOrder $cloverCreateOrder,OrderRequest $request){
        $user = User::find(auth('api')->user()->id);
        $data = $cloverCreateOrder->createOrder($user,$request->all());
        dd($data);
    }
}
