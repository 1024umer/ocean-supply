<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\ProfileRequest;
use App\Services\Clover\UpdateCloverUserService;
use App\Services\BigCommerce\UpdateBigCommerceUserService;

class ProfileController extends Controller
{
    public $UpdateBigCommerceUserService;
    public $UpdateCloverUserService;

    public function __construct(UpdateBigCommerceUserService $UpdateBigCommerceUserService, UpdateCloverUserService $UpdateCloverUserService)
    {
        $this->UpdateBigCommerceUserService = $UpdateBigCommerceUserService;
        $this->UpdateCloverUserService = $UpdateCloverUserService;
    }

    public function update(ProfileRequest $request)
    {
        $user = User::find(auth('api')->user()->id);
        $BigCommerce = $this->UpdateBigCommerceUserService->update($request->all(), $user);
        $Clover = $this->UpdateCloverUserService->update($request->all(), $user);

        if ($BigCommerce && $Clover) {
            $user->update($request->all());
            return new ProfileResource($user);
        } else {

            return response()->json(['message' => 'Something went wrong.'], 500);
        }
    }
}
