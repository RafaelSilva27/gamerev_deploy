<?php

namespace Tests\Feature;

use App\Models\Videojuego;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Genero;

class VideojuegoTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_get_videojuego()
    {
        $response = $this->get("/api/videojuegos");

        $response->assertStatus(200);
    }

    public function test_post_videojuego()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);
    
        $this->actingAs($user);
    
        $generoId = Genero::create([
            'nombre' => 'RPG',
        ])->id;
    
        $datosVideojuego = [
            'nombre' => 'Baldur gate 3',
            'precio' => 60,
            'genero' => $generoId,
        ];
    
        $response = $this->post('/api/videojuegos', $datosVideojuego);
    
        $this->assertDatabaseHas('videojuegos', [
            'nombre' => 'Baldur gate 3',
            'precio' => 60,
        ]);
    
        $response->assertStatus(201);
    }

    public function test_get_id_videojuego()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);
        
        $videojuego = Videojuego::create([
            'nombre' => 'Baldur gate 3',
            'precio' => 60,
        ]);
    
        $response = $this->actingAs($user)->get('/api/videojuegos/' . $videojuego->id);
    
        $response->assertStatus(200);
    
        $response->assertJsonFragment([
            'id' => $videojuego->id,
            'nombre' => $videojuego->nombre, 
            'precio' => $videojuego->precio, 

        ]);
    }

    public function test_put_videojuego()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);
    
        $genero = Genero::create(['nombre' => 'RPG']);
    
        $videojuego = Videojuego::create([
            'nombre' => 'Baldur gate 2',
            'precio' => 55,
        ]);
    
        $datosActualizados = [
            'nombre' => 'Baldur gate 3',
            'precio' => 60,
            'genero' => $genero->id, 
        ];
    
        $response = $this->actingAs($user)->put('/api/videojuegos/' . $videojuego->id, $datosActualizados);
    
        $response->assertStatus(200);
    
        $this->assertDatabaseHas('videojuegos', [
            'id' => $videojuego->id,
            'nombre' => 'Baldur gate 3',
            'precio' => 60,
        ]);
    }

    public function test_delete_videojuego()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $videojuego = Videojuego::create([
            'nombre' => 'Baldur gate 3',
            'precio' => 60,
        ]);

        $response = $this->actingAs($user)->delete('/api/videojuegos/' . $videojuego->id);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('videojuegos', [
            'id' => $videojuego->id,
        ]);
    }
}
