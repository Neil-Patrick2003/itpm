<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\Program;
use App\Models\Record;
use App\Models\User;
use Illuminate\Cache\RetrievesMultipleKeys;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChildrenRecordController extends Controller
{
    public function create(Request $request){

        return Inertia::render('Admin/Children/CreateChildren');
    }

    public function new(Request $request){



        $validated = $request->validate([
            'name' => ['required', 'string'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'string'],
            'weight' => ['required', 'numeric'],
            'height' => ['required', 'numeric'],
            'parent_name' => ['required', 'string'],
            'parent_age' => ['required', 'integer'],
            'email' => ['required', 'email', 'max:255'],
            'phone_number' => ['required', 'string'], // Or use the phone package
        ]);

        $parent = User::create([
            'name' => $request->parent_name,
            'email' => $request->email,
            'password' => hash('sha256', $request->password),
            'role' => 'parent',
            'phone' => $request->phone_number,
            'address' => $request->address,
            'age' => $request->parent_age,
        ]);

        $children = Children::create([
            'name' => $request->name,
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
            'parent_id' => $parent->id,
        ]);




        $heightInMeters = $request->height / 100;

        $bmi = $request->weight / ($heightInMeters * $heightInMeters);

        $record = ChildrenRecord::create([
            'weight' => $request->weight,
            'height' => $request->height,
            'bmi' => $bmi,
            'children_id' => $children->id,
        ]);

        return redirect()->back()->with('message', 'Record created.');
    }

    public function store(Request $request, Program $program)
    {
        // Get program title
        $program_name = $program->title;

        // Validate if there are record IDs to insert
        $validated = $request->validate([
            'record_ids' => ['required', 'array'],
        ]);

        foreach ($validated['record_ids'] as $record_id) {
            $record = Record::find($record_id);
            $existing_user = User::where('name', $record->parent_name)->first();
            $bmi = $this->calculateBmi($record->weight, $record->height);

            // Check if user exists
            if (!$existing_user) {
                // Create a new user if doesn't exist
                $user = User::create([
                    'name' => $record->parent_name,
                    'email' => $record->email,
                    'password' => bcrypt($request->password), // Use bcrypt for password hashing
                    'role' => 'parent',
                    'phone' => $request->phone_number,
                    'address' => $request->address,
                ]);
            } else {
                $user = $existing_user;
            }

            // Check if the child exists
            $existing_children = Children::where('name', $record->children_name)->first();

            // Create or get the child record
            if (!$existing_children) {
                $children = Children::create([
                    'name' => $record->children_name,
                    'birth_date' => $record->birth_date,
                    'gender' => $record->gender,
                    'parent_id' => $user->id,
                ]);
            } else {
                $children = $existing_children;
            }

            // Create or update the children record
            ChildrenRecord::create([
                'weight' => $record->weight,
                'height' => $record->height,
                'bmi' => $bmi,
                'children_id' => $children->id,
            ]);
        }

        // Redirect with a success message
        return redirect()->back()->with('message', 'Record created or updated.');
    }




    public function calculateBmi($weight, $height)
    {
        if ($height <= 0) {
            return 'Height cannot be zero or negative';
        }

        $bmi = $weight / ($height * $height);
        return round($bmi, 2);  // Round the result to 2 decimal places
    }



}
