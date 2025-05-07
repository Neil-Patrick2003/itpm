<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Children;
use Inertia\Inertia;

class ChildrenController extends Controller
{
    public function index()
    {
        $children = Children::with(['latestRecord', 'enrolledPrograms'])->where('parent_id', auth()->id())
            ->get();

        return Inertia::render('Parent/Children', [
            'children' => $children
        ]);
    }
}
