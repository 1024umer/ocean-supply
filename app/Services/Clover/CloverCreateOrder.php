<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;
use App\Services\Clover\CreateCloverPaymentService;
class CloverCreateOrder
{
    protected $createCloverPaymentService;
    public function __construct(CreateCloverPaymentService $createCloverPaymentService){
        $this->createCloverPaymentService = $createCloverPaymentService;
    }
    public function createOrder($user, $request)
    {
        $user = (object) $user;
        $request = (object) $request;
        $curl = curl_init();
        $lineItems = [];
        foreach ($request->cart as $item) {
            $lineItems[] = [
                'printed' => 'false',
                'exchanged' => 'false',
                'refunded' => 'false',
                'refund' => [
                    'transactionInfo' => [
                        'isTokenBasedTx' => 'false',
                        'emergencyFlag' => 'false'
                    ]
                ],
                'isRevenue' => 'false',
                'id' => $item['id'],
                'price' => $item['price'],
                'unitQty' => 1
            ];
        }
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
                'lineItems' => $lineItems,
                'title' => $request->title,
                'note' => $request->note,
                'total' => $request->totalPrice,
                'paymentState' => 'PAID',
                'customers' => [
                    [
                        'id' => $user->clover_id,
                        'firstName' => $user->first_name,
                        'lastName' => $user->last_name
                    ]
                ],
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
            dd($response);
            $this->createCloverPaymentService->createPayment($response['id']);
            return $response;
        }
    }
}
