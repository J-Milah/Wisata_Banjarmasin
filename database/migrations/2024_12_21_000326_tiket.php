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
        Schema::create('tikets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('wisata_id');
            $table->string('total_tiket');
            $table->bigInteger('total_harga');
            $table->enum('status', ["selesai", "pending", "batal"])->default("pending");
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('wisata_id')->references('id')->on('wisatas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
