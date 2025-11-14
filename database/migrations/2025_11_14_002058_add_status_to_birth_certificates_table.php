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
        Schema::table('birth_certificates', function (Blueprint $table) {
            $table->enum('status', ['Legitimate', 'Illegitimate'])
                ->default('Legitimate')
                ->after('place_birth'); // or any column you want
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('birth_certificates', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
