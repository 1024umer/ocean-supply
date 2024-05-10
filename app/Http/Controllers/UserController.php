<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserPoint;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $user = User::where('id','!=', auth('api')->user()->id)->with('point')->get();
        return  UserResource::collection($user);
    }

    public function show(User $user){
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user){
        $user->update($request->all());
        return new UserResource($user);
    }

    public function destroy(User $user){
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function loyaltyPoints($id)
    {
        $userPoints = UserPoint::where('user_id', $id)->first();
        return response()->json($userPoints);
    }
}
