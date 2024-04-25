<?php

namespace App\Http\Controllers;

use App\Services\BigCommerce\UsersGet;
use Illuminate\Http\Request;

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

}
