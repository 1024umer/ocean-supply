<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;

class CloverUserGet
{
    public function CloverUserGet()
    {
        $accessToken = env('CLOVER_BEARRER_TOKEN');
        if (!$accessToken) {
            return json_encode(['error' => 'Clover access token not found']);
        }

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://sandbox.dev.clover.com/v3/merchants/" . env('CLOVER_MERCHANT_ID') . "/customers",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "accept: application/json",
                "Authorization: Bearer $accessToken",
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return json_encode(['error' => "cURL Error: $err"]);
        } else {
            return $response;
        }
    }

}
