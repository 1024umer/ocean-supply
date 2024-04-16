<?php

namespace App\Services\BigCommerce;

use Illuminate\Support\Facades\Http;

class CreateUserService
{
    public function createUser($userData)
    {
        $userData = (object) $userData;
        $customerData = [
            "email" => $userData->email,
            "first_name" => $userData->firstName,
            "last_name" => $userData->lastName,
            "authentication" => [
                "force_password_reset" => true,
                "new_password" => $userData->password
            ],
            "phone" => $userData->phone,
            "addresses" => [
                [
                    "city" => $userData->city,
                    "country_code" => $userData->country
                ]
            ]
        ];

        $customerData = array(
            array(
                "email" => $userData->email,
                "first_name" => $userData->firstName,
                "last_name" => $userData->lastName,
                "company" => "",
                "phone" => $userData->phone,
                "notes" => "",
                "tax_exempt_category" => "",
                "customer_group_id" => 0,
                "addresses" => array(
                    array(
                        "address1" => $userData->streetAddress,
                        "address2" => "",
                        "address_type" => "residential",
                        "city" => $userData->city,
                        "company" => "",
                        "country_code" => "US",
                        "first_name" => $userData->firstName,
                        "last_name" => $userData->lastName,
                        "phone" => $userData->phone,
                        "postal_code" => $userData->postalCode,
                        "state_or_province" => "California",
                        "form_fields" => array(
                            array(
                                "name" => "test",
                                "value" => "test"
                            )
                        )
                    )
                ),
                "authentication" => array(
                    "force_password_reset" => true,
                    "new_password" => $userData->password
                ),
                "accepts_product_review_abandoned_cart_emails" => true,
                "store_credit_amounts" => array(
                    array(
                        "amount" => 200
                    )
                ),
                "origin_channel_id" => 1,
                "channel_ids" => array(1),
                "form_fields" => array(
                    array(
                        "name" => "test",
                        "value" => "test"
                    )
                )
            )
        );

        $curl = curl_init();

        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => "https://api.bigcommerce.com/stores/".env('BIGCOMMERCE_STORE_HASH')."/v3/customers",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => json_encode($customerData),
                CURLOPT_HTTPHEADER => array(
                    "Content-Type: application/json",
                    "X-Auth-Token: ".env('BIGCOMMERCE_AUTH_TOKEN')
                ),
            )
        );

        $response = curl_exec($curl);
        $err = curl_error($curl);
        // dd($response);
        curl_close($curl);

        if ($err) {
            return response()->json($err,404);
        } else {
            return json_decode($response,true);
        }
    }
}
