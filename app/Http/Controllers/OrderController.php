<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\User;
use App\Services\Clover\OrderCloverUserService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function getOrders($id,OrderCloverUserService $orderClover){
        $user = User::find($id);
        if($user){
            $data  = $orderClover->getAllOrders($user);
            // dd($data);
            return new OrderResource($data);
        }else{
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
