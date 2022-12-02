@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            @foreach($user->notes as $note)
            <div class="card my-5">
                <div class="card-header">
                    {{ $note->title }}
                </div>
                <div class="card-body">
                    {{ $note->body }}
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>
@endsection
