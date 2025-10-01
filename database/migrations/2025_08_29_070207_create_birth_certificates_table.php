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
        Schema::create('birth_certificates', function (Blueprint $table) {
            $table->id();
            $table->string('register_number', 100)->nullable();
            $table->date('date_of_registration')->nullable();
            $table->string('firstname');
            $table->string('middlename')->nullable();
            $table->string('lastname');
            $table->enum('sex', ['M', 'F']);
            $table->date('date_birth')->nullable();
            $table->enum('place_birth', [
                'Bicobian',
                'Dibulos',
                'Dicambangan',
                'Dicaruyan',
                'Dicatian',
                'Dilakit',
                'Dimapnat',
                'Dimapula',
                'Dimasalansan',
                'Dipudo',
                'Ditarum',
                'Sapinit',
            ])->nullable();
            $table->string('file')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('birth_certificates');
    }
};
