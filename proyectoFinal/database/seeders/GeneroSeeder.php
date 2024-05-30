<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class GeneroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('generos')->insert([
            'nombre' => 'Accion'
        ]);

        DB::table('generos')->insert([
            'nombre' => 'Deportes'
        ]);
    }
}
