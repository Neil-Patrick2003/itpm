<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RecordController extends Controller
{
    public function index(){
        return Inertia::render('Worker/Record/RecordIndex');
    }
}
