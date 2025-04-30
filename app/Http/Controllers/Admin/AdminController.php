<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Donation;
use App\Models\ProgramBeneficiaries;
use App\Models\Record;
use App\Models\Sponsor;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class AdminController extends Controller
{
    public function dashboard()
    {

        $total_sponsors = Sponsor::count();

        $total_beneficiaries = Children::with('program')
        ->count();

        $total_donations = Donation::count();

        $total_goods = Donation::where('type', 'goods')->count();

        $total_cash = Donation::where('type', 'cash')->count();





        $top_sponsors = Sponsor::withCount('donations')
            ->orderBy('donations_count', 'desc')
            ->take(5)
            ->get()
        ;








        $recordCount = Record::count();
        $underweightCount = Record::underweight()->count();
        $normalCount = Record::normalBmi()->count();
        $overweightCount = Record::overweight()->count();
        $obeseCount = Record::obese()->count();
        $overweight_andObeseCount = $overweightCount + $obeseCount;



        $trends = DB::table('records')
            ->select(
                DB::raw("DATE(created_at) as date"),
                DB::raw("SUM(CASE
            WHEN (weight / POWER(height / 100, 2)) < 18.5 THEN 1 ELSE 0 END) AS underweight"),
                DB::raw("SUM(CASE
            WHEN (weight / POWER(height / 100, 2)) BETWEEN 18.5 AND 24.9 THEN 1 ELSE 0 END) AS normal"),
                DB::raw("SUM(CASE
            WHEN (weight / POWER(height / 100, 2)) BETWEEN 25 AND 29.9 THEN 1 ELSE 0 END) AS overweight"),
                DB::raw("SUM(CASE
            WHEN (weight / POWER(height / 100, 2)) >= 30 THEN 1 ELSE 0 END) AS obese")
            )
            ->groupBy(DB::raw("DATE(created_at)"))
            ->orderBy('date')
            ->get();


        // Add overweight + obese count:
        foreach ($trends as $trend) {
            $trend->overweight_and_obese = $trend->overweight + $trend->obese;
        }


        return Inertia::render('Dashboard', [
            'user' => auth()->user(),
            'recordCount' => $recordCount,
            'underweightCount' => $underweightCount,
            'normalCount' => $normalCount,
            'overweight_andObeseCount' => $overweight_andObeseCount,
            'trends' => $trends,
            ]);
    }
}
