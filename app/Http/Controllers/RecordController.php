<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecordController extends Controller
{
    public function index(Request $request){
        $records = Record::when($request->search, function ($q) use ($request)
            {
                return $q->where('children_name', 'like', '%' . $request->search . '%');
            })
            ->latest()
            ->paginate(20, ['*'], 'page', $request->input('page', 1));


        return Inertia::render('Worker/Record/RecordIndex', [
            'records' => $records,
            'search' => $request->query('search'),
            'page' => $request->input('page', 1)
        ]);
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

        $recorded_by = Auth::id();


        $record = Record::create([
            'children_name' => $request->children_name,
            'birth_date' => $request->birth_date,
            'parent_name' => $request->parent_name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'weight' => $request->weight,
            'height' => $request->height,
            'gender' => $request->gender,
            'recorded_by' => $recorded_by,
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
