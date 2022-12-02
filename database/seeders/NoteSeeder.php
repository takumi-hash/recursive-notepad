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
            'title' => 'タイトルが入ります。1',
            'body' => 'うまくいけばずっと先に、何年か何十年か先に、救済された自分を発見することができるかもしれない、と。そしてその時、象は平原に帰り僕はより美しい言葉で世界を語り始めるだろう。',
            'user_id' => 1,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('notes')->insert([
            'title' => 'タイトルが入ります。2',
            'body' => '彼女は遠い部屋のドアを開け、そこの壁に、二つの美しい和音がとかげのようなかっこうで眠っているのを目にした。',
            'user_id' => 1,
            'created_at' => new \DateTime(),
        ]);
    }
}
