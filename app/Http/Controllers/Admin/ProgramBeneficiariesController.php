<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\Program;
use App\Models\Record;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class ProgramBeneficiariesController extends Controller
{

    public function index()
    {
        // Example: Fetch beneficiaries and return a
        $childrens = Children::with('program')
            ->whereHas('program')

            ->latest()
            ->paginate(20);


        return inertia('Admin/Beneficiary/AllBeneficiary', [
        'childrens' => $childrens
        ]);
    }

    public function create(Request $request, $id)
    {
        $program = Program::find($id);
        $records = Record::all()->map(function ($record) {
            return [
                'id' => $record->id,
                'name' => $record->children_name,
                'birth_date' => $record->birth_date,
                'gender' => $record->gender,
                'address' => $record->address,
                'status' => $record->status,
                'weight' => $record->weight,
                'height' => $record->height,
                'bmi' => $this->calculateBmi($record->weight, $record->height),
            ];
        });

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


        $recordIds = $validated['record_ids'];  // Store validated record IDs
        $childrenIdsToAttach = [];  // Array to store children IDs for the program attachment

        foreach ($recordIds as $record_id) {
            $record = Record::find($record_id);
            $existing_user = User::where('name', $record->parent_name)->first();
            $bmi = $this->calculateBmi($record->weight, $record->height);

            // Check if user exists
            if (!$existing_user) {
                // Create a new user if it doesn't exist
                $user = User::create([
                    'name' => $record->parent_name,
                    'email' => $record->email,
                    'address' => $record->address,
                    'password' => bcrypt($request->phone), // Use bcrypt for password hashing
                    'role' => 'parent',
                    'phone' => $record->phone_number,
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

            $childrenIdsToAttach[] = $children->id;
        }

        // Attach all children to the program, avoiding duplicates
        if (!empty($childrenIdsToAttach)) {
            $program->children()->syncWithoutDetaching($childrenIdsToAttach);
        } else {
            Log::debug('No selected items or the selected items are invalid.');
        }

        // Redirect with a success message
        return redirect("/programs/{$program->id}")->with('message', 'Added successfully.');
//        return Inertia::render('Admin/Program/AddBeneficiaries')->with('message', 'Add Beneficiaries Successfully');
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
