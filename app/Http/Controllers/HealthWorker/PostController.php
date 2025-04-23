<?php

namespace App\Http\Controllers\HealthWorker;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PostController extends Controller
{
    public function create()
    {
        return Inertia::render('Worker/Forum/CreatePost');
    }
}
