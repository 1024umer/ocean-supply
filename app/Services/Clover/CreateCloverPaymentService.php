<?php

namespace App\Services\Clover;

use Illuminate\Support\Facades\Http;

class CreateCloverPaymentService
{
    public function createPayment($order,$request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://sandbox.dev.clover.com/v3/merchants/" . env('CLOVER_MERCHANT_ID') . "/orders/{$order['id']}/payments",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode([
                "offline" => "true",
                "tender" => [
                    "opensCashDrawer" => true,
                    "supportsTipping" => true,
                    "enabled" => false,
                    "id" => "Z1PQG8ZVHX5SA"
                ],
                "transactionSettings" => [
                    "disableCashBack" => "false",
                    "cloverShouldHandleReceipts" => "true",
                    "forcePinEntryOnSwipe" => "false",
                    "disableRestartTransactionOnFailure" => "false",
                    "allowOfflinePayment" => "false",
                    "approveOfflinePaymentWithoutPrompt" => "false",
                    "forceOfflinePayment" => "false",
                    "disableReceiptSelection" => "false",
                    "disableDuplicateCheck" => "false",
                    "autoAcceptPaymentConfirmations" => "false",
                    "autoAcceptSignature" => "false",
                    "returnResultOnTransactionComplete" => "false",
                    "disableCreditSurcharge" => "false"
                ],
                "transactionInfo" => [
                    "isTokenBasedTx" => "false",
                    "emergencyFlag" => "false"
                ],
                "result" => "SUCCESS",
                "taxAmount" => $request['taxAmount']??0,
                "amount" => $order['total'],
                "cashbackAmount" => $request['cashAmount'],
                "cashTendered" => $request['cashAmount']
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
            return response()->json($err, 404);
        } else {
            return response()->json($response, 200);
        }
    }
}
