<?php

namespace App\Services\BigCommerce;

use App\Models\User;
use Illuminate\Support\Facades\Http;

class OrderBigCommerceService
{

    public function bigCommerceOrders($user)
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://api.bigcommerce.com/stores/" . env('BIGCOMMERCE_STORE_HASH') . "/v2/orders",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "Accept: application/json",
                "Content-Type: application/json",
                "X-Auth-Token: " . env('BIGCOMMERCE_AUTH_TOKEN')
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            $orders = json_decode($response, true);
            $customerOrders = [];

            foreach ($orders as $order) {
                if ($user->bigcommerce_id === $order['customer_id']) {
                    $customerOrders[] = $order;
                }
            }
            return $customerOrders;
        }
    }
}
