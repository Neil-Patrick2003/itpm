<?php

namespace App\Http\Controllers\API\Parent;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Children;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('users')
        ->latest()
        ->get();

         return [
            'data' => $blogs
        ];
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:1000',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $destination_path = 'images';
            $cover_photo = $request->file('image');
            $photo_name = $cover_photo->getClientOriginalName();
            $image_url = $request->file('image')->storeAs($destination_path, $photo_name, 'public');
        }

        Blog::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => auth()->id(),
            'image_url' => $image_url
        ]);

    }
}
