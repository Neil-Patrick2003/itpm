<?php

namespace App\Http\Controllers\Email;

use App\Http\Controllers\Controller;
use App\Mail\ContactUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class EmailController extends Controller
{
    public function sendContactEmail(Request $request)
    {
        // Validate incoming request
        $data = $request->validate([
            'name' => 'required',
            'subject' => 'required',
            'from' => 'required|email',
            'phone' => 'required',
            'message' => 'required',

        ]);

        // Prepare email data
        $emailData = [
            'name' => $data['name'],
            'subject' => $data['subject'],
            'from' => $data['from'],
            'phone' => $data['phone'],
            'message' => $data['message'],
        ];


        // Optionally, log the email data for debugging
        // Log::debug('Sending email data:', $emailData);

        // Try to send the email
        try {
            Mail::to('nutrisafary.tuy@gmail.com')->send(new ContactUs($emailData));
            return back()->with('message', 'Email sent successfully!');
        } catch (\Exception $e) {
            // Log error if email sending fails
            Log::error('Email sending failed: ' . $e->getMessage());

            return back()->with('error', 'Failed to send email. Please try again later.');
        }
    }
}
