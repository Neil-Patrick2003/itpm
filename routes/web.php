<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DonationController;
use App\Http\Controllers\Admin\ProgramBeneficiariesController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\SponsorController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use App\Mail\ContactUs;
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

Route::post('/send-message', [\App\Http\Controllers\Email\EmailController::class, 'sendContactEmail'])->name('email.store');;


Route::get('/email-1', function () {
    $name = 'Sanjay';
    $from = 'neilpatrick.personal@gmail.com';

    \Illuminate\Support\Facades\Mail::to('nutrisafary.tuy@gmail.com')->send(new ContactUs(['name' => $name, 'from' => $from]));

    dd('Email Sent');
}
);



Route::middleware(['auth', 'verified', 'role:Admin'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('dashboard');

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);


    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/programs/create', [ProgramController::class, 'create']);
    Route::post('/programs/create', [ProgramController::class, 'store']);
    Route::get('/programs/{program}', [ProgramController::class, 'show']);
    Route::delete('/admin/beneficiaries/{id}', [ProgramController::class, 'destroy']);

    Route::get('/programs/{program}/add_beneficiaries',  [ProgramBeneficiariesController::class, 'create']);
    Route::post('/programs/{program}/add_beneficiaries',  [ProgramBeneficiariesController::class, 'store']);



    Route::get('/childrens', [\App\Http\Controllers\ChildrenController::class, 'index']);
    Route::get('/childrens/create', [\App\Http\Controllers\Admin\ChildrenRecordController::class, 'create']);
    Route::post('/childrens/create', [\App\Http\Controllers\Admin\ChildrenRecordController::class, 'store']);



    Route::get('/sponsorships', [SponsorController::class, 'index']);
    Route::get('/sponsorships/create', [SponsorController::class, 'create']);
    Route::post('/sponsorships/create', [SponsorController::class, 'store']);
    Route::get('/sponsorships/{id}', [SponsorController::class, 'show']);
    Route::get('/sponsorships/{id}/donation', [DonationController::class, 'create']);
    Route::post('/sponsorships/{sponsor}/donation', [DonationController::class, 'store']);



    Route::get('/childrens/beneficiary', [ProgramBeneficiariesController::class, 'index']);

    Route::get('/childrens/profile', [\App\Http\Controllers\ChildrenController::class, 'show']);
    Route::get('/childrens/profile/{id}', [\App\Http\Controllers\ChildrenController::class, 'showProfile']);

    Route::get('/announcements',[\App\Http\Controllers\Admin\AnnouncementController::class, 'index']);
    Route::post('/announcements',[\App\Http\Controllers\Admin\AnnouncementController::class, 'store']);





    Route::get('/reports',  [ AdminController::class, 'analytics' ]);
    Route::get('/funds', [\App\Http\Controllers\ExpensesController::class, 'index']);
    Route::post('/funds', [\App\Http\Controllers\ExpensesController::class, 'store']);
    Route::patch('/funds/{id}', [\App\Http\Controllers\ExpensesController::class, 'update']);;


});

Route::middleware(['auth', 'verified', 'role:health_worker'])->group(function () {
//    health worker
    Route::get('/health_workers/dashboard',  [\App\Http\Controllers\HealthWorkerController::class, 'index'])->name('health-workers.dashboard');

    Route::get('/health_workers/records',  [\App\Http\Controllers\HealthWorker\ProgramController::class, 'index'])->name('records');
    Route::get('/health_workers/records/{id}',  [\App\Http\Controllers\HealthWorker\ProgramController::class, 'show'])->name('records');
    Route::post('/health_workers/records/{id}',  [\App\Http\Controllers\Admin\ChildrenRecordController::class, 'store'])->name('records');

    Route::get('/health_workers/records/{id}/add_record',  [\App\Http\Controllers\HealthWorker\ProgramController::class, 'create'])->name('records');
    Route::post('/health_workers/records/{id}/add_record',  [\App\Http\Controllers\HealthWorker\ProgramController::class, 'store'])->name('records');

    Route::get('/health_workers/records/general/create', [\App\Http\Controllers\HealthWorker\RecordController::class, 'index'])  ;

    Route::get('/health_workers/records/general/new_record',  [\App\Http\Controllers\HealthWorker\RecordController::class, 'create']);
    Route::post('/health_workers/records/general/new_record',  [\App\Http\Controllers\HealthWorker\RecordController::class, 'store']);;
    Route::get('/health_workers/records/{record}',  [\App\Http\Controllers\HealthWorker\RecordController::class, 'edit']);
    Route::post('/health_workers/records/{record}',  [\App\Http\Controllers\HealthWorker\RecordController::class, 'update']);
    Route::delete('/health_workers/records/{record}',  [\App\Http\Controllers\HealthWorker\RecordController::class, 'destroy']);


    Route::get('/health_workers/beneficiary ', [\App\Http\Controllers\HealthWorker\ProgramBeneficiaryController::class, 'index']);
    Route::get('/health_workers/beneficiary/{id} ', [\App\Http\Controllers\HealthWorker\ProgramBeneficiaryController::class, 'show']);
    Route::post('/health_workers/beneficiary/{id} ', [\App\Http\Controllers\HealthWorker\ChildrenRecordController::class, 'store']);


    Route::get('/health_workers/forum', [\App\Http\Controllers\TopicController::class, 'index']);
    Route::post('/health_workers/forum', [\App\Http\Controllers\TopicController::class, 'store']);
    Route::get('/health_workers/forum/{topic_id}', [\App\Http\Controllers\TopicController::class, 'show']);
    Route::post('/health_workers/forum/{topic_id}', [\App\Http\Controllers\HealthWorker\PostController::class, 'store']);





    Route::get('/health_workers/forum/create_post', [\App\Http\Controllers\HealthWorker\PostController::class, 'create']);;



});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
