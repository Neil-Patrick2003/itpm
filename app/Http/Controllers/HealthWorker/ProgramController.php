<?php

namespace App\Http\Controllers\HealthWorker;

use App\Http\Controllers\Controller;
use App\Mail\Credentials;
use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\Program;
use App\Models\Record;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::all();
        return Inertia::render('Worker/Record/RecordIndex', [
            'programs' => $programs,
        ]);


    }

    public function create($id)
    {
        $program = Program::findOrFail($id);
        return Inertia::render('Worker/Program/CreateProgramRecord', [
            'program' => $program,
        ]);
    }
    public function show(Request $request,   $id)
    {
        $program = Program::findOrFail($id);

        $records = Children::with('parent', 'latestRecord')
            ->whereHas('parent', function ($q) use ($request) {
                $q->where('address', '=', Auth::user()->assign_address);;;
            })
            ->whereHas('program', function ($q) use ($program) {
                $q->where('id', '=', $program->id);
            })
            ->latest()
            ->get();




        return Inertia::render('Worker/Program/RecordPerProgram', [
            'program' => $program,
            'records' => $records,
        ]);
    }

    public function store(Request $request, $id)
    {
        $program = Program::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|max:255|string', // child's name
            'birth_date' => 'required|date',
            'gender' => 'required|string',
            'parent_name' => 'required|max:255|string',
            'address' => 'required|max:255|string',
            'phone_number' => 'required|max:255|string',
            'email' => 'required|max:255|email',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
        ]);

        $bmi = $this->calculateBmi($request->weight, $request->height);

        // Check if the parent already exists by email
        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            // Create parent if not exists
            $user = User::create([
                'name' => $validated['parent_name'],
                'email' => $validated['email'],
                'address' => $validated['address'],
                'password' => bcrypt($validated['phone_number']),
                'role' => 'parent',
                'phone' => $validated['phone_number'],
            ]);
        }

        // Check if child already exists for this parent by name and birth date
        $child = Children::where('name', $validated['name'])
            ->where('birth_date', $validated['birth_date'])
            ->where('parent_id', $user->id)
            ->first();

        if (!$child) {
            $child = Children::create([
                'name' => $validated['name'],
                'birth_date' => $validated['birth_date'],
                'gender' => $validated['gender'],
                'parent_id' => $user->id,
            ]);
        }

        // Create health record
        ChildrenRecord::create([
            'weight' => $validated['weight'],
            'height' => $validated['height'],
            'bmi' => $bmi,
            'children_id' => $child->id,
        ]);

        // Attach child to the program if not already attached
        if (!$program->children->contains($child->id)) {
            $program->children()->attach($child->id);
        }

        // Prepare email data
        $emailData = [
            'parent_name' => $user->name,
            'parent_email' => $user->email,
            'child_name' => $child->name,
            'program_name' => $program->title,
        ];

        try {
            Mail::to($user->email)->send(new Credentials($emailData));
            return redirect()->back()->with('message', 'Record created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('message', 'Record created successfully. Email not sent.');
        }
    }


    public function calculateBmi($weight, $height)
    {
        if ($height <= 0) {
            return 'Height cannot be zero or negative';
        }

        // Convert height from cm to meters if necessary
        if ($height > 3) { // assumes height is in cm if it's > 3 meters
            $height = $height / 100;
        }

        $bmi = $weight / ($height * $height);
        return round($bmi, 2);  // Round the result to 2 decimal places
    }
}
