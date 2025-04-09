<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\Sponsor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SponsorController extends Controller
{
    public function index()
    {
        $sponsors = User::where('role', 'sponsor')->paginate(10);

        return Inertia::render('Admin/Sponsor/Index', [
            'sponsors' => $sponsors,
        ]);
    }

    public function create()
    {
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

        $profile_photo_url = null;

        if ($request->hasFile('photo_url')) {
            $destination_path = 'images';
            $photo_url = $request->file('photo_url');
            $photo_name = $photo_url->getClientOriginalName();
            $profile_photo_url = $request->file('photo_url')->storeAs($destination_path, $photo_name, 'public');
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone_number,
            'role' => 'sponsor',
            'profile_photo_url' => $profile_photo_url,
            'password' => Hash::make($request->phone_number),
        ]);

        // Redirect back with success message
        return redirect('/sponsorships')->with('message', 'Sponsor created successfully.');
    }

    public function show(Request $request, Sponsor $sponsor)
    {
        $sponsor = $sponsor->load(['donations.donation_items']);


        return Inertia::render('Admin/Sponsor/Show', [
            'sponsor' => $sponsor,
        ]);

    }
}
