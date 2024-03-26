<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->catchPhrase(),
            'slug' => fake()->slug(),
            'description' => fake()->sentence(),
            'steps' => json_encode([
                'Mix flour, sugar, baking powder, and salt in a bowl.',
                'Whisk egg, milk, and butter in another bowl.',
                'Stir milk mixture into dry ingredients until just combined.',
                'Heat a lightly oiled griddle over medium-high heat.',
                'Pour 1/4 cup batter onto the griddle.',
                'Cook until bubbles form on the surface.',
                'Flip and cook until browned on the other side.',
                'Repeat with remaining batter.',
            ]),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'user_id' => fake()->numberBetween(1, 20),
        ];
    }
}
