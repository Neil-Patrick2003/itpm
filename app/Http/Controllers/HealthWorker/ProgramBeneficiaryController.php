<?php

namespace App\Http\Controllers\HealthWorker;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProgramBeneficiaryController extends Controller
{
    public function index()
    {
        $assignmentAddress = Auth::user()->assign_address;

        $beneficiaries = Children::with('program', 'parent', 'record')
            ->whereHas('parent', function ($query) use ($assignmentAddress) {
                $query->where('address', $assignmentAddress);
            })
            ->whereHas('program')
            ->orderBy('name', 'asc')
            ->get(
            );


        $beneficiaries->each(function ($beneficiary) {
            // Get the latest and current records (assumed to be ordered by created_at)
            $latestRecord = $beneficiary->record()->latest()->first();
            $currentRecord = $beneficiary->record()->orderBy('created_at', 'desc')->first();

            if ($latestRecord && $currentRecord) {
                $beneficiary->latest_bmi = $latestRecord->bmi;
                $beneficiary->current_bmi = $currentRecord->bmi;
            } else {
                $beneficiary->latest_bmi = null;
                $beneficiary->current_bmi = null;
            }
        });


        $improvedCount = $beneficiaries->filter(function ($beneficiary) {
            return $beneficiary->latest_bmi !== null &&
                $beneficiary->current_bmi !== null &&
                $beneficiary->current_bmi > $beneficiary->latest_bmi;
        })->count();


        $boys = $beneficiaries->where('gender', 'male')->count();


        $girls = $beneficiaries->where('gender', 'female')->count();



        return Inertia::render('Worker/ChildrenRecord/ChildrenRecord', [
            'beneficiaries' => $beneficiaries,
            'total_children' => $beneficiaries->count(),
            'improved_children' => $improvedCount,
            'boys' => $boys,
            'girls' => $girls

        ]);

    }

    public function show( $id){

        $child = Children::with('program', 'parent', 'record')
            ->findOrFail($id);


        $recentRecord = ChildrenRecord::where('children_id', $child->id)->latest()->first();

            $growthData = $child->record->map(function ($record) {
                return [
                    'date' => $record->created_at->format('Y-m-d'), // or use a specific date field
                    'height' => $record->height,
                    'weight' => $record->weight,
                    'created_at' => $record->created_at,
                ];
            });



        return Inertia::render('Worker/ChildrenRecord/ShowChildrenRecord', [
            'child' => $child,
            'growthData' => $growthData,
            'recent_record' => $recentRecord ? [
                'id' => $recentRecord->id,
                'bmi' => $recentRecord->bmi,
                'bmi_category' => $recentRecord->bmi_category,
                'created_at' => $recentRecord->created_at,
            ] : null,
        ]);
    }

    public function store()
    {

    }
}
