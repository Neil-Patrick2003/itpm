<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index(Request $request){

        $announcements = Announcement::with('user')
            ->when($request->search, function ($q) use ($request) {
                return $q->where('title', 'like', '%' . $request->search . '%');
            })
            ->latest()
            ->paginate(20, ['*'], 'page', $request->input('page', 1));




        return Inertia::render('Admin/Announcement/Announcements', [
            'announcements' => $announcements,
        ]);
    }

    public function  store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|max:65535',
        ]);

        Announcement::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->back()->with('message', 'Announcement created successfully!');
    }
}
