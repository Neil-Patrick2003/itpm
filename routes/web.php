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

    $today = \Carbon\Carbon::today();

    $programCount = \App\Models\Program::whereRaw("DATE_ADD(start_date, INTERVAL duration DAY) >= ?", [$today])->count();

    $totalBeneficiaries = \App\Models\ChildrenRecord::all()->count();

    $topSponsors = \App\Models\Sponsor::withCount('donations')->orderBy('donations_count', 'desc')->take(3)->get();

    $programs = \App\Models\Program::latest()->take(3)->get();




    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'programCount' => $programCount,
        'totalBeneficiaries' => $totalBeneficiaries,
        'topSponsors' => $topSponsors,
        'programs' => $programs,

    ]);
});

Route::get('/download/app', function () {
    return Response::download(public_path('downloads/nutrisafary.apk'), 'nutrisafary.apk');
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
    Route::post('/childrens/create', [\App\Http\Controllers\Admin\ChildrenRecordController::class, 'Store_child_record']);


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

    Route::get('/reports/export', [\App\Http\Controllers\Admin\ReportController::class, 'generatePdf'])->name('reports.export');
    Route::get('/reports/nutrition', [\App\Http\Controllers\Admin\ReportController::class, 'nutritionReport'])->name('reports.nutrition_report');




});

Route::middleware(['auth', 'role:parent'])->group(function () {
    Route::get('/parent/home', [\App\Http\Controllers\Parent\HomeController::class, 'index'])->name('parent.home');
    Route::get('/parent/announcement/{announcement}', [\App\Http\Controllers\Parent\HomeController::class, 'show'])->name('parent.announcement');
    Route::get('/parent/children', [\App\Http\Controllers\Parent\ChildrenController::class, 'index'])->name('parent.children');

    Route::get('/parent/forum/blogs', [\App\Http\Controllers\Parent\BlogController::class, 'index'])->name('parent.forum.blogs');
    Route::get('/parent/forum/blogs/create', [\App\Http\Controllers\Parent\BlogController::class, 'create'])->name('parent.forum.blogs.create');
    Route::get('/parent/forum/blogs/{blog}', [\App\Http\Controllers\Parent\BlogController::class, 'show'])->name('parent.forum.blogs.show');
    Route::post('/parent/forum/blogs', [\App\Http\Controllers\Parent\BlogController::class, 'store'])->name('parent.forum.blogs.store');
    Route::get('/parent/forum/topics', [\App\Http\Controllers\Parent\ForumController::class, 'index'])->name('parent.forum.topics');
    Route::get('/parent/forum/topics/create', [\App\Http\Controllers\Parent\ForumController::class, 'create'])->name('parent.forum.topics.create');
    Route::post('/parent/forum', [\App\Http\Controllers\Parent\ForumController::class, 'store'])->name('parent.forum.topic.store');
    Route::get('/parent/forum/{topic}', [\App\Http\Controllers\Parent\ForumController::class, 'show'])->name('parent.forum.topic');
    Route::post('/parent/forum/{topic}/posts', [\App\Http\Controllers\Parent\PostController::class, 'store'])->name('parent.forum.posts.store');


});

Route::middleware(['auth', 'verified', 'role:health_worker'])->group(function () {
//    health worker
    Route::get('/health_workers/dashboard',  [\App\Http\Controllers\HealthWorkerController::class, 'index'])->name('health-workers.dashboard');

    Route::get('/health_workers/records',  [\App\Http\Controllers\HealthWorker\ProgramController::class, 'index'])->name('records');
    Route::get('/health_workers/records/{id}',  [\App\Http\Controllers\HealthWorker\ProgramController::class, 'show'])->name('records');

    //store record per program
    Route::post('/health_workers/records/{id}/add_record', [\App\Http\Controllers\HealthWorker\ProgramController::class, 'store'])->name('records');
    //create record per program
    Route::get('/health_workers/records/{id}/add_record',  [\App\Http\Controllers\HealthWorker\ProgramController::class, 'create'])->name('records');

    Route::post('/health_workers/records/{program_id}/add_record/{children_id}',  [\App\Http\Controllers\HealthWorker\ChildrenRecordController::class, 'store'])->name('records');

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

    Route::get('/health_workers/nutrition', [\App\Http\Controllers\MealPlanController::class, 'index']);
    Route::post('/health_workers/nutrition', [\App\Http\Controllers\MealPlanController::class, 'store']);







    Route::get('/health_workers/forum/create_post', [\App\Http\Controllers\HealthWorker\PostController::class, 'create']);;



});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
