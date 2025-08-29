<?php

namespace Database\Seeders;

use App\Models\Barangay;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $barangays = [
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
        ];

        foreach ($barangays as $name) {
            Barangay::create(['barangay_name' => $name]);
        }
    }
}
