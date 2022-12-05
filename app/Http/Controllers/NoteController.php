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
        return Auth::user()->notes()->orderBy('updated_at', 'desc')->get();
    }

    public function show($id){
        return Auth::user()->notes()->find($id);
    }

    public function getChildren($id){
        return Auth::user()->notes()->find($id)->allLevelsChildren()->get();
    }

    public function getParsedBody($id){
        $flattened = \Arr::dot(Auth::user()->notes()->find($id)->allLevelsChildren()->get()->toArray());
        $newArray = array_filter(
            $flattened,
            function ($key) {
                return preg_match('/.*\.body$/', $key); //regular expression to match key name
            },
            ARRAY_FILTER_USE_KEY
        );
        return $newArray;
    }
    
    public function create(Request $request){
        $new_note = Auth::user()->notes()->create([
            'title'=>$request->title,
            'body'=>$request->body,
        ]);

        $notes = Auth::user()->notes()->orderBy('updated_at', 'desc')->get();
        if ($notes) {
            return response()->json(
                $notes
            , 200);
        } else {
            return response()->json([
                'message' => 'Notes not found',
            ], 404);
        }
    }

    public function update(Request $request, $id){
        $note = Auth::user()->notes()->find($id);
        $note->title = $request->title;
        $note->body = $request->body;
        $note->save();

        $notes = Auth::user()->notes()->orderBy('updated_at', 'desc')->get();
        if ($notes) {
            return response()->json(
                $notes
            , 200);
        } else {
            return response()->json([
                'message' => 'Notes not found',
            ], 404);
        }
    }

    public function destroy($id){
        Auth::user()->notes()->find($id)->delete();
    }
}
