<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('users')->insert([
            'name' => 'Tak Hash',
            'email' => 'test@example.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$JW5tNuPTip.8uh8psNFA1u0CugjM/1en.mDKDgI3LXxhpqWmJ8jS.', // testpass
            'remember_token' => \Str::random(10),
        ]);
    }
}
