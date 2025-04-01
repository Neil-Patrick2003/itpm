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
        return inertia('Admin/Sponsor/Index');
    }

    public  function create(){
        return inertia('Admin/Sponsor/Create');
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'phone_number' => 'required',
        'donation_type' => 'required',
        'amount' => 'nullable|numeric|min:0',
        'description' => 'nullable|min:5',
        'qty' => 'nullable|min:1',
        'items' => 'nullable|array',
        'items.*.description' => 'required|string|min:5',
        'items.*.qty' => 'required|integer|min:1',
    ]);

    $sponsor = Sponsor::create([
        'name' => $request->name,
        'email' => $request->email,
        'phone_number' => $request->phone_number,
    ]);

    $donation = Donation::create([
        'type' => $request->donation_type,
        'amount' => $request->amount,
        'sponsor_id' => $sponsor->id,
    ]);

    if ($request->has('items') && is_array($request->items)) {
        foreach ($request->items as $item) {
            Donation_item::create([
                'description' => $item['description'],
                'qty' => $item['qty'],
                'donation_id' => $donation->id,
            ]);
        }
    }

    return redirect('/sponsorships')->with('success', 'Donation and items saved successfully');
}


}