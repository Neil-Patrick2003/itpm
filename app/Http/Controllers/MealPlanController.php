<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\MealPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MealPlanController extends Controller
{

    public function index(){
        $announcements = MealPlan::all();
        return Inertia::render('Worker/Meal/MealIndex', [
            'announcements' => $announcements,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|max:65535',
        ]);

        MealPlan::create([
            'title' => $request->title,
            'goal_type' => $request->goal_type,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('message', 'Meal created successfully!');

    }

    //
}
