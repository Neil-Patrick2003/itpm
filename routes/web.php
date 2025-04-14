<?php

use App\Http\Controllers\Admin\DonationController;
use App\Http\Controllers\Admin\ProgramBeneficiariesController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\SponsorController;
use App\Http\Controllers\Admin\UserController;
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

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('dashboard');

    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);


    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/programs/create', [ProgramController::class, 'create']);
    Route::post('/programs/create', [ProgramController::class, 'store']);
    Route::get('/programs/{program}', [ProgramController::class, 'show']);
    Route::get('/programs/{program}/add_beneficiaries',  [ProgramBeneficiariesController::class, 'create']);
    Route::post('/programs/{program}/add_beneficiaries',  [ProgramBeneficiariesController::class, 'store']);



    Route::get('/childrens', [\App\Http\Controllers\ChildrenController::class, 'index']);
    Route::get('/childrens/create', [\App\Http\Controllers\Admin\ChildrenRecordController::class, 'create']);
    Route::post('/childrens/create', [\App\Http\Controllers\Admin\ChildrenRecordController::class, 'store']);



    Route::get('/sponsorships', [SponsorController::class, 'index']);
    Route::post('/sponsorships/create', [SponsorController::class, 'store']);
    Route::get('/sponsorships/{sponsor}', [SponsorController::class, 'show']);
    Route::get('/sponsorships/{sponsor}/donation', [DonationController::class, 'create']);
    Route::post('/sponsorships/{sponsor}/donation', [DonationController::class, 'store']);



    Route::get('/childrens/beneficiary', [ProgramBeneficiariesController::class, 'index']);
    Route::get('/childrens/profile', [\App\Http\Controllers\ChildrenController::class, 'show']);
    Route::get('/childrens/profile/{id}', [\App\Http\Controllers\ChildrenController::class, 'showProfile']);




    Route::get('/reports', fn () => Inertia::render('Admin/Report'));
    Route::get('/funds', fn () => Inertia::render('Admin/Funds'));
});

Route::middleware(['auth', 'verified'])->group(function () {
//    health worker
    Route::get('/health_workers/dashboard',  [\App\Http\Controllers\HealthWorkerController::class, 'index'])->name('health-workers.dashboard');
    Route::get('/health_workers/records',  [\App\Http\Controllers\RecordController::class, 'index'])->name('records');
    Route::get('/health_workers/records/create',  [\App\Http\Controllers\RecordController::class, 'create']);
    Route::post('/health_workers/records/create',  [\App\Http\Controllers\RecordController::class, 'store']);
    Route::get('/health_workers/records/{record}',  [\App\Http\Controllers\RecordController::class, 'edit']);
    Route::post('/health_workers/records/{record}',  [\App\Http\Controllers\RecordController::class, 'update']);
    Route::delete('/health_workers/records/{record}',  [\App\Http\Controllers\RecordController::class, 'destroy']);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
