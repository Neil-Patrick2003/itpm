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
        Schema::create('donation__items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('description');
            $table->integer('qty');
            $table->unsignedBigInteger('donation_id');
            $table->foreign('donation_id')
                ->references('id')
                ->on('donations')
                ->cascadeOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donation__items');
    }
};
