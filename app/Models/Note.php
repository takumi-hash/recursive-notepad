<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'body',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    // this relationship will only return one level of child items
    public function oneLevelChildren()
    {
        return $this->hasMany(Note::class, 'note_id');
    }

    // This is method where we implement recursive relationship
    public function allLevelsChildren()
    {
        return $this->hasMany(Note::class, 'note_id')->with('oneLevelChildren');
    }

}
