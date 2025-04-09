<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\ProgramBeneficiaries;
use App\Models\Record;
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
            'cover_photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);


        if ($request->hasFile('cover_photo')) {
            $destination_path = 'images';
            $cover_photo = $request->file('cover_photo');
            $photo_name = $cover_photo->getClientOriginalName();
            $program_background_url = $request->file('cover_photo')->storeAs($destination_path, $photo_name, 'public');
        }




        $program = Program::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'duration' => $request->duration,
            'total_beneficiaries' => $request->total_beneficiaries,
            'program_background_url' => $program_background_url,
        ]);



        if ($request->has('sponsor_ids') && is_array($request->sponsor_ids) && ! empty($request->sponsor_ids)) {
            $program->sponsors()->attach($request->sponsor_ids);
        } else {
            Log::debug('No selected items or the selected items are invalid.');
        }

        return redirect('/programs')->with('message', 'Program created sucessfully!.');
    }

    public function show(Request $request, Program $program)
    {
        $beneficiaries = ProgramBeneficiaries::
        with('children.parent')
            ->where('program_id', $program->id)
            ->get();
        dd($beneficiaries->toArray());


        return Inertia::render('Admin/Program/Show', [
            'program' => $program,
            'beneficiaries' => $beneficiaries,
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
