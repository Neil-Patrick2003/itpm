<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\Donation_Item;
use App\Models\Sponsor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rule;


class SponsorController extends Controller
{
    public function index()
    {
        $sponsors = Sponsor::latest()->paginate(20);

        return Inertia::render('Admin/Sponsor/Index', [
            'sponsors' => $sponsors,
        ]);
    }

    public function create(){
        return Inertia::render('Admin/Sponsor/CreateSponsorship');
    }


// donation controller
//    public function create()
//    {
//        return inertia('Admin/Donation/Create');
//    }


    public function store(Request $request)
    {
        // Check if sponsor or user already exists
        $existingUser = User::where('email', $request->email)->first();
        $existingSponsor = Sponsor::where('email', $request->email)->first();

        // Validation rules
        $validated = $request->validate([
            'name' => 'required',
            'email' => [
                'required',
                'email',
                // Ignore unique email check if user exists
                $existingUser ? Rule::exists('users', 'email') : Rule::unique('users', 'email'),
            ],
            'phone_number' => 'required',
            'photo_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'donation_type' => 'required',
            'amount' => 'nullable|numeric|min:0|max:99999999.99',
            'description' => 'nullable|min:5',
            'qty' => 'nullable|min:1',
            'items' => 'nullable|array',
            'items.*.description' => 'required|string|min:5',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        $profile_photo_url = null;
        if ($request->hasFile('photo_url')) {
            $destination_path = 'images';
            $photo_url = $request->file('photo_url');
            $photo_name = $photo_url->getClientOriginalName();
            $profile_photo_url = $photo_url->storeAs($destination_path, $photo_name, 'public');
        }

        // Reuse or create user
        if (!$existingUser) {
            $existingUser = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone_number,
                'role' => 'sponsor',
                'profile_photo_url' => $profile_photo_url,
                'password' => Hash::make($request->phone_number),
            ]);
        }


        // Reuse or create sponsor
        if (!$existingSponsor) {
            $existingSponsor = Sponsor::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'photo_url' => $profile_photo_url,
            ]);
        }



        // Create donation
        $donation = Donation::create([
            'type' => $request->donation_type,
            'amount' => $request->amount,
            'sponsor_id' => $existingSponsor->id,
        ]);



        // Handle goods donation items
        if ($request->donation_type === 'goods') {
            if (empty($request->items)) {
                return redirect()->back()->withErrors(['items' => 'At least one item is required when donation type is goods.']);
            }

            foreach ($request->items as $item) {
                Donation_item::create([
                    'description' => $item['description'],
                    'qty' => $item['qty'],
                    'donation_id' => $donation->id,
                ]);
            }
        }

        return redirect('/sponsorships')->with('message', 'Sponsor and donation saved successfully.');
    }


    public function show($id)
    {
        $sponsor = Sponsor::where('id' , $id)->first();
        $sponsor = $sponsor->load(['donations.donation_items']);



        return Inertia::render('Admin/Sponsor/Show', [
            'sponsor' => $sponsor,
        ]);

    }
}
