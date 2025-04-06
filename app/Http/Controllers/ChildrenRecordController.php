<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ChildrenRecordController extends Controller
{
    public function create(){
        return Inertia::render('Admin/Children/CreateChildren');
    }
}
