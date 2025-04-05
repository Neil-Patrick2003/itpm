<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Program;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Sponsor;

    
class ProgramController extends Controller
{
    public function index(){
        $programs = Program::latest()->paginate(6);
        return Inertia::render('Admin/Program/Index', [
            'programs' => $programs
        ]);
    }

    public function store(Request $request) {
       
        $validated = $request->validate([
            'title' => 'required|string|max:255',        
            'description' => 'required|string|max:1000',   
            'start_date' => 'required|date',               
            'duration' => 'required|integer|min:1',        
            'total_beneficiaries' => 'required|integer|min:1', 
            'selected_items' => 'array|nullable', // Make sure selected_items is an array (optional)

        ]);

        
        $program = Program::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'duration' => $request->duration,
            'total_beneficiaries' => $request->total_beneficiaries,
        ]);


       
        if ($request->has('selectedItems') && is_array($request->selectedItems) && !empty($request->selectedItems)) {
            $program->sponsors()->attach($request->selectedItems);
        } else {
            \Log::debug("No selected items or the selected items are invalid.");
        }
        return redirect('/programs')->with('message', 'Program created sucessfully!.');
    }

    public function show(Request $request, $id){
        $program = Program::findOrFail($id);
        return Inertia::render('Admin/Program/Edit', [
            'program' => $program
        ]);
    }

    public function create(){
        $sponsors = Sponsor::all();
        return  Inertia::render('Admin/Program/Create', [
            'sponsors' => $sponsors
        ]);
    }

   

}
