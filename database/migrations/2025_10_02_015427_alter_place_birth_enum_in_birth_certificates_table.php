<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('birth_certificates', function (Blueprint $table) {
            DB::statement("ALTER TABLE birth_certificates MODIFY place_birth ENUM(
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
            'N/A'
        ) NULL");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('birth_certificates', function (Blueprint $table) {
            DB::statement("ALTER TABLE birth_certificates MODIFY place_birth ENUM(
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
            'Sapinit'
        ) NULL");
        });
    }
};
