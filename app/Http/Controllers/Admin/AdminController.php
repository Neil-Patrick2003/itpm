<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Donation;
use App\Models\Program;
use App\Models\ProgramBeneficiaries;
use App\Models\Record;
use App\Models\Sponsor;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class AdminController extends Controller
{
    public function dashboard()
    {

        $total_programs = Program::count();

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
            'top_sponsors' => $top_sponsors,
            'total_sponsors' => $total_sponsors,
            'total_programs' => $total_programs,
            'total_beneficiaries' => $total_beneficiaries,
            'total_donations' => $total_donations,

            ]);
    }

    public function analytics()
    {
        $total_childrens = Children::count();
        $total_programs = Program::count();

        $averageWeights = DB::table('children_records')
           ->join('program_beneficiaries', 'children_records.children_id', '=', 'program_beneficiaries.children_id')
            ->select(
                DB::raw("DATE_FORMAT(children_records.created_at, '%Y-%m') as month"),
                DB::raw('AVG(children_records.weight) as avg_weight')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();


        $sponsorshipStats = DB::table('donations')
            ->leftJoin('donation__items', 'donations.id', '=', 'donation__items.donation_id')  // Fixed to match table name
            ->select(
                DB::raw("DATE_FORMAT(donations.created_at, '%Y-%m') as month"),
                DB::raw("SUM(CASE WHEN donations.type = 'cash' THEN donations.amount ELSE 0 END) as total_money"),
                DB::raw("SUM(CASE WHEN donations.type = 'goods' THEN donation__items.qty ELSE 0 END) as goods_count")  // Fixed to match table name
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();


        $beneficiaryMonthlyStats = DB::table('program_beneficiaries')
            ->leftJoin('childrens', 'program_beneficiaries.children_id', '=', 'childrens.id')
            ->select(
                DB::raw("DATE_FORMAT(childrens.created_at, '%Y-%m') as month"),
                DB::raw("COUNT(childrens.id) as beneficiaries_count")
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $incoming_programs_count = Program::with('sponsors')
            ->where('start_date', '>', now())
            ->count();

        $completed_programs_count = Program::with('sponsors')
            ->whereRaw('start_date + INTERVAL duration DAY <= ?', [now()])
            ->count();

        $in_progress_program_count = Program::with('sponsors')
            ->whereRaw('start_date <= ? AND start_date + INTERVAL duration DAY > ?', [now(), now()])
            ->count();






        return Inertia::render('Admin/Report', [
            'total_childrens' => $total_childrens,
            'total_programs' => $total_programs,
            'averageWeights' => $averageWeights,
            'beneficiaryMonthlyStats' => $beneficiaryMonthlyStats,
            'programStatusCounts' => [
                'completed' => $completed_programs_count,
                'in_progress' => $in_progress_program_count,
                'incoming' => $incoming_programs_count,
            ],

            'sponsorshipStats' => $sponsorshipStats,
        ]);
    }
}
