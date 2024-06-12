<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Genero;



class GeneroTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_get_genero()
    {
        $response = $this->get("/api/generos");

        $response->assertStatus(200);
    }

    public function test_post_genero()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);
        
        $this->actingAs($user);

        $datosGenero = [
            'nombre' => 'RPG'
        ];

        $response = $this->post('/api/generos', $datosGenero);

        $this->assertDatabaseHas('generos', [
            'nombre' => 'RPG',
        ]);

        $response->assertStatus(201);

    }

    public function test_get_id_genero()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $genero = Genero::create([
            'nombre' => 'RPG',
        ]);

        $response = $this->actingAs($user)->get('/api/generos/' . $genero->id);

        $response->assertStatus(200);

        $response->assertJsonFragment([
            'id' => $genero->id,
            'nombre' => $genero->nombre,
        ]);
    }

    public function test_put_genero()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $genero = Genero::create([
            'nombre' => 'RPD',
        ]);

        $datosActualizados = [
            'nombre' => 'RPG',
        ];

        $response = $this->actingAs($user)->put('/api/generos/' . $genero->id, $datosActualizados);

        $response->assertStatus(200);

        $genero->refresh();

        $this->assertEquals('RPG', $genero->nombre);
    }

    public function test_delete_genero()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $genero = Genero::create([
            'nombre' => 'RPG',
        ]);

        $response = $this->actingAs($user)->delete('/api/generos/' . $genero->id);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('generos', [
            'id' => $genero->id,
        ]);
    }
        
}
