<?php

namespace App\Http\Controllers;

use App\Models\Children;
use App\Models\Program;
use App\Models\Record;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChildrenController extends Controller
{
    public function index(Request $request)
    {

        $records = Record::when($request->search, function ($q) use ($request) {
            return $q->where('children_name', 'like', '%' . $request->search . '%');
        })
            ->latest()
            ->paginate(6, ['*'], 'page', $request->input('page', 1));

        // 👉 Use through() to inject the computed BMI for every record
        $transformedRecords = $records->through(function ($record) {
            return [
                'id' => $record->id,
                'children_name' => $record->children_name,
                'birth_date' => $record->birth_date,
                'gender' => $record->gender,
                'height' => $record->height,
                'weight' => $record->weight,
                'address' => $record->address,
                'bmi' => $record->bmi, // ✅ Include the computed BMI
            ];
        });


        $recordCount = Record::count();
        $underweightCount = Record::underweight()->count();
        $normalCount = Record::normalBmi()->count();
        $overweightCount = Record::overweight()->count();
        $obeseCount = Record::obese()->count();
        $overweight_andObeseCount = $overweightCount + $obeseCount;

        return Inertia::render('Admin/Children/Children', [
            'records' => $transformedRecords,
            'search' => $request->query('search'),
            'page' => $request->input('page', 1),
            'recordCount' => $recordCount,
            'underweightCount' => $underweightCount,
            'normalCount' => $normalCount,
            'overweight_andObeseCount' => $overweight_andObeseCount,
        ]);
    }

}
