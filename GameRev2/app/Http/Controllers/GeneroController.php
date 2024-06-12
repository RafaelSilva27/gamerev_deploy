<?php

namespace App\Http\Controllers;

use App\Http\Resources\GeneroResource;
use App\Models\Genero;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GeneroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResource
    {
        $genero = Genero::all();
        return JsonResource::collection($genero);
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
        $genero = new Genero();
        $genero->nombre = $request->nombre;
        $genero->save();

        return new GeneroResource($genero);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $genero = Genero::find($id);
        return new GeneroResource($genero);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Genero $genero)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id):JsonResource
    {
        $genero = Genero::find($id);
        $genero->nombre = $request->nombre;
        $genero->save();

        return new GeneroResource($genero);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $genero = Genero::find($id);
        $genero->delete();
        return response()->json(["success"=> true], 200);
    }
}
