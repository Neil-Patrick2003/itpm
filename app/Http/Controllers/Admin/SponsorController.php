<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Program;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class SponsorController extends Controller{

    public function index(){
        return inertia('Admin/Sponsor/Index');
    }

    public  function create(){
        return inertia('Admin/Sponsor/Create');
    }

    public function store(Request $request){

        return redirect()->back();
    }

}