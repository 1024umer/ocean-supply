<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BigCommerce\UsersGet;
use App\Services\Clover\CloverUserGet;
use App\Services\Clover\CloverGetSingleCustomer;

class UserGetController extends Controller
{
    public function getUsers(UsersGet $service)
    {
        $response = $service->BigCommerceUserGet();

        $decodedResponse = json_decode($response, true);
        if ($decodedResponse === null) {
            return response()->json(['error' => 'Failed to decode JSON response'], 500);
        }

        return response()->json($decodedResponse);
    }

    public function getCloverUsers(CloverUserGet $service)
    {
        $response = $service->CloverUserGet();
        $decodedResponse = json_decode($response, true);
        if ($decodedResponse === null) {
            return response()->json(['error' => 'Failed to decode JSON response'], 500);
        }
        return response()->json($decodedResponse);
    }

    public function getBigCommerceUsers(UsersGet $BigCommerceUserGet)
    {
        $response = $BigCommerceUserGet->BigCommerceUserGet();

        $decodedResponse = json_decode($response, true);
        if ($decodedResponse === null) {
            return response()->json(['error' => 'Failed to decode JSON response'], 500);
        }
        return response()->json($decodedResponse);

    }

    public function getCloverSingleCustomer(CloverGetSingleCustomer $service, $id)
    {
        $response = $service->CloverGetSingleCustomer($id);
        return response()->json($response);
    }

}
