<?php

namespace App\Services\BigCommerce;

use Illuminate\Support\Facades\Http;

class UpdateBigCommerceUserService
{
    public function update($data, $user)
    {
        $data = (object) $data;
        $user = (object) $user;
        $customerData = array(
            array(
                "email" => $data->email,
                "first_name" => $data->first_name,
                "last_name" => $data->last_name,
                "company" => "Company",
                "phone" => $data->phone,
                "registration_ip_address" => "127.0.0.1",
                "notes" => "notes",
                "tax_exempt_category" => "tax_exempt_category",
                "customer_group_id" => 0,
                "id" => $user->bigcommerce_id,
                "authentication" => array(
                    "force_password_reset" => true
                ),
                "accepts_product_review_abandoned_cart_emails" => true,
                "store_credit_amounts" => array(
                    array("amount" => $data->store_credit_amount)
                )
            )
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.bigcommerce.com/stores/".env('BIGCOMMERCE_STORE_HASH')."/v3/customers",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "PUT",
            CURLOPT_POSTFIELDS => json_encode($customerData),
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json",
                "X-Auth-Token: ".env('BIGCOMMERCE_AUTH_TOKEN')
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return response()->json($err,404);
        } else {
            return json_decode($response,true);
        }
    }
    public function updateStoreCreditAmount($user, $storeCreditAmount)
    {
        $data = (object) $user;
        $storeCreditAmount = $storeCreditAmount;
        // dd($storeCreditAmount);
        $customerData = array(
            array(
                "id" => $user->bigcommerce_id,
                "store_credit_amounts" => array(
                    array("amount" => $storeCreditAmount)
                )
            )
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.bigcommerce.com/stores/".env('BIGCOMMERCE_STORE_HASH')."/v3/customers",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "PUT",
            CURLOPT_POSTFIELDS => json_encode($customerData),
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json",
                "X-Auth-Token: ".env('BIGCOMMERCE_AUTH_TOKEN')
            ),
        ));

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
