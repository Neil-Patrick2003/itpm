<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HealthWorkerController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $programs = Program::with('sponsors')->limit(5)->latest()->get();
        return Inertia::render(
            'Worker/Dashboard',[
                'programs' => $programs,
                'user' => $user,
            ]
        );
    }


}
