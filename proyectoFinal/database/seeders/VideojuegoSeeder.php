<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class VideojuegoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('videojuegos')->insert([
            'nombre' => 'Ciberpunk 2077',
            'precio' => 50,
        ]);

        DB::table('videojuegos')->insert([
            'nombre' => 'NBA 2K24',
            'precio' => 55,
        ]);
    }
}
