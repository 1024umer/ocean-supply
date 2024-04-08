<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscriptionRequest;
use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subscriptions = Subscription::all();
        return SubscriptionResource::collection($subscriptions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(SubscriptionRequest $request)
    {
        $data = $request->only('name', 'title', 'price', 'description', 'is_premium', 'is_active');
        $user = Subscription::create($data);
        $user->save();
        return new SubscriptionResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscription $subscription)
    {
        return new SubscriptionResource($subscription);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubscriptionRequest $request, Subscription $subscription)
    {
        $subscription->update($request->only('name', 'title', 'price', 'description', 'is_premium', 'is_active'));
        return new SubscriptionResource($subscription);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscription $subscription)
    {
        $subscription->delete();
        return response()->json(null, 200);
    }
}
