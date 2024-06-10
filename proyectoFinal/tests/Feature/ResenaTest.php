<?php

namespace Tests\Feature;

use App\Models\Resena;
use App\Models\User;
use App\Models\Videojuego;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ResenaTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_get_resenas()
    {
        $response = $this->get("/api/resenas");

        $response->assertStatus(200);
    }

    public function test_post_resena()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $videojuego = Videojuego::create([
            'nombre' => 'Baldur gate 3',
            'precio' => 60
        ]);

        $this->actingAs($user);

        $datosResena = [
            'titulo' => 'Reseña de Baldur gate 3',
            'comentario' => 'Buen juego, lo recomiendo',
            'videojuego' => ['id' => $videojuego->id],
            'user' => ['id' => $user->id],
        ];

        $response = $this->post('/api/resenas', $datosResena);

        $this->assertDatabaseHas('resenas', [
            'titulo' => 'Reseña de Baldur gate 3',
            'comentario' => 'Buen juego, lo recomiendo',
        ]);

        $response->assertStatus(201);
    }

    
    public function test_get_id_resena()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $resena = Resena::create([
            'titulo' => 'Reseña de Baldur gate 3',
            'comentario' => 'Buen juego, lo recomiendo',
            'user_id' => $user->id,
            'videojuego_id' => Videojuego::create([
                'nombre' => 'Baldur gate 3',
                'precio' => 60])->id,
        ]);

        $response = $this->actingAs($user)->get('/api/resenas/' . $resena->id);

        $response->assertStatus(200);

        $response->assertJsonFragment([
            'id' => $resena->id,
            'titulo' => $resena->titulo,
            'comentario' => $resena->comentario,
        ]);
    }

    public function test_put_resena()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $videojuego = Videojuego::create([
            'nombre' => 'Baldur gate 3',
            'precio' => 60]);

            $resena = Resena::create([
                'titulo' => 'Reseña de Baldur gate 3',
                'comentario' => 'Buen game, lo recomiendo',
                'user_id' => $user->id,
                'videojuego_id' => Videojuego::create([
                    'nombre' => 'Baldur gate 3',
                    'precio' => 60])->id,
            ]);

        $datosActualizados = [
            'titulo' => 'Reseña de Baldur gate 3',
            'comentario' => 'Buen juego, lo recomiendo',
            'videojuego' => ['id' => $videojuego->id],
            'user' => ['id' => $user->id],
        ];

        $response = $this->actingAs($user)->put('/api/resenas/' . $resena->id, $datosActualizados);

        $response->assertStatus(200);

        $this->assertDatabaseHas('resenas', [
            'id' => $resena->id,
            'titulo' => 'Reseña de Baldur gate 3',
            'comentario' => 'Buen juego, lo recomiendo',
        ]);
    }

    public function test_delete_resena()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $resena = Resena::create([
            'titulo' => 'Reseña de Baldur gate 3',
            'comentario' => 'Buen juego, lo recomiendo',
            'user_id' => $user->id,
            'videojuego_id' => Videojuego::create([
                'nombre' => 'Baldur gate 3',
                'precio' => 60])->id,
        ]);

        $response = $this->actingAs($user)->delete('/api/resenas/' . $resena->id);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('resenas', [
            'id' => $resena->id,
        ]);
    }
}

