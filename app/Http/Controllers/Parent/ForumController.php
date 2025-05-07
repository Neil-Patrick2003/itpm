<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index(Request $request)
    {
        $topics = Topic::with('user')
            ->withCount('posts') // adds 'posts_count' attribute
            ->when($request->search, function ($q) use ($request) {
                return $q->where('title', 'like', '%' . $request->search . '%');
            })
            ->latest()
            ->get();

        return Inertia::render('Parent/Forum', [
            'topics' => $topics
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required'
        ]);

        Topic::create([ 'title' => $request->title, 'user_id' => auth()->id()]);

        return redirect()->back();
    }

    public function show(Request $request, Topic $topic)
    {
        $topic->load(['user']);

        $posts = Post::with('user')
            ->where('topic_id', $topic->id)
            ->latest()
            ->get();


        return Inertia::render('Parent/Topic', [
            'topic' => $topic,
            'posts' => $posts
        ]);
    }
}
