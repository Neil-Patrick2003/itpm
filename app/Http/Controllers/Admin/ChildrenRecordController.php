<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\ChildrenRecord;
use App\Models\Program;
use App\Models\Record;
use App\Models\User;
use Illuminate\Cache\RetrievesMultipleKeys;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChildrenRecordController extends Controller
{
    public function create(Request $request){

        return Inertia::render('Admin/Children/CreateChildren');
    }

//    public function store(Request $request){
//
//
//
//        $validated = $request->validate([
//            'name' => ['required', 'string'],
//            'birth_date' => ['required', 'date'],
//            'gender' => ['required', 'string'],
//            'weight' => ['required', 'numeric'],
//            'height' => ['required', 'numeric'],
//            'parent_name' => ['required', 'string'],
//            'parent_age' => ['required', 'integer'],
//            'email' => ['required', 'email', 'max:255'],
//            'phone_number' => ['required', 'string'], // Or use the phone package
//        ]);

//        $parent = User::create([
//            'name' => $request->parent_name,
//            'email' => $request->email,
//            'password' => hash('sha256', $request->password),
//            'role' => 'parent',
//            'phone' => $request->phone_number,
//            'address' => $request->address,
//            'age' => $request->parent_age,
//        ]);
//
//        $children = Children::create([
//            'name' => $request->name,
//            'birth_date' => $request->birth_date,
//            'gender' => $request->gender,
//            'parent_id' => $parent->id,
//        ]);
//
//
//        $heightInMeters = $request->height / 100;
//
//        $bmi = $request->weight / ($heightInMeters * $heightInMeters);
//
//        $record = ChildrenRecord::create([
//            'weight' => $request->weight,
//            'height' => $request->height,
//            'bmi' => $bmi,
//            'children_id' => $children->id,
//        ]);
//
//        return redirect()->back()->with('message', 'Record created.');
//    }

 public function store(Request $request, ChildrenRecord $record, Program $program){
        dd($record->toArray());



        $heightInMeters = $request->height / 100;

        $bmi = $request->weight / ($heightInMeters * $heightInMeters);

     $validated = $request->validate([
         'weight' => 'required|numeric',
         'height' => 'required|numeric',
     ]);

     $record = ChildrenRecord::create([
         'weight' => $request->weight,
         'height' => $request->height,
         'bmi' => $bmi,
         'children_id' => $id,
     ]);

        return redirect()->back()->with('message', 'Record created.');


 }






}
