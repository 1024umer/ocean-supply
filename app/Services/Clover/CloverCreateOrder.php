<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;

class CloverCreateOrder
{
    public function createOrder($user)
    {
        $user = (object) $user;
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://sandbox.dev.clover.com/v3/merchants/" . env('CLOVER_MERCHANT_ID') . "/orders",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode([
                
                'taxRemoved' => 'false',
                'customers' => [
                    [
                        'id' => $user->clover_id,
                        'orders' => [
                            [
                                'id' => 'G1P1PMXR5JYJW'
                            ]
                        ]
                    ]
                ],
                'lineItems' => [
                    [
                        'printed' => 'false',
                        'exchanged' => 'false',
                        'refunded' => 'false',
                        'refund' => [
                            'transactionInfo' => [
                                'isTokenBasedTx' => 'false',
                                'emergencyFlag' => 'false'
                            ]
                        ],
                        'isRevenue' => 'false'
                    ]
                ]
            ]),
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
            return $response;
        }
    }
}
