<?php

namespace App\Http\Controllers;

use App\Models\Expenses;
use App\Models\Sponsor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpensesController extends Controller
{
    public function index(){
        $sponsors = Sponsor::with("donations")
            ->whereHas("donations", function ($query) {
                $query->where('type', 'cash');
            })
            ->get();

        $total_donations = Sponsor::with("donations")
            ->LeftJoin("donations", "sponsors.id", "=", "donations.sponsor_id")
            ->whereHas("donations", function ($query) {
                $query->where('type', 'cash');
            })
            ->sum("donations.amount");

        $total_expenses = Expenses::sum("amount");

        $balance = $total_donations - $total_expenses;

        $expenses = Expenses::all();

        return Inertia::render('Admin/Funds', [
            'total_donations' => $total_donations,
            'sponsors' => $sponsors,
            'total_expenses' => $total_expenses,
            'balance' => $balance,
            'expenses' => $expenses,

        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'purpose' => 'required|min:5|max:255',
            'date_spent' => 'required|date',
            'amount' => 'required|numeric|min:0|max:99999999.99',
            'notes' => 'nullable|min:5|max:1000',
        ]);

        Expenses::create([
            'purpose' => $request->purpose,
            'amount' => $request->amount,
            'date_spent' => $request->date_spent,
            'notes' => $request->notes,

        ]);


        return redirect()->back()->with('message', 'Expense recorded successfully!');
    }
}
