<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Clover\getCloverPayment;

class PaymentController extends Controller
{
   public function index($OrderId, getCloverPayment $getCloverPayment){
    $getCloverPayments = $getCloverPayment->getCloverPayment($OrderId);
    return response()->json($getCloverPayments);
   }
}
