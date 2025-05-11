<?php

namespace App\Http\Controllers\API\Parent;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Topic;
use Illuminate\Http\Request;


class ForumController extends Controller
{
    public function index(Request $request)
    {
        $topics = Topic::with('user', 'posts')
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
}
