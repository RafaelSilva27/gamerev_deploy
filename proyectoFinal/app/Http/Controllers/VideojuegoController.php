<?php

namespace App\Http\Controllers;

use App\Http\Resources\VideojuegoResource;
use App\Models\Videojuego;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideojuegoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResource
    {
        $videojuegos = Videojuego::all();
        return VideojuegoResource::collection($videojuegos);
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
        $videojuego = new Videojuego();
        $videojuego->nombre = $request->nombre;
        $videojuego->precio = $request->precio;
        $videojuego->save();

        if ($request->has('genero')) {
            $videojuego->genero()->attach($request->genero);
        }

        return new VideojuegoResource($videojuego);
    }

    /**
     * Display the specified resource.
     */
    public function show($id):JsonResource
    {
        $videojuego = Videojuego::find($id);
        return new VideojuegoResource($videojuego);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Videojuego $videojuego)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id):JsonResource
    {
        $videojuego = Videojuego::find($id);
        $videojuego->nombre = $request->nombre;
        $videojuego->precio = $request->precio;
        $videojuego->genero()->detach();
        $videojuego->genero()->attach($request->genero);
        $videojuego->save();

        return new VideojuegoResource($videojuego);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $videojuego = Videojuego::find($id);
        $videojuego->delete();
        return response()->json(["success"=> true], 200);
    }
}
