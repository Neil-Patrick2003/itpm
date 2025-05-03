<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Children;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HealthWorkerController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        $incoming_programs = Program::with('sponsors')
            ->where('start_date', '>', now())
            ->get();

        $completed_programs = Program::with('sponsors')
            ->whereRaw('start_date + INTERVAL duration DAY <= ?', [now()])
            ->get();

        $in_progress = Program::with('sponsors')
            ->whereRaw('start_date <= ? AND start_date + INTERVAL duration DAY > ?', [now(), now()])
            ->get();

        $announcements = Announcement::with('user')->latest()->get();

        $total_beneficiary_count = Children::with('parent')
            ->whereHas('parent', function ($query) use ($user) {
                $query->where('address', $user->assign_address);
            })
            ->count();

        $beneficiary_count_incoming = Children::with('program', 'parent')
            ->whereHas('parent', function ($query) use ($user) {
                $query->where('address', $user->assign_address);
            })
            ->whereHas('program', function ($query) {
                $query->where('start_date', '>', now());
            })
            ->count();

        $beneficiary_count_completed = Children::with('program', 'parent')
            ->whereHas('parent', function ($query) use ($user) {
                $query->where('address', $user->assign_address);
            })
            ->whereHas('program', function ($query) {
                $query->whereRaw('start_date + INTERVAL duration DAY <= ?', [now()]);
            })
            ->count();

        $beneficiary_count_in_progress = Children::with('program', 'parent')
            ->whereHas('parent', function ($query) use ($user) {
                $query->where('address', $user->assign_address);
            })
            ->whereHas('program', function ($query) {
                $query->whereRaw('start_date <= ? AND start_date + INTERVAL duration DAY > ?', [now(), now()]);
            })
            ->count();

        // Fetch all programs (or a filtered version)
        $programs = Program::get();  // You can customize this query to fetch specific programs
        return Inertia::render(
            'Worker/Dashboard', [
                'programs' => $programs,
                'incoming_programs' => $incoming_programs,
                'completed_programs' => $completed_programs,
                'in_progress' => $in_progress,
                'user' => $user,
                'announcements' => $announcements,
                'total_beneficiary_count' => $total_beneficiary_count,
                'beneficiary_count_incoming' => $beneficiary_count_incoming,
                'beneficiary_count_completed' => $beneficiary_count_completed,
                'beneficiary_count_in_progress' => $beneficiary_count_in_progress,
            ]
        );
    }



}
