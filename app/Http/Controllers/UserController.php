<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $user = User::where('id','!=', auth('api')->user()->id)->get();
        return  UserResource::collection($user);
    }
}
