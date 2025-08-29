<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FamilyMember>
 */
class FamilyMemberFactory extends Factory
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
            'sex' => $this->faker->randomElement(['M', 'F']),
            'date_birth' => $this->faker->date('Y-m-d'),
            'order_birth' => $this->faker->numberBetween(1, 10),
            'place_birth' => $this->faker->optional()->city,
            'father_name' => $this->faker->name('male'),
            'mother_name' => $this->faker->name('female'),
            'date_place_marriage' => $this->faker->date('Y-m-d') . ' at ' . $this->faker->city,
            'relationship_to_familyhead' => $this->faker->randomElement([
                'Son',
                'Daughter',
                'Father',
                'Mother',
                'Brother',
                'Sister',
                'Cousin',
                'Uncle',
                'Aunt'
            ]),
            'remarks' => '',
            'birth_certificate' => '',
        ];
    }
}
