<?php

use App\Http\Controllers\GeneroController;
use App\Http\Controllers\ResenaController;
use App\Http\Controllers\VideojuegoController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Rutas para videojuegos
Route::get('/videojuegos', [VideojuegoController::class, 'index']);
Route::get('/videojuegos/{videojuego}', [VideojuegoController::class, 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/videojuegos', [VideojuegoController::class, 'store']);
    Route::put('/videojuegos/{videojuego}', [VideojuegoController::class, 'update']);
    Route::delete('/videojuegos/{videojuego}', [VideojuegoController::class, 'destroy']);
});

// Rutas para géneros
Route::get('/generos', [GeneroController::class, 'index']);
Route::get('/generos/{genero}', [GeneroController::class, 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/generos', [GeneroController::class, 'store']);
    Route::put('/generos/{genero}', [GeneroController::class, 'update']);
    Route::delete('/generos/{genero}', [GeneroController::class, 'destroy']);
});

// Rutas para reseñas
Route::get('/resenas', [ResenaController::class, 'index']);
Route::get('/resenas/{resena}', [ResenaController::class, 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/resenas', [ResenaController::class, 'store']);
    Route::put('/resenas/{resena}', [ResenaController::class, 'update']);
    Route::delete('/resenas/{resena}', [ResenaController::class, 'destroy']);
});

