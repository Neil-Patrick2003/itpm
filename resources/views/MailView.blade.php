<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Simple Email</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
<div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 0 auto;">
    <h2 style="font-size: 24px; color: #4CAF50; text-align: center;">New Contact Form Message</h2>

    @if(isset($name))
        <p style="font-size: 18px; font-weight: bold;">Name: <span style="font-weight: normal; color: #555;">{{ $name }}</span></p>
    @endif

    @if(isset($from))
        <p style="font-size: 18px; font-weight: bold;">Email: <span style="font-weight: normal; color: #555;">{{ $from }}</span></p>
    @endif

    @if(isset($subject))
        <p style="font-size: 18px; font-weight: bold;">Subject: <span style="font-weight: normal; color: #555;">{{ $subject }}</span></p>
    @endif

    @if(isset($phone))
        <p style="font-size: 18px; font-weight: bold;">Phone: <span style="font-weight: normal; color: #555;">{{ $phone }}</span></p>
    @endif

    @if(isset($content))
        <p style="font-size: 18px; font-weight: bold;">Message:</p>
        <p style="font-size: 16px; color: #555;">{!! nl2br(e($content)) !!}</p>
    @endif

    <p style="font-size: 14px; text-align: center; color: #888;">This is an automated message sent from your contact form.</p>
</div>
</body>
</html>
