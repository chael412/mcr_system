<?php

namespace Database\Seeders;

use App\Models\FamilyRegisterMember;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FamilyRegisterMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            FamilyRegisterMember::create([
                'register_number' => 'REG-' . Str::upper(Str::random(6)),
                'family_member_id' => rand(1, 10),
                'family_head_id' => rand(1, 5),
                'date_of_registration' => Carbon::now()->subDays(rand(1, 365)),
            ]);
        }
    }
}
