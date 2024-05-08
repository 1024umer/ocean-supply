<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_points', function (Blueprint $table) {
            $table->unsignedBigInteger('last_bigCommerce_order_id')->nullable()->after('remaining_points');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_points', function (Blueprint $table) {
            $table->dropColumn('last_bigCommerce_order_id');
        });
    }
};
