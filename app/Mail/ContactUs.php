<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

use Inertia\Inertia;

class ContactUs extends Mailable
{
    use Queueable, SerializesModels;


    /**
     * Create a new message instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('nutrisafary.tuy@gmail.com', 'Nutrisafari Contact'),
            replyTo: [new Address($this->data['from'], $this->data['name'])],
            subject: ($this->data['subject'] ?? 'Contact Us'),
        );
    }


    /**
     * Get the message content definition.
     */
        public function content(): Content
        {
            return new Content(
                view: 'MailView',
                with: [
                    'name' => $this->data['name'],
                    'from' => $this->data['from'],
                    'phone' => $this->data['phone'] ,
                    'subject' => $this->data['subject'],
                    'content' => (string) $this->data['message'],  // Ensure string type
                ],
            );
        }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
