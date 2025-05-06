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
        Schema::create('children_records', function (Blueprint $table) {
            $table->id();
            $table->decimal('weight', 10, 0);
            $table->decimal('height', 10, 0);
            $table->decimal('bmi', 10, 0);
            $table->unsignedBigInteger('children_id');
            $table->timestamps();

            $table->foreign('children_id')
                ->references('id')
                ->on('childrens')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('children_records');
    }
};
