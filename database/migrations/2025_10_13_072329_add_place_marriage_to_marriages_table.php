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
        Schema::table('marriages', function (Blueprint $table) {
            DB::statement("ALTER TABLE marriages ADD COLUMN place_marriage ENUM(
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
            ) NULL AFTER wife_lastname");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('marriages', function (Blueprint $table) {
            $table->dropColumn('place_marriage');
        });
    }
};
