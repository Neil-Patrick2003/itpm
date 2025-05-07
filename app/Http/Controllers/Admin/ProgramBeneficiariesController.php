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

        $records = Children::with('parent', 'latestRecord')
            ->orderBy('name')
            ->get();

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
            $children = Children::with('latestRecord')->find($record_id);

            if ($children) {
                $childrenIdsToAttach[] = $children->id;
            }
        }


        if (!empty($childrenIdsToAttach)) {
            $program->children()->syncWithoutDetaching($childrenIdsToAttach);
        } else {
            Log::debug('No selected items or the selected items are invalid.');
        }

        // Redirect with a success message
        return redirect("/programs/{$program->id}")->with('message', 'Added successfully.');
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
