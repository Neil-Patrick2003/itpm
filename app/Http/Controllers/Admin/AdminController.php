<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Donation;
use App\Models\ProgramBeneficiaries;
use App\Models\Record;
use App\Models\Sponsor;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {

        $total_sponsors = Sponsor::count();

        $total_beneficiaries = Children::with('program')
        ->count();

        $total_donations = Donation::count();

        $top_sponsors = Sponsor::withCount('donations')
            ->orderBy('donations_count', 'desc')
            ->take(5)
            ->get()
        ;

        dd($top_sponsors->toArray());







        $recordCount = Record::count();
        $underweightCount = Record::underweight()->count();
        $normalCount = Record::normalBmi()->count();
        $overweightCount = Record::overweight()->count();
        $obeseCount = Record::obese()->count();
        $overweight_andObeseCount = $overweightCount + $obeseCount;


        return Inertia::render('Dashboard', [
            'user' => auth()->user(),
            'recordCount' => $recordCount,
            'underweightCount' => $underweightCount,
            'normalCount' => $normalCount,
            'overweight_andObeseCount' => $overweight_andObeseCount,
            ]);
    }
}
