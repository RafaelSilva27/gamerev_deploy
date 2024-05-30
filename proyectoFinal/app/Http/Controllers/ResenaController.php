<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResenaResource;
use App\Models\Resena;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResenaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request):JsonResource
    {
        $userId = $request->query('user_id'); // Obtener el user_id de la solicitud

        if ($userId) {
            $resenas = Resena::with('user', 'videojuego')->where('user_id', $userId)->get();
        } else {
            $resenas = Resena::with('user', 'videojuego')->get();
        }

        return ResenaResource::collection($resenas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request):JsonResource
    {
        $videojuegoId = $request->input('videojuego.id');
        $userId = $request->input('user.id');

        $resena = new Resena();
        $resena->titulo = $request->titulo;
        $resena->comentario = $request->comentario;
        $resena->videojuego_id = $videojuegoId;
        $resena->user_id = $userId;
        $resena->save();

        return new ResenaResource($resena);
    }

    /**
     * Display the specified resource.
     */
    public function show($id):JsonResource
    {
        $resena = Resena::find($id);
        return new ResenaResource($resena);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resena $resena)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResource
{
    $resena = Resena::find($id);

    if (!$resena) {
        return response()->json(['error' => 'La reseña no existe'], 404);
    }

    $resena->titulo = $request->input('titulo', $resena->titulo);
    $resena->comentario = $request->input('comentario', $resena->comentario);

    // Verificar si se envió el campo videojuego.id en la solicitud
    if ($request->has('videojuego.id')) {
        $videojuegoId = $request->input('videojuego.id');
        $resena->videojuego_id = $videojuegoId;
    }

    // Verificar si se envió el campo user.id en la solicitud
    if ($request->has('user.id')) {
        $userId = $request->input('user.id');
        $resena->user_id = $userId;
    }

    $resena->save();

    return new ResenaResource($resena);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $resena = Resena::find($id);
        $resena->delete();
        return response()->json(["success" => true], 200);
    }
}
