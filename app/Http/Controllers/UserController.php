<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPoint;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Http\Requests\ProfileRequest;
use App\Services\Clover\UpdateCloverUserService;
use App\Services\BigCommerce\UpdateBigCommerceUserService;

class UserController extends Controller
{
    public function __construct(UpdateBigCommerceUserService $UpdateBigCommerceUserService, UpdateCloverUserService $UpdateCloverUserService)
    {
        $this->UpdateBigCommerceUserService = $UpdateBigCommerceUserService;
        $this->UpdateCloverUserService = $UpdateCloverUserService;
    }
    public function index(){
        $user = User::where('id','!=', auth('api')->user()->id)->with('point')->get();
        return  UserResource::collection($user);
    }

    public function show(User $user){
        $points = UserPoint::where('user_id', $user->id)->first();
        return new UserResource($user->load('point'));
    }

    public function update(UserRequest $request, User $user){
        $user = User::find($user->id);
        $BigCommerce = $this->UpdateBigCommerceUserService->update($request->all(), $user);
        $Clover = $this->UpdateCloverUserService->update($request->all(), $user);
        if ($BigCommerce && $Clover) {
            $user->update($request->all());
            $userPoints = UserPoint::where('user_id',$user->id)->first();
            $userPoints->store_credit_amount = $request->store_credit_amount;
            $userPoints->save();
            return new UserResource($user);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 500);
        }
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
