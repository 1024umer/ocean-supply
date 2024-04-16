<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update(){
        $user = User::find(auth('api')->user()->id);
        dd($user);
    }
}
