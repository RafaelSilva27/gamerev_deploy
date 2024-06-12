<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([

            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => Hash::make('pass1234'),
            'rol' => 1, 
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('users')->insert([

            'name' => 'Rafa',
            'email' => 'rafa@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('pass1234'),
            'rol' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
