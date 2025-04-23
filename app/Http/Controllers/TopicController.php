<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{

    public function index()
    {
        return Inertia::render('Worker/Forum/ForumIndex');
    }
}
