<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;

class CreateCloverLineItem
{
    public function createLineItem($orderId, $request)
    {
        $curl = curl_init();
        $lineItems = [];
        foreach ($request['cart'] as $item) {
            $lineItems[] =
                [
                    'item' => [
                        'id' => $item['id']
                    ],
                    'printed' => 'false',
                    'exchanged' => 'false',
                    'refunded' => 'false',
                    'refund' => [
                        'transactionInfo' => [
                            'isTokenBasedTx' => 'false',
                            'emergencyFlag' => 'false'
                        ]
                    ],
                    'isRevenue' => 'true',
                    'name' => $item['name'],
                    'colorCode' => $item['code'],
                    'price' => $item['price'],
                    'unitQty' => 1,
                    'createdTime' => $item['modifiedTime'],
                    'orderClientCreatedTime' => $item['modifiedTime']
                ];
        }
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://sandbox.dev.clover.com/v3/merchants/" . env('CLOVER_MERCHANT_ID') . "/orders/$orderId/bulk_line_items",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode([
                'items' => $lineItems
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
