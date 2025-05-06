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
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->string('children_name');
            $table->date('birth_date');
            $table->string('parent_name');
            $table->string('address');
            $table->string('phone_number');
            $table->string('email');
            $table->decimal('weight', 10, 2);
            $table->decimal('height', 10, 2);
            $table->string('gender');
            $table->unsignedBigInteger('recorded_by');
            $table->timestamps();

            $table->foreign('recorded_by')
                ->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
