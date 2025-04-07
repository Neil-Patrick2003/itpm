<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecordController extends Controller
{
    public function index(){
        $records = Record::latest()->paginate(20);

        return Inertia::render('Worker/Record/RecordIndex', [
            'records' => $records
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
}
