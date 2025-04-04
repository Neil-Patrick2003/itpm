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
        Schema::create('program_sponsors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('program_id');
            $table->unsignedBigInteger('sponsor_id');
            $table->timestamps();
            $table->foreign('program_id')
                ->references('id')
                ->on('programs')
                ->cascadeOnDelete();
            $table->foreign('sponsor_id')
                ->references('id')
                ->on('sponsors')   
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_sponsors');
    }
};
