<?php
namespace App\Services\UserPoints;

use App\Models\User;
use App\Models\Setting;
use App\Models\UserPoint;
use App\Services\Clover\OrderCloverUserService;
use App\Services\BigCommerce\OrderBigCommerceService;
use App\Services\BigCommerce\UpdateBigCommerceUserService;

class UserPoints
{
    protected $bigCommerceOrders;
    protected $cloverOrders;
    protected $UpdateBigCommerceUserService;


    public function __construct(OrderBigCommerceService $bigCommerceOrders, OrderCloverUserService $cloverOrders, UpdateBigCommerceUserService $UpdateBigCommerceUserService)
    {
        $this->bigCommerceOrders = $bigCommerceOrders;
        $this->cloverOrders = $cloverOrders;
        $this->UpdateBigCommerceUserService = $UpdateBigCommerceUserService;
    }
    public function userPoints($user)
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


        // Check If User Points data exists, if not create it
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

        $bigCommerceOrders = $this->bigCommerceOrders->bigCommerceOrders($user);
        $orderClover = $this->cloverOrders->getAllOrders($user);

        $BigCommerceIndex = null;
        if($bigCommerceOrders && count($bigCommerceOrders) > 0){

            foreach ($bigCommerceOrders as $index => $order) {
                if($order['id'] == $userPoints->last_bigCommerce_order_id){
                    $BigCommerceIndex = $index;
                    break;
                }
            }

            foreach ($bigCommerceOrders as $index => $order) {
                if ($index-1 < $BigCommerceIndex) {
                    continue;
                }
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
                if ($index-1 < $CloverIndex) {
                    continue;
                }
                $lastCloverOrderId = $order->id;
                if (isset($order->lineItems) && is_array($order->lineItems->elements) && count($order->lineItems->elements) > 0) {
                    $totalCloverAmount += $order->lineItems->elements[0]->price / 100;
                } else {
                    $totalCloverAmount += 0;
                }
            }

        }

        $grandTotal = $totalBigCommerceAmount + $totalCloverAmount;
        if ($grandTotal >= $amount->value) {
            $points = $points->value;
            $shoppingAmount = $amount->value;
            $shoppingAmount = (int)$shoppingAmount;
            $points = (int)$points;
            $pointsEarned = intval(($grandTotal / $shoppingAmount) * $points);

            if($userPoints && ($userPoints->last_clover_order_id != $lastCloverOrderId || $userPoints->last_bigCommerce_order_id != $lastBigCommerceOrderId)){
                if($lastCloverOrderId != ''){
                    $userPoints->last_clover_order_id = $lastCloverOrderId;
                }
                if($lastBigCommerceOrderId != 0){
                    $userPoints->last_bigCommerce_order_id = $lastBigCommerceOrderId;
                }
                $userPoints->total_points += $pointsEarned;
                $userPoints->remaining_points += $pointsEarned;

                $storeCreditAmount = $value->value/$points * $pointsEarned;
                $BigCommerce = $this->UpdateBigCommerceUserService->updateStoreCreditAmount($user ,$storeCreditAmount);
                $userPoints->store_credit_amount = $storeCreditAmount;
                $userPoints->save();

                return response("Points Added", 200);
            }
        } else {
            return response("No Points", 200);
        }
    }
}
