<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;
use App\Services\Clover\{DiscountOnOrder,CreateCloverPaymentService,CreateCloverLineItem};

class CloverCreateOrder
{
    protected $createCloverPaymentService;
    protected $createCloverLineItem;
    protected $discountOnOrder;
    public function __construct(DiscountOnOrder $discountOnOrder,CreateCloverLineItem $createCloverLineItem,CreateCloverPaymentService $createCloverPaymentService)
    {
        $this->createCloverPaymentService = $createCloverPaymentService;
        $this->createCloverLineItem = $createCloverLineItem;
        $this->discountOnOrder = $discountOnOrder;
    }
    public function createOrder($user, $request)
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
                'employee' => [
                    'id' => '3B7FRFF86PVTJ'
                ],
                'taxRemoved' => 'false',
                'title' => $request['title'],
                'note' => $request['note'],
                'total' => $request['totalPrice'],
                'paymentState' => 'PAID',
                'customers' => [
                    [
                        'merchant' => [
                            'id' => env('CLOVER_MERCHANT_ID')
                        ],
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
        $order = json_decode($response, true);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return "cURL Error #:" . $err;
        } else {
            $payment = $this->createCloverPaymentService->createPayment($order, $request);
            $lineItem = $this->createCloverLineItem->createLineItem($order['id'], $request);
            $discount = $this->discountOnOrder->createDiscount($order['id'], $request);
            // dd($discount);
            return [$payment,$lineItem];
        }
    }
}
