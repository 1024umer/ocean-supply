<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;

class CreateCloverUserService
{
    public function createUser($userData)
    {
        $userData = (object) $userData;
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://sandbox.dev.clover.com/v3/merchants/W39GQWW4TYSX1/customers",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode(
                [
                    'firstName' => $userData->firstName,
                    'lastName' => $userData->lastName,
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
                'Authorization: Bearer 3a448668-d553-f7a1-efca-b9ba5ee23647',
                'Content-Type: application/json'
            ),
        ]);
        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        if ($err) {
            return response()->json($err, 500);
        } else {
            return response()->json($response, 200);
        }
    }
}
