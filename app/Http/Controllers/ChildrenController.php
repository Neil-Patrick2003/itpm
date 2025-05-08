<?php

namespace App\Http\Controllers;

use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\Program;
use App\Models\Record;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChildrenController extends Controller
{

    //admin children index
    public function index(Request $request)
    {


        $records = Children::with('program', 'latestRecord')
        ->when($request->search, function ($q) use ($request) {
            return $q->where('name', 'like', '%' . $request->search . '%');
        })
            ->when($request->location, function ($q) use ($request) {
                return $q->where('address', $request->location);
            })
            ->latest()
            ->paginate(20);


        $recordCount = Record::count();
        $underweightCount = Record::underweight()->count();
        $normalCount = Record::normalBmi()->count();
        $overweightCount = Record::overweight()->count();
        $obeseCount = Record::obese()->count();
        $overweight_andObeseCount = $overweightCount + $obeseCount;

        return Inertia::render('Admin/Children/Children', [
            'records' => $records,
            'search' => $request->query('search'),
            'page' => $request->input('page', 1),
            'recordCount' => $recordCount,
            'underweightCount' => $underweightCount,
            'normalCount' => $normalCount,
            'overweight_andObeseCount' => $overweight_andObeseCount,
        ]);
    }

    public function show(){

        $childrens = Children::with('program')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Children/ChildrensProfile', [
            'childrens' => $childrens,
        ]);
    }

    public function showProfile($id)
    {
        $child = Children::with('program', 'parent', 'record')
            ->findOrFail($id);

        // Safely get the most recent record
        $recentRecord = ChildrenRecord::where('children_id', $child->id)->latest()->first();

        $growthData = $child->record->map(function ($record) {
            return [
                'date' => $record->created_at->format('Y-m-d'), // or use a specific date field
                'height' => $record->height,
                'weight' => $record->weight,
            ];
        });


        return Inertia::render('Admin/Children/ChildrenProfile', [
            'child' => $child,
            'growthData' => $growthData,
            'recent_record' => $recentRecord ? [
                'id' => $recentRecord->id,
                'bmi' => $recentRecord->bmi,
                'bmi_category' => $recentRecord->bmi_category,
            ] : null,
        ]);
    }


}
