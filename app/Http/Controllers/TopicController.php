<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{

    public function index(Request $request)
    {
        $topics = Topic::with('user', 'posts')
            ->withCount('posts') // adds 'posts_count' attribute
            ->when($request->search, function ($q) use ($request) {
                return $q->where('title', 'like', '%' . $request->search . '%');
            })
            ->latest()
            ->paginate(20, ['*'], 'page', $request->input('page', 1));






        return Inertia::render('Worker/Forum/ForumIndex', [
            'topics' => $topics,
        ]);


    }

    public function store(Request $request){

        $validated = $request->validate([
            'title' => 'required|max:255',
        ]);

        Topic::create([
            'title' => $request->title,
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->back()->with('message', 'Topic created successfully!');
    }

    public function show($id){

        $topic = Topic::with('user', 'posts')
            ->findOrFail($id);


        return Inertia::render('Worker/Forum/ShowTopic', [
            'topic' => $topic,
        ]);
    }
}
