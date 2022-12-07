<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }
    
    public function hasSelfReference($text, $id){
        if(preg_match('/%%'.$id.'%%/', $text, $res)> 0){
            return true;
        } else {
            return false;
        }
    }

    public function countRecursiveChildren($note_id)
    {
        $recursiveChildren = Auth::user()->notes()->find($note_id)->withCount('recursiveChildren');
        $count = $recursiveChildren->sum();
        return $count;
    }

    public function index(Request $request){
        return Auth::user()->notes()->orderBy('updated_at', 'desc')->get();
    }

    public function show($id){
        return Auth::user()->notes()->find($id);
    }

    public function getChildren($id){
        return Auth::user()->notes()->find($id)->children()->get();
    }

    public function getParsedBody($id){

        $parentNote = Auth::user()->notes()->find($id);
        $parsedBody = $parentNote->body;
        $dictionary = $parentNote->getRecursiveChildrenDictionary();

        foreach($dictionary as $key => $item){
                $pattern = '%%'.$key.'%%';
                $replacement = '[引用ここから]'.$dictionary[$key].'[引用ここまで]';
                $parsedBody = str_replace($pattern, $replacement, $parsedBody);            
        }
        return $parsedBody;
    }
    
    public function create(Request $request){
        // TODO: add filtering onley existing id.
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
        if($this->hasSelfReference($request->body,$id)){
            return response()->json([
                'message' => 'Self reference is forbidden.',
            ], 500);
        }
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
