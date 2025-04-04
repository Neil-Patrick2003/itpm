<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Sponsor;
use App\Models\Donation;
use App\Models\Donation_Item;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class SponsorController extends Controller{

    public function index(){
        $sponsors = Sponsor::latest()->paginate(20);
        
        return Inertia::render('Admin/Sponsor/Index', [
            'sponsors' => $sponsors
        ]);
    }

    
    

    public  function create(){
        return inertia('Admin/Donation/Create');
    }

    public function store(Request $request)
    {

        $validated = $request->validate(
            [
                'name' => 'required',
                'email' => 'required|email',
                'phone_number' => 'required',
                'photo_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
            ]
        );
        
        
        if($request->hasFile('photo_url'))
        {
            $destination_path = 'images';
            $photo_url = $request->file('photo_url');
            $photo_name = $photo_url->getClientOriginalName();
            $path = $request->file('photo_url')->storeAs($destination_path, $photo_name, 'public'); 
        }

        $sponsor = Sponsor::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'photo_url' => $photo_name
        ]);



        

        // Redirect back with success message
        return redirect('/sponsorships')->with('message', 'Sponsor created successfully.');
    }

    public function show(Request $request, Sponsor $sponsor){

        return Inertia::render('Admin/Sponsor/Show', [
            'sponsor' => $sponsor
        ]);

    }



}