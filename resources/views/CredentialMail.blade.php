<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: white;
            max-width: 600px;
            margin: 30px auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            margin-top: 20px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
        }
        .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Welcome, {{ $parent_name }}!</h1>
    <p>Thank you for registering your child <strong>{{ $child_name }}</strong> in the <strong>{{ $program_name }}</strong> program.</p>

    <p>You can now log in using the email address: <strong>{{ $parent_email }}</strong></p>
    <p><strong>Your default password is the phone number you used during registration.</strong></p>

    <p>If you want to change your password, click the button below:</p>

    <a href="{{ url('/forgot-password') }}" class="button">Reset Your Password</a>

    <p class="footer">If you did not register or received this email by mistake, please ignore it.</p>
</div>
</body>
</html>
