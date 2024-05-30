<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Videojuego extends Model
{
    use HasFactory;

    protected $fillable = ["nombre", "precio"];

    protected $hidden = ['created_at', 'updated_at'];

    public function genero(): BelongsToMany {
        return $this->belongsToMany(Genero::class, 'videojuego_genero', 'videojuego_id', 'genero_id');
    }
}
