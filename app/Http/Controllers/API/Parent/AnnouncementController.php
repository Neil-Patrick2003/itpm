<?php

namespace App\Http\Controllers\API\Parent;

use App\Http\Controllers\Controller;
use App\Models\Announcement;

class AnnouncementController extends Controller
{
    public function __invoke()
    {
        $announcements = Announcement::get();

        return [
            'data' => $announcements
        ];
    }
}
