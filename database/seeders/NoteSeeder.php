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
            'body' => 'うまくいけばずっと先に、何年か何十年か先に、救済された自分を発見することができるかもしれない、と。そしてその時、象は平原に帰り僕はより美しい言葉で世界を語り始めるだろう。',
            'user_id' => 1,
            'note_id' => NULL,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('notes')->insert([
            'title' => '羊をめぐる冒険',
            'body' => 'この小説はストラクチャーについてはレイモンド・チャンドラーの小説の影響を色濃く受けています。（中略） 僕はこの小説の中で、その小説的構図を使ってみようと思ったのです。まず第一に主人公が孤独な都市生活者であること。それから、彼が何かを捜そうとしていること。そしてその何かを捜しているうちに、様々な複雑な状況に巻き込まれていくこと。そして彼がその何かをついに見つけたときには、その何かは既に損なわれ、失われてしまっていることです。これは明らかにチャンドラーの用いていた手法です。僕はそのような構図を使用して、この『羊をめぐる冒険』という小説を書きました。',
            'user_id' => 1,
            'note_id' => 1,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('notes')->insert([
            'title' => '海辺のカフカ',
            'body' => '彼女は遠い部屋のドアを開け、そこの壁に、二つの美しい和音がとかげのようなかっこうで眠っているのを目にした。',
            'user_id' => 1,
            'note_id' => 2,
            'created_at' => new \DateTime(),
        ]);
        \DB::table('notes')->insert([
            'title' => '羊をめぐらない冒険',
            'body' => 'これは羊をめぐらない冒険です。',
            'user_id' => 1,
            'note_id' => 1,
            'created_at' => new \DateTime(),
        ]);

    }
}
