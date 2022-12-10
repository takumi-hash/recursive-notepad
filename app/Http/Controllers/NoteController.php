<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Note;

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

    public function hasNonExistingReference($text, $id){
        preg_match_all("/%%[\d]+%%/",$text,$out, PREG_PATTERN_ORDER);
        foreach($out as $item){
            $child_id = str_replace("%%", "", $item);
            $check = Note::find($id)->children()->where('parent_id', $id)->where('child_id', $child_id)->exists();
            if ($check){
                return true;
            }
        }
        return false;
    }

    public function hasOnlySafeReference($text, $id){
        if($this->hasSelfReference($text, $id)==false && $this->hasNonExistingReference($text, $id)==false){
            return true;
        } else {
            return false;
        }
    }

    public function index(Request $request){
        return Auth::user()->notes()->orderBy('updated_at', 'desc')->get();
    }

    public function show($id){
        return Auth::user()->notes()->find($id);
    }

    public function getChildren($id){
        return Auth::user()->notes()->find($id)->recursiveChildren()->get();
    }

    public function getParsedBody($id){

        $parentNote = Auth::user()->notes()->find($id);
        $parsedBody = $parentNote->body;
        $dictionary = $parentNote->recursiveChildrenDictionary();

        foreach($dictionary as $key => $item){
                $pattern = '%%'.$key.'%%';
                $replacement = '<mark>'.$dictionary[$key].'</mark>';
                $parsedBody = str_replace($pattern, $replacement, $parsedBody);            
        }
        return $parsedBody;
    }
    
    public function create(Request $request){
        if($this->hasOnlySafeReference($request->body, $id)==false){
            return response()->json([
                'message' => 'Reference is invalid.',
            ], 500);
        }
        $new_note = Auth::user()->notes()->create([
            'title'=>$request->title,
            'body'=>$request->body,
        ]);

        // make child relation
        preg_match_all("/%%[\d]+%%/",$request->body,$out, PREG_PATTERN_ORDER);
        foreach($out as $item){
            $child_id = str_replace("%%", "", $item);     
            $new_note->children()->syncWithoutDetaching($child_id);
        }

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
        if($this->hasOnlySafeReference($request->body, $id)==false){
            return response()->json([
                'message' => 'Reference is invalid.',
            ], 500);
        }

        $note = Auth::user()->notes()->find($id);
        $note->title = $request->title;
        $note->body = $request->body;
        $note->save();

        // make child relation
        preg_match_all("/%%[\d]+%%/",$request->body,$out, PREG_PATTERN_ORDER);
        foreach($out as $item){
            $child_id = str_replace("%%", "", $item);     
            $note->children()->syncWithoutDetaching($child_id);
        }

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
