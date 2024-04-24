<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;

class OrderCloverUserService
{
    public function getAllOrders($user)
    {
        $user = (object) $user;
        $curl = curl_init();
        // dd($user->clover_id);
        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://sandbox.dev.clover.com/v3/merchants/' . env('CLOVER_MERCHANT_ID') . '/orders?filter=customer.id%20=%20' . $user->clover_id . '&expand=lineItems,serviceCharge,discounts,credits,payments,refunds',
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
            return json_decode($response);
        }
    }
}
