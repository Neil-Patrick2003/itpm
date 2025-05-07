<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
    <head>
        <!-- Add this directive to include the PWA meta tags -->
        @if(config('app.env') !== 'local')
            @PwaHead
        @endif
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Nutrisafari') }}</title>

        <!-- Fonts -->
        <link rel="icon" href="{{ asset('images/favicon.png') }}" type="image/png">
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">


        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased w-full">
{{--    <script>--}}
{{--        window.routes = {--}}
{{--            downloadInvoice: "{{ route('reports.export') }}"--}}
{{--        };--}}
{{--    </script>--}}
        @inertia
        @RegisterServiceWorkerScript
    </body>
</html>
