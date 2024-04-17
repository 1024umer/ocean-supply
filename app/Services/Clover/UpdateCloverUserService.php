<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;

class UpdateCloverUserService
{

    public function update($data, $user)
    {
        $userData = (object) $data;

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://sandbox.dev.clover.com/v3/merchants/".env('CLOVER_MERCHANT_ID')."/customers/".$user->clover_id,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode(
                [
                    'firstName' => $userData->first_name,
                    'lastName' => $userData->last_name,
                    'phoneNumbers' => [
                        [
                            'phoneNumber' => $userData->phone
                        ]
                    ],
                    'emailAddresses' => [
                        [
                            'emailAddress' => $userData->email,
                            'primaryEmail' => true,
                            'verifiedTime' => date(strtotime('Y-d-m-H:i:s'))
                        ]
                    ],
                    'customerSince' => date(strtotime('Y-d-m-H:i:s')),
                ]
            ),
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer ".env('CLOVER_BEARRER_TOKEN'),
                "Content-Type: application/json"
            ),
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return response()->json($err,404);
        } else {
            return json_decode($response,true);
        }
    }
}
