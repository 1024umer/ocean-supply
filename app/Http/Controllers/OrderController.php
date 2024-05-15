<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Services\Clover\CloverCreateOrder;
use App\Services\Clover\getCloverAllOrders;
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
        $user = User::where('id',$request->user)->first();
        $data = $cloverCreateOrder->createOrder($user,$request->all());
        dd($data);
        return new OrderResource($data);
    }
    public function getAllOrders(getCloverAllOrders $getCloverAllOrders)
    {
        $response = $getCloverAllOrders->getCloverAllOrders();
        return response()->json($response);
    }
}
