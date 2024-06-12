<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resena extends Model
{
    use HasFactory;

    protected $fillable = ["titulo", "comentario", "videojuego_id", "user_id"];

    protected $hidden = ['created_at', 'updated_at'];

    public function videojuego() {
        return $this->belongsTo(Videojuego::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
