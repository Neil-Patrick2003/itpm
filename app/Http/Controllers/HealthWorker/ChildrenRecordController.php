<?php

namespace App\Http\Controllers\HealthWorker;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\Program;
use Illuminate\Http\Request;

class ChildrenRecordController extends Controller
{
    public function store( $children_id,  Request $request,)
    {

        $validated = $request->validate([
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
        ]);

        $weight = $request->weight; // in kilograms
        $heightCm = $request->height; // in centimeters

        // Convert height from cm to meters
        $heightMeters = $heightCm / 100;

        // Calculate BMI
        $bmi = $weight / ($heightMeters * $heightMeters);

        ChildrenRecord::create([
            'weight' => $weight,
            'height' => $heightCm,
            'bmi' => $bmi,
            'children_id' => $children_id,
        ]);



        return back()->with('message', 'Record saved successfully!');
    }
}
