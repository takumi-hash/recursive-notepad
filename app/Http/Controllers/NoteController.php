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

        $parsedBody = Auth::user()->notes()->find($id)->body;
        $i = 0;
        $looplimit = 100;
        while( $i<$looplimit && preg_match('/%%[\d]+?%%/', $parsedBody, $res)> 0) {
            preg_match_all('/%%[\d]+%%/', $parsedBody, $noteIdArr, PREG_PATTERN_ORDER);
            $dict = array();
            foreach($noteIdArr[0] as $noteIdStr){
                $noteId = str_replace('%%', '', $noteIdStr);
                $body = Auth::user()->notes()->find($noteId)->body;
                $dict = $dict + array($noteId=>$body);
            }

            foreach($dict as $key => $item){
                $pattern = '%%'.$key.'%%';
                $replacement = '[引用ここから]'.$dict[$key].'[引用ここまで]';
                $parsedBody = str_replace($pattern, $replacement, $parsedBody);            
            }
            ++$i;
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
