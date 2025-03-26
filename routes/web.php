<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/users', fn() => Inertia::render('Admin/User'))->name('users');
    Route::get('/childrens', fn() => Inertia::render('Admin/Children'))->name('children'); // Fixed typo
    Route::get('/sponsorships', fn() => Inertia::render('Admin/Sponsorship'))->name('sponsors'); // Fixed typo
    Route::get('/reports', fn() => Inertia::render('Admin/Report'))->name('reports');
    Route::get('/funds', fn() => Inertia::render('Admin/Funds'))->name('funds');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
