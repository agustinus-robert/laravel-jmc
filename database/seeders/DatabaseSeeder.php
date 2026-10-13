<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Modules\Master\Database\Seeders\ProvinceSeeder;
use Modules\Master\Database\Seeders\RegencySeeder;
use Modules\Master\Database\Seeders\CitySeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name'  => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            ProvinceSeeder::class,
            RegencySeeder::class,
            CitySeeder::class,
        ]);
    }
}
