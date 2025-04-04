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
        $sponsors = Sponsor::latest()->paginate(6);
        
        return Inertia::render('Admin/Sponsor/Index', [
            'sponsors' => $sponsors
        ]);
    }

    
    

    public  function create(){
        return inertia('Admin/Sponsor/Create');
    }

    public function store(Request $request)
    {
        // Validate the data
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
            'donation_type' => 'required',
            'amount' => 'nullable|numeric|min:0|max:99999999.99',
            'description' => 'nullable|min:5',
            'qty' => 'nullable|min:1',
            'items' => 'nullable|array',
            'items.*.description' => 'required|string|min:5',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        if($request->hasFile('photo_url'))
        {
            $destination_path = 'images';
            $photo_url = $request->file('photo_url');
            $photo_name = $photo_url->getClientOriginalName();
            $path = $request->file('photo_url')->storeAs($destination_path, $photo_name, 'public');
            
            
        }


        // Create the sponsor
        $sponsor = Sponsor::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'photo_url' => $photo_name
        ]);

        // Create the donation
        $donation = Donation::create([
            'type' => $request->donation_type,
            'amount' => $request->amount,
            'sponsor_id' => $sponsor->id,
        ]);

        // If donation type is 'goods', ensure there are items
        if ($request->donation_type === 'goods') {
            if (empty($request->items)) {
                return redirect()->back()->withErrors(['items' => 'At least one item is required when donation type is goods.']);
            }

            // Save the donation items
            foreach ($request->items as $item) {
                Donation_item::create([
                    'description' => $item['description'],
                    'qty' => $item['qty'],
                    'donation_id' => $donation->id,
                ]);
            }
        }

        // Redirect back with success message
        return redirect('/sponsorships')->with('message', 'Sponsor created successfully.');
    }

    public function show(Request $request, $id){
        $sponsor = Sponsor::findOrFail($id);
        return Inertia::render('Admin/Sponsor/Show', [
            'sponsor' => $sponsor
        ]);
    }



}