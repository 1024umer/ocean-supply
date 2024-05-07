<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key');
            $table->string('value');
            $table->timestamps();
        });
        $arr = [
            [
                'key' => 'number_of_orders',
                'value' => '5'
            ],
            [
                'key' => 'number_of_points',
                'value' => '1'
            ],
            [
                'key' => 'points_value',
                'value' => '10'
            ],
        ];
        foreach($arr as $ar){
            Setting::create($ar);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
