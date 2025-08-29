<?php

namespace Database\Seeders;

use App\Models\FamilyHead;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FamilyHeadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FamilyHead::factory()->count(50)->create();
    }
}
