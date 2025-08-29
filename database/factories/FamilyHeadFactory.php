<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FamilyHead>
 */
class FamilyHeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'firstname' => $this->faker->firstName,
            'middlename' => $this->faker->optional()->firstName,
            'lastname' => $this->faker->lastName,
            'barangay_id' => $this->faker->numberBetween(1, 12), // Adjust range based on your actual barangays
            'municipality' => 'DIVILACAN',
            'province' => 'ISABELA',
        ];
    }
}
