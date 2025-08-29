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
        Schema::create('family_register_members', function (Blueprint $table) {
            $table->id();
            $table->string('register_number', 100)->nullable();
            $table->unsignedBigInteger('family_member_id');
            $table->unsignedBigInteger('family_head_id');
            $table->date('date_of_registration')->nullable();
            $table->foreign('family_member_id')->references('id')->on('family_members')->onDelete('cascade');
            $table->foreign('family_head_id')->references('id')->on('family_heads')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_register_members');
    }
};
