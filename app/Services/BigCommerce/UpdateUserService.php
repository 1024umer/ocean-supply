<?php

namespace App\Services\BigCommerce;

use Illuminate\Support\Facades\Http;

class UpdateUserService
{
    public function update($id)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.bigcommerce.com/stores/".env('BIGCOMMERCE_STORE_HASH')."/v3/customers",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "PUT",
            CURLOPT_POSTFIELDS => "[{\"email\":\"string\",\"first_name\":\"string\",\"last_name\":\"string\",\"company\":\"string\",\"phone\":\"string\",\"registration_ip_address\":\"string\",\"notes\":\"string\",\"tax_exempt_category\":\"string\",\"customer_group_id\":0,\"id\":1,\"authentication\":{\"force_password_reset\":true,\"new_password\":\"string123\"},\"accepts_product_review_abandoned_cart_emails\":true,\"store_credit_amounts\":[{\"amount\":43.15}],\"origin_channel_id\":1,\"channel_ids\":[1],\"form_fields\":[{\"name\":\"test\",\"value\":\"test\"}]}]",
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json",
                "X-Auth-Token: ".env('BIGCOMMERCE_AUTH_TOKEN')
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            echo $response;
        }
    }
}
