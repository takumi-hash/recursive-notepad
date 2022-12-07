<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ParentChildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('parent_child')->insert([
            'parent_id' => 1,
            'child_id' => 2,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('parent_child')->insert([
            'parent_id' => 1,
            'child_id' => 3,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('parent_child')->insert([
            'parent_id' => 2,
            'child_id' => 3,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('parent_child')->insert([
            'parent_id' => 3,
            'child_id' => 4,
            'created_at' => new \DateTime(),
        ]);
    }
}
