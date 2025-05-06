<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Donation;
use App\Models\Expenses;
use App\Models\Program;
use App\Models\Sponsor;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function generatePdf(Request $request)
    {
        // Helper function to categorize BMI
        function getCategory($bmi)
        {
            if ($bmi < 18.5) return 1; // Underweight
            if ($bmi < 25) return 2;   // Normal
            if ($bmi < 30) return 3;   // Overweight
            return 4;                  // Obese
        }

        // Get start and end date from request or set defaults
        $start = Carbon::parse($request->input('start', now()->subMonth()->toDateString()))->startOfDay();
        $end = Carbon::parse($request->input('end', now()->toDateString()))->endOfDay();

        // Debug logs for date range
        \Log::debug('Start Date: ' . $start);
        \Log::debug('End Date: ' . $end);

        // -----------------------------------------------
        // 1. Top Sponsors
        // -----------------------------------------------

        // Top 5 sponsors by total cash donations
        $topFundsSponsors = Sponsor::select('sponsors.*', \DB::raw('SUM(donations.amount) as total_amount'))
            ->join('donations', 'sponsors.id', '=', 'donations.sponsor_id')
            ->where('donations.type', 'cash')
            ->whereBetween('donations.created_at', [$start, $end])
            ->groupBy('sponsors.id')
            ->orderByDesc('total_amount')
            ->with('donations')
            ->take(5)
            ->get();

        // Top 5 sponsors by goods donations (based on total item value)
        $topGoodsSponsors = Sponsor::select('sponsors.*', \DB::raw('SUM(donations.amount) as total_amount'))
            ->join('donations', 'sponsors.id', '=', 'donations.sponsor_id')
            ->join('donation__items', 'donations.id', '=', 'donation__items.donation_id')
            ->where('donations.type', 'goods')
            ->whereBetween('donations.created_at', [$start, $end])
            ->groupBy('sponsors.id')
            ->orderByDesc('total_amount')
            ->with('donations')
            ->take(5)
            ->get();

        // -----------------------------------------------
        // 2. General Stats
        // -----------------------------------------------

        $totalPrograms = Program::count();
        $totalHealthWorkers = User::where('role', 'health_worker')->count();
        $totalFunds = Donation::where('type', 'cash')
            ->whereBetween('created_at', [$start, $end])
            ->sum('amount');

        $expenses = Expenses::whereBetween('created_at', [$start, $end])->get();
        $totalExpenses = $expenses->sum('amount');

        // -----------------------------------------------
        // 3. Health Monitoring Stats
        // -----------------------------------------------

        // Load children with their health records in the date range and latestRecord relation
        $children = Children::with([
            'record' => function ($q) use ($start, $end) {
                $q->whereBetween('created_at', [$start, $end])->orderBy('created_at', 'desc');
            },
            'latestRecord'
        ])->get();

        // Average BMI from latest health records (excluding nulls)
        $averageBmi = $children
            ->map(fn($child) => $child->latestRecord?->bmi)
            ->filter()  // removes null values
            ->avg();

        // Number of children with at least one record in the date range
        $childMonitorCount = Children::whereHas('record', function ($q) use ($start, $end) {
            $q->whereBetween('created_at', [$start, $end]);
        })->count();

        // Number of children whose BMI improved (latest < previous)
        $improvedCount = $children->filter(function ($child) {
            $records = $child->record;
            if ($records->count() < 2) return false;

            $latestBMI = $records->first()->BMI;
            $previousBMI = $records->skip(1)->first()->BMI;

            return $previousBMI > $latestBMI;
        })->count();

        // Children with good nutrition (BMI > 18.5)
        $goodNutritionCount = Children::whereHas('latestRecord', function ($q) use ($start, $end) {
            $q->where('bmi', '>', 18.5)->whereBetween('created_at', [$start, $end]);
        })->count();

        // Children needing support (BMI < 18.5)
        $needSupportCount = Children::whereHas('record', function ($q) use ($start, $end) {
            $q->where('bmi', '<', 18.5)->whereBetween('created_at', [$start, $end]);
        })->count();

        // Unique addresses of parents within the date range
        $addresses = \DB::table('childrens')
            ->join('users', 'childrens.parent_id', '=', 'users.id')
            ->whereBetween('childrens.created_at', [$start, $end])
            ->distinct()
            ->count('users.address');

        // -----------------------------------------------
        // 4. Report Data Setup
        // -----------------------------------------------

        // Check if report has any data
        $noRecordsAvailable = (
            $topFundsSponsors->isEmpty() &&
            $topGoodsSponsors->isEmpty() &&
            $expenses->isEmpty() &&
            $children->isEmpty()
        );

        // Prepare data for the PDF view
        $data = [
            'title' => 'Summary Report',
            'content' => 'This summary contains health and sponsor statistics.',
            'start_date' => $start->toDateString(),
            'end_date' => $end->toDateString(),

            // Health Monitoring
            'childMonitor' => $childMonitorCount,
            'improvedCount' => $improvedCount,
            'goodNutritionCount' => $goodNutritionCount,
            'needSupportCount' => $needSupportCount,
            'averageBmi' => $averageBmi,

            // Finance
            'totalFunds' => $totalFunds,
            'totalExpenses' => $totalExpenses,

            // Sponsors and Programs
            'topFundsSponsors' => $topFundsSponsors,
            'topGoodsSponsors' => $topGoodsSponsors,
            'expenses' => $expenses,
            'addresses' => $addresses,
            'totalPrograms' => $totalPrograms,
            'totalHealthWorkers' => $totalHealthWorkers,

            // Flags
            'noRecordsAvailable' => $noRecordsAvailable,
        ];

        // -----------------------------------------------
        // 5. Generate and Download PDF
        // -----------------------------------------------

        $pdf = PDF::loadView('Report.SummaryReport', $data);
        return $pdf->download('summary_report.pdf');
    }


    public function budgetAndExpenses(){
        $start = Carbon::parse(now()->subMonth()->toDateString())->startOfDay();
        $end = Carbon::parse(now()->toDateString())->endOfDay();

        $totalFunds = Donation::where('type', 'cash')
            ->whereBetween('created_at', [$start, $end])
            ->sum('amount');

        $expenses = Expenses::whereBetween('created_at', [$start, $end])->get();
        $totalExpenses = $expenses->sum('amount');
    }

    public function nutritionReport()
    {
        $now = now();
        $start = $now->copy()->subMonth()->startOfDay();
        $end = $now->copy()->endOfDay();

        $records = Children::with([
            'parent',
            'program',
            'record' => function($query) use ($start, $end) {
                $query->whereBetween('created_at', [$start, $end]);
            }
        ])
            ->has('program')
            ->get()
            ->groupBy('parent.address');

        $data = [
            'records' => $records,
            'start_date' => $start->toDateString(),
            'end_date' => $end->toDateString(),
        ];

        $pdf = PDF::loadView('Report.ChildrenHealthReport', $data);
        return $pdf->download('child_monitoring_report.pdf');
    }

}
