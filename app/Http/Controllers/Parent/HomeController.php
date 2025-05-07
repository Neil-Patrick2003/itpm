<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $announcements = Announcement::get();

        return Inertia::render('Parent/Home', [
            'announcements' => $announcements
        ]);
    }
}
