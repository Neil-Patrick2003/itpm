<?php

namespace App\Http\Controllers\API\Parent;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __invoke(Request $request, $id)
    {
        $request->validate([
            'body' => 'required'
        ]);

        $post = Post::create(['topic_id' => $id, 'body' => $request->body, 'user_id' => auth()->id()]);

        return $post;
    }
}
