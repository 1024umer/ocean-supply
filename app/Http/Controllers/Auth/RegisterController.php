<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\RegisterResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        // dd($request->all());
        $user = User::create([
            'email' => $request->email,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'phone' => $request->phone,
            'country' => $request->country,
            'password' => Hash::make($request->password),
            'subscription_id' => $request->subscriptionId,
            'postal_code' => $request->postalCode,
            'street_address' => $request->streetAddress,
            'city' => $request->city,
            'region' => $request->region,
        ]);
        $customerData = [
            "email" => $request->email,
            "first_name" => $request->firstName,
            "last_name" => $request->lastName,
            "authentication" => [
                "force_password_reset" => true,
                "new_password" => $request->password
            ],
            "phone" => $request->phone,
            "addresses" => [
                [
                    "city" => $request->city,
                    "country_code" => $request->country
                ]
            ]
        ];

        $customerData = array(
            array(
                "email" => $request->email,
                "first_name" => $request->firstName,
                "last_name" => $request->lastName,
                "company" => "",
                "phone" => $request->phone,
                "notes" => "",
                "tax_exempt_category" => "",
                "customer_group_id" => 0,
                "addresses" => array(
                    array(
                        "address1" => $request->streetAddress,
                        "address2" => "",
                        "address_type" => "residential",
                        "city" => $request->city,
                        "company" => "",
                        "country_code" => "US",
                        "first_name" => $request->firstName,
                        "last_name" => $request->lastName,
                        "phone" => $request->phone,
                        "postal_code" => $request->postalCode,
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
                    "new_password" => $request->password
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
                CURLOPT_URL => "https://api.bigcommerce.com/stores/1abwowmljz/v3/customers",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => json_encode($customerData),
                CURLOPT_HTTPHEADER => array(
                    "Content-Type: application/json",
                    "X-Auth-Token: j1kgg3t937z28srzikguf8dniv4d5y0"
                ),
            )
        );

        $response = curl_exec($curl);
        $err = curl_error($curl);
        dd($response);
        curl_close($curl);

        if ($err) {
            echo "cURL Error #: " . $err;
        } else {
            echo $response;
        }

        $token = $user->createToken('Task Management Token Grant')->accessToken;
        $user_detail = User::where('id', $user->id)->first();
        $response = ['success' => true, 'token' => $token, 'user' => $user_detail];
        return new RegisterResource($response);
    }
}
