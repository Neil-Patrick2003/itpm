<?php

namespace App\Http\Controllers\API\Parent;

use App\Http\Controllers\Controller;
use App\Models\Children;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChildrenController extends Controller
{
    public function __invoke()
    {
        $children = Children::with(['latestRecord', 'enrolledPrograms'])
            ->where('parent_id', auth()->id())
            ->get();

        return [
            'data' => $children
        ];
    }
}
