<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;
use App\Services\Clover\{DiscountOnOrder, CreateCloverPaymentService, CreateCloverLineItem,CreateOrderCustomer};

class CloverCreateOrder
{
    protected $createCloverPaymentService;
    protected $createCloverLineItem;
    protected $discountOnOrder;
    protected $createOrderCustomer;
    public function __construct(CreateOrderCustomer $createOrderCustomer,DiscountOnOrder $discountOnOrder, CreateCloverLineItem $createCloverLineItem, CreateCloverPaymentService $createCloverPaymentService)
    {
        $this->createCloverPaymentService = $createCloverPaymentService;
        $this->createCloverLineItem = $createCloverLineItem;
        $this->discountOnOrder = $discountOnOrder;
        $this->createOrderCustomer = $createOrderCustomer;
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
                'state' => 'open',
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
            $customer = $this->createOrderCustomer->createOrderCustomer($order['id'], $user);
            return [$payment, $lineItem];
        }
    }
}
