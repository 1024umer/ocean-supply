<?php

namespace App\Services\BigCommerce;

use Illuminate\Support\Facades\Http;

class UsersGet
{
public function BigCommerceUserGet()
{

    $url = "https://api.bigcommerce.com/stores/".env('BIGCOMMERCE_STORE_HASH')."/v3/customers";

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/json",
            "X-Auth-Token:".env('BIGCOMMERCE_AUTH_TOKEN')
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        echo $response;
    }
}

}
