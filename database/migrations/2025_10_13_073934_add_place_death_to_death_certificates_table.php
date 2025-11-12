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
        Schema::table('death_certificates', function (Blueprint $table) {
            DB::statement("ALTER TABLE death_certificates ADD COLUMN place_death ENUM(
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
            ) NULL AFTER lastname");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('death_certificates', function (Blueprint $table) {
            $table->dropColumn('place_death');
        });
    }
};
