<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\Donation_Item;
use App\Models\Sponsor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function create($id)
    {
        $sponsor = Sponsor::findOrFail($id);

        $donations = Donation::where('sponsor_id', '=', $sponsor->id)
            ->with('donation_items')
            ->get();

        // foreach($donations as $donation){
        //     dump($donation->toArray());
        // }

        return Inertia::render('Admin/Donation/Create', [
            'sponsor' => $sponsor,
        ]);
    }

//    public function store(Request $request, Sponsor $sponsor)
//    {
//
//        $validated = $request->validate([
//            'donation_type' => 'required',
//            'amount' => 'nullable|numeric|min:0|max:99999999.99',
//            'description' => 'nullable|min:5',
//            'qty' => 'nullable|min:1',
//            'items' => 'nullable|array',
//            'items.*.description' => 'required|string|min:5',
//            'items.*.qty' => 'required|integer|min:1',
//        ]);
//
//        $donation = Donation::create([
//            'type' => $request->donation_type,
//            'amount' => $request->amount,
//            'sponsor_id' => $sponsor->id,
//        ]);
//
//        // If donation type is 'goods', ensure there are items
//        if ($request->donation_type === 'goods') {
//            if (empty($request->items)) {
//                return redirect()->back()->withErrors(['items' => 'At least one item is required when donation type is goods.']);
//            }
//
//            // Save the donation items
//            foreach ($request->items as $item) {
//                Donation_item::create([
//                    'description' => $item['description'],
//                    'qty' => $item['qty'],
//                    'donation_id' => $donation->id,
//                ]);
//            }
//        }
//
//        return redirect('/sponsorships/'.$sponsor->id)->with('message', 'Donation added successfully.');
//    }
}
