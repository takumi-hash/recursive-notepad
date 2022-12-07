<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('notes')->insert([
            'title' => '風の歌を聴け',
            'body' => 'これはノート1です。%%2%% %%3%%',
            'user_id' => 1,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('notes')->insert([
            'title' => '羊をめぐる冒険',
            'body' => 'これはノート2です。%%3%%',
            'user_id' => 1,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('notes')->insert([
            'title' => '海辺のカフカ',
            'body' => 'これはノート3です。%%4%%',
            'user_id' => 1,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('notes')->insert([
            'title' => '羊をめぐらない冒険',
            'body' => 'これはノート4です。',
            'user_id' => 1,
            'created_at' => new \DateTime(),
        ]);

    }
}
