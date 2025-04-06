<?php

namespace App\Http\Controllers;

use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChildrenRecordController extends Controller
{
    public function create(Request $request){

        return Inertia::render('Admin/Children/CreateChildren');
    }

    public function store(Request $request){

        try {
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

            // Continue with your logic
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Output the errors for debugging
            dd($e->errors()); // This will dump and die the validation error messages
        }


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
}
