<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ensure the admin role exists
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        // Admin accounts to create
        $admins = [
            // [
            //     'name' => 'Admin',
            //     'email' => 'admin@gmail.com',
            // ],
            [
                'name' => 'Admin Two',
                'email' => 'admin2@gmail.com',
            ],
            [
                'name' => 'Admin Three',
                'email' => 'admin3@gmail.com',
            ],
            [
                'name' => 'Admin Four',
                'email' => 'admin4@gmail.com',
            ],
            [
                'name' => 'Admin Five',
                'email' => 'admin5@gmail.com',
            ],
            [
                'name' => 'Admin Six',
                'email' => 'admin6@gmail.com',
            ],
        ];

        foreach ($admins as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make('123123123'),
                    'email_verified_at' => Carbon::now(),
                ]
            );

            $user->assignRole($adminRole);
        }

        $this->command->info("✅ Admin users seeded successfully!");
    }
}
