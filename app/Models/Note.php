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
    public function children()
    {
        return $this->belongsToMany(Note::class, 'parent_child', 'parent_id', 'child_id');
    }

    // This is method where we implement recursive relationship
    public function recursiveChildren()
    {
        // return $this->hasMany(Note::class, 'note_id')->with('children');
        return $this->belongsToMany(Note::class, 'parent_child', 'parent_id', 'child_id')->with('children');
    }

}
