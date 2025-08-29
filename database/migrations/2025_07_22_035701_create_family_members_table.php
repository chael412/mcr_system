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
        Schema::create('family_members', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('middlename')->nullable();
            $table->string('lastname');
            $table->enum('sex', ['M', 'F']);
            $table->date('date_birth');
            $table->unsignedTinyInteger('order_birth');
            $table->string('place_birth')->nullable();
            $table->string('father_name');
            $table->string('mother_name');
            $table->string('date_place_marriage');
            $table->string('relationship_to_familyhead', 100);
            $table->string('remarks', 100)->nullable();
            $table->string('birth_certificate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_members');
    }
};
