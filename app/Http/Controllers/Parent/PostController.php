<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function store(Request $request, Topic $topic)
    {
        $request->validate([
            'body' => 'required'
        ]);

        Post::create(['topic_id' => $topic->id, 'body' => $request->body, 'user_id' => auth()->id()]);

        return redirect()->back();
    }
}
