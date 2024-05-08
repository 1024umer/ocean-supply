<?php

namespace App\Http\Controllers;

use App\Http\Resources\InventoryResource;
use App\Services\Clover\GetInventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index(GetInventory $getInventory){
        $inventories = $getInventory->getInventory();
        $data = json_decode($inventories->getContent(), true);
        return response($data);
    }
    public function show(GetInventory $getInventory, $id){
        $inventories = $getInventory->getSingleInventory($id);
        return response($inventories);
    }

}
