<?php

namespace App\Services\Clover;

use App\Models\Order;
use Illuminate\Support\Facades\Http;
// use App\Services\Clover\{DiscountOnOrder, CreateCloverPaymentService, CreateCloverLineItem,CreateOrderCustomer};

class RefundCloverOrder
{
    public function refund($orderId){
        $curl = curl_init();
        // dd($user->clover_id);
        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://scl-sandbox.dev.clover.com/v1/orders/'.$orderId.'/returns',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer " . env('CLOVER_PRIV_ACCESS_TOKEN'),
                "Content-Type: application/json"
            ),
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return "cURL Error #:" . $err;
        } else {
            return json_decode($response);
        }
    }
}
