<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $programs = Program::with('sponsors')
        ->when($request->search, function ($q) use ($request) {
            return $q->where('title', 'like', '%' . $request->search . '%');
        })
            ->latest()
            ->paginate(20, ['*'], 'page', $request->input('page', 1));


        return Inertia::render('Admin/Program/Index', [
            'programs' => $programs,
            'search' => $request->query('search'),
            'page' => $request->input('page', 1)
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'start_date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'total_beneficiaries' => 'required|integer|min:1',
            'sponsor_ids' => 'array|nullable', // Make sure selected_items is an array (optional)
        ]);

        Log::error(json_encode($validated));

        $program = Program::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'duration' => $request->duration,
            'total_beneficiaries' => $request->total_beneficiaries,
        ]);

        if ($request->has('sponsor_ids') && is_array($request->sponsor_ids) && ! empty($request->sponsor_ids)) {
            $program->sponsors()->attach($request->sponsor_ids);
        } else {
            Log::debug('No selected items or the selected items are invalid.');
        }

        return redirect('/programs')->with('message', 'Program created sucessfully!.');
    }

    public function show(Request $request, $id)
    {
        $program = Program::findOrFail($id);




        return Inertia::render('Admin/Program/Edit', [
            'program' => $program,
        ]);
    }

    public function create()
    {
        $sponsors = User::where('role', 'sponsor')->get();



        return Inertia::render('Admin/Program/Create', [
            'sponsors' => $sponsors,
        ]);
    }
}
