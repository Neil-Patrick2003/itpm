<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Donation;
use App\Models\Sponsor;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function generatePdf()
    {
        function getCategory($bmi) {
            if ($bmi < 18.5) return 1; // underweight
            if ($bmi < 25) return 2;   // normal
            if ($bmi < 30) return 3;   // overweight
            return 4;                  // obese
        }

        $totalFunds = Donation::where('type', 'funds')->sum('amount');

        $topFundsSponsors = Sponsor::select('sponsors.*', \DB::raw('SUM(donations.amount) as total_amount'))
            ->join('donations', 'sponsors.id', '=', 'donations.sponsor_id')
            ->groupBy('sponsors.id')
            ->orderByDesc('total_amount')
            ->whereHas('donations', function ($query) {
                $query->where('type', 'cash');
            })
            ->with('donations')
            ->take(5)
            ->get();


        $improvedCount = Children::with(['record' => function ($q) {
            $q->orderBy('created_at', 'desc');
        }])->get()->filter(function ($child) {
            $records = $child->record;
            if ($records->count() < 2) return false;

            $latestBMI = $records->first()->BMI;
            $previousBMI = $records->skip(1)->first()->BMI;

            return getCategory($previousBMI) > getCategory($latestBMI);
        })->count();


        dd($improvedCount);



        $healthData = Children::with('record')->get();
        $childMonitor = $healthData->count();


        $data = ['title' => 'Sample PDF', 'content' => 'This is a test PDF'];

        // Load view and pass data to it
        $pdf = PDF::loadView('Report.SummaryReport', $data);

        // Return the generated PDF to the browser
        return $pdf->download('summary_report.pdf');
    }
}
