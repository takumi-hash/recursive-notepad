<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

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
