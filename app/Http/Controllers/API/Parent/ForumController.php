<?php

namespace App\Http\Controllers\API\Parent;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Topic;
use Illuminate\Http\Request;
use function PHPUnit\Framework\returnArgument;


class ForumController extends Controller
{
    public function index(Request $request)
    {
        $topics = Topic::with(['user', 'posts.user'] )
            ->withCount( 'posts') // adds 'posts_count' attribute
            ->when($request->input('search'), function ($q) use ($request) {
                return $q->where('title', 'like', '%' . $request->input('search') . '%');
            })
            ->latest()
            ->get();

        return [
            'data' => $topics
        ];
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required'
        ]);

        $topic = Topic::create([ 'title' => $request->title, 'user_id' => auth()->id()]);

        return $topic;
    }
}

