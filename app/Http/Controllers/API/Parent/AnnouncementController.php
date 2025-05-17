<?php

namespace App\Http\Controllers\API\Parent;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Program;
use Carbon\Carbon;


class AnnouncementController extends Controller
{
    public function __invoke()
    {
        

        $incoming_events = Program::where('start_date', '>', Carbon::now())->get();

        $announcements = Announcement::get();

        return [
            'announcements' => $announcements,
            'incoming_events' => $incoming_events
        ];
    }
}
