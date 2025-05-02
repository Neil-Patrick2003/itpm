<?php

namespace App\Http\Controllers\HealthWorker;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\Program;
use App\Models\Record;
use App\Models\User;
use Illuminate\Http\Request;
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
    public function show($id)
    {
        $program = Program::findOrFail($id);
        $record = Program::with('children.record')
            ->where('id', $id)
            ->first();

        return Inertia::render('Worker/Program/RecordPerProgram', [
            'program' => $program,
            'record' => $record,
        ]);
    }

    public function store(Request $request, $id)
    {

        $program = Program::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|max:255|string', // This is the child's name
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

        // Find or create the parent (User)
        $user = User::firstOrCreate(
            ['name' => $validated['name']],
            [
                'name' => $request->parent_name,
                'email' => $request->email,
                'address' => $request->address,
                'password' => bcrypt($request->phone), // Use bcrypt for password hashing
                'role' => 'parent',
                'phone' => $request->phone_number,
            ]
        );

        // Find or create the child
        $child = Children::firstOrCreate(
            [
                'name' => $validated['name'],
            ],
            [
                'name' => $request->name,
                'birth_date' => $request->birth_date,
                'gender' => $request->gender,
                'parent_id' => $user->id,
            ]
        );

        // Create the actual health record tied to the child and program
        ChildrenRecord::create([
            'weight' => $validated['weight'],
            'height' => $validated['height'],
            'bmi' => $bmi,
            'children_id' => $child->id,
        ]);

        $program->children()->attach($child->id);



        return Inertia::render('Worker/Program/CreateProgramRecord')
            ->with('message', 'Record created successfully.');
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
