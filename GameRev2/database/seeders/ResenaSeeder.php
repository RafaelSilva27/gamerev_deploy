<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ResenaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userId = DB::table('users')->where('email', 'rafa@gmail.com')->value('id');

        $videojuegoId = DB::table('videojuegos')->where('nombre', 'NBA 2k24')->value('id');

        DB::table('resenas')->insert([
            'titulo' => 'Primer comentario',
            'comentario' => 'Comentarios prueba',
            'videojuego_id' => $videojuegoId,
            'user_id' => $userId,
        ]);
    }
}
