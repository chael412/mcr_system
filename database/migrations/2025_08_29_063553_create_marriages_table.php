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
        Schema::create('marriages', function (Blueprint $table) {
            $table->id();
            $table->string('register_number', 100)->nullable();
            $table->date('date_of_registration')->nullable();
            $table->string('husband_firstname');
            $table->string('husband_middlename')->nullable();
            $table->string('husband_lastname');
            $table->string('wife_firstname');
            $table->string('wife_middlename')->nullable();
            $table->string('wife_lastname');
            $table->string('file')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marriages');
    }
};
