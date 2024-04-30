<?php

namespace App\Http\Controllers;

use App\Models\User;
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
            $data = $orderClover->getAllOrders($user);
            $data2 = $bigCommerce->bigCommerceOrders($user);
            return new OrderResource($data2);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

}
