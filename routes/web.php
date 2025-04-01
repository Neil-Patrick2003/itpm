<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\SponsorController;

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProgramController;
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
    Route::get('/dashboard', fn() => Inertia::render('Dashboard', [
        'user' => auth()->user(),
    ]))->name('dashboard');


    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users');


    Route::get('/programs', [ProgramController::class, 'index'])->name('programs');
    Route::post('/programs', [ProgramController::class, 'store'])->name('programs');
    Route::get('/programs/{id}', [ProgramController::class, 'show'])->name('programs');

    Route::get('/childrens', fn() => Inertia::render('Admin/Children'))->name('children'); 


    Route::get('/sponsorships', [SponsorController::class, 'index'])->name('sponsors'); 
    Route::get('/sponsorships/create', [SponsorController::class, 'create'])->name('sponsors'); 
    Route::post('/sponsorships/create', [SponsorController::class, 'store'])->name('sponsors'); 






    Route::get('/reports', fn() => Inertia::render('Admin/Report'))->name('reports');
    Route::get('/funds', fn() => Inertia::render('Admin/Funds'))->name('funds');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
