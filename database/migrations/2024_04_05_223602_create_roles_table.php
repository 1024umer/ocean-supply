<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->timestamps();
        });
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->timestamps();
        });
        Schema::create('roles_permissions', function (Blueprint $table) {
            $table->id();
            $table->integer('role_id')->index();
            $table->integer('permission_id')->index();
            $table->timestamps();
        });
        DB::insert('insert into roles (name, title) values (?, ?)', ['admin', 'Admin']);
        DB::insert('insert into roles (name, title) values (?, ?)', ['user', 'User']);
        // DB::insert('insert into roles (name, title) values (?, ?)', ['sales-agent', 'Sales Agent']);
        // DB::insert('insert into roles (name, title) values (?, ?)', ['collection-agent', 'Collection Agent']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles_permissions');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
    }
};
