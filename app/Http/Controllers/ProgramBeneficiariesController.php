<?php

namespace App\Http\Controllers;

use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\Program;
use App\Models\Record;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramBeneficiariesController extends Controller
{
    public function create(Request $request, $id){

        $program = Program::find($id);
        $records =  Record::all();


        return Inertia::render('Admin/Program/AddBeneficiaries', [
            'program' => $program,
            'records' => $records,
        ]);


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
                    'phone' => $record->phone_number,
                    'address' => $record->address,
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
