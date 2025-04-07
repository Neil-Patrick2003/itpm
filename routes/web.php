<?php

use App\Http\Controllers\Admin\DonationController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\SponsorController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RoleMiddleware;
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

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard', [
        'user' => auth()->user(),
    ]))->name('dashboard');
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users');
    Route::get('/programs', [ProgramController::class, 'index'])->name('programs');
    Route::get('/programs/create', [ProgramController::class, 'create'])->name('programs');
    Route::post('/programs/create', [ProgramController::class, 'store'])->name('programs');
    Route::get('/programs/{id}', [ProgramController::class, 'show'])->name('programs');
    Route::get('/childrens', [\App\Http\Controllers\ChildrenController::class, 'index'])->name('children');
    Route::get('/childrens/create', [\App\Http\Controllers\ChildrenRecordController::class, 'create'])->name('children');
    Route::post('/childrens/create', [\App\Http\Controllers\ChildrenRecordController::class, 'store'])->name('children');
    Route::get('/sponsorships', [SponsorController::class, 'index'])->name('sponsors');
    Route::post('/sponsorships/create', [SponsorController::class, 'store'])->name('sponsors');
    Route::get('/sponsorships/{sponsor}', [SponsorController::class, 'show'])->name('sponsors');
    Route::get('/sponsorships/{sponsor}/donation', [DonationController::class, 'create'])->name('donations');
    Route::post('/sponsorships/{sponsor}/donation', [DonationController::class, 'store'])->name('donations');
    Route::get('/reports', fn () => Inertia::render('Admin/Report'))->name('reports');
    Route::get('/funds', fn () => Inertia::render('Admin/Funds'))->name('funds');
});

Route::middleware(['auth', 'verified'])->group(function () {
//    health worker
    Route::get('/health_workers/dashboard',  [\App\Http\Controllers\HealthWorkerController::class, 'index'])->name('health-workers.dashboard');
    Route::get('/health_workers/records',  [\App\Http\Controllers\RecordController::class, 'index'])->name('records');
    Route::get('/health_workers/records/create',  [\App\Http\Controllers\RecordController::class, 'create'])->name('health-workers.records.create');
    Route::post('/health_workers/records/create',  [\App\Http\Controllers\RecordController::class, 'store'])->name('health-workers.records.create');
    Route::get('/health_workers/records/{record}',  [\App\Http\Controllers\RecordController::class, 'edit'])->name('health-workers.records.create');
    Route::post('/health_workers/records/{record}',  [\App\Http\Controllers\RecordController::class, 'update'])->name('health-workers.records.create');
    Route::delete('/health_workers/records/{record}',  [\App\Http\Controllers\RecordController::class, 'destroy'])->name('health-workers.records.create');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
