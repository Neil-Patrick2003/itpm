<?php

namespace App\Jobs;

use App\Mail\Credentials;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendParentCredentials implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 120;

    /**
     * Create a new job instance.
     */
    public function __construct(public User $parent, public string $child_name, public string $program_title)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->parent->email)->send(
            new Credentials($this->parent->name, $this->parent->email, $this->child_name, $this->program_title)
        );
    }
}
