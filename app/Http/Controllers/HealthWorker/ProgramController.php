<?php

namespace App\Http\Controllers\HealthWorker;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::all();
        return Inertia::render('Worker/Record/RecordIndex', [
            'programs' => $programs,
        ]);

    }

    public function create()
    {
        return Inertia::render('Worker/Program/CreateProgramRecord');
    }
    public function show($id)
    {
        $program = Program::findOrFail($id);
        $record = Program::with('children.record')
            ->where('id', $id)
            ->first();

        return Inertia::render('Worker/Program/RecordPerProgram', [
            'program' => $program,
            'record' => $record,
        ]);
    }
}
