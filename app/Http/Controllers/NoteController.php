<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request){
        return Auth::user()->notes()->get();
    }
    
    public function save(Request $request){
        Auth::user()->notes()->create([
            'title'=>$request->title,
            'body'=>$request->body,
        ]);
    }

    public function update(Request $request){
        Auth::user()->notes()->create([
            'title'=>$request->title,
            'body'=>$request->body,
        ]);
    }
}
