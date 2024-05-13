<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;
class getCloverAllOrders
{
    public function getCloverAllOrders(){

        $curl = curl_init();

        curl_setopt_array($curl, [
        CURLOPT_URL => "https://sandbox.dev.clover.com/v3/merchants/". env('CLOVER_MERCHANT_ID') ."/orders?expand=customers%2ClineItems%2Cdiscounts",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer " . env('CLOVER_BEARRER_TOKEN'),
            "Content-Type: application/json"
        ),
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
        return "cURL Error #:" . $err;
        } else {
        $orders = json_decode($response, true);
        return $orders;
        }
    }
}
