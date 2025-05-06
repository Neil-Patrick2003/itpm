<?php

namespace App\Http\Controllers\HealthWorker;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function store(Request $request, $id)
    {


        $request->validate([
            'body' => 'required',
        ]);

        Post::create([
            'body' => $request->body,
            'user_id' => auth()->id(),
            'topic_id' => $id
        ]);

        return redirect()->back()->with('message', 'Post saved successfully!');
    }
}
