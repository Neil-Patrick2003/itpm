<?php

namespace App\Http\Controllers;

use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\Program;
use App\Models\Record;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecordController extends Controller
{
    public function index(Request $request){


        $programs = Program::all();

        $records = Children::with('parent', 'latestRecord')
        ->when($request->search, function ($q) use ($request)
            {
                return $q->where('children_name', 'like', '%' . $request->search . '%');
            })
            ->whereHas('parent', function ($q) use ($request) {
                $q->where('address', '=', Auth::user()->assign_address);;;
            })
            ->latest()
            ->paginate(20, ['*'], 'page', $request->input('page', 1));


        return Inertia::render('Worker/Record/GeneralRecord', [
            'records' => $records,
            ]
        );
    }

    public function create(){
        return Inertia::render('Worker/Record/CreateRecord');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'children_name' => 'required|max:255|string',
            'birth_date' => 'required|max:255|date',
            'parent_name' => 'required|max:255|string',
            'address' => 'required|max:255|string',
            'phone_number' => 'required|max:255|string',
            'email' => 'required|max:255|email',
            'weight' => 'required|max:255|numeric',
            'height' => 'required|max:255|numeric',
            'gender' => 'required|max:255|string|in:male,female',
        ]);

            $parent = User::create([
            'name' => $request->parent_name,
            'email' => $request->email,
            'password' => hash('sha256', $request->phone_number),
            'role' => 'parent',
            'phone' => $request->phone_number,
            'address' => $request->address,
        ]);

        $children = Children::create([
            'name' => $request->children_name,
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

        return redirect()->back()->with('message', 'Record added successfully');
    }



    public function edit(Record $record){
        return Inertia::render('Worker/Record/EditRecord', [
            'record' => $record
        ]);
    }

    public function update(Request $request, Record $record){

        $validated = $request->validate([
            'children_name' => 'required|max:255|string',
            'birth_date' => 'required|max:255|date',
            'parent_name' => 'required|max:255|string',
            'address' => 'required|max:255|string',
            'phone_number' => 'required|max:255|string',
            'email' => 'required|max:255|email',
            'weight' => 'required|max:255|numeric',
            'height' => 'required|max:255|numeric',
            'gender' => 'required|max:255|string|in:male,female',
        ]);

        $record->update($validated);

        return redirect('/health_workers/records/' . $record->id)->with([
            'message' => 'Record updated successfully',
            'record' => $record
        ]);

    }

    public function destroy(Record $record){
        $record->delete();
        return redirect('/health_workers/records')->with('message', 'Record deleted successfully');
    }
}
