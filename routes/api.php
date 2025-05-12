<?php

use App\Http\Controllers\API\Parent\AnnouncementController;
use App\Http\Controllers\API\Parent\BlogController;
use App\Http\Controllers\API\Parent\ChildrenController;
use App\Http\Controllers\API\Parent\ForumController;
use App\Http\Controllers\API\Parent\LoginController;
use App\Http\Controllers\API\Parent\PostController;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/parent/login', LoginController::class);

Route::group(['middleware' => 'auth:sanctum', 'prefix' => '/parent'], function () {
    Route::get('/children', ChildrenController::class);
    Route::get('/announcements', AnnouncementController::class);
    Route::get('/forum', [ForumController::class, 'index']);
    Route::post('/forum', [ForumController::class, 'store']);
    Route::post('/forum/{id}/post', PostController::class);
    Route::get('/nutrition_plans', \App\Http\Controllers\API\Parent\NutritionController::class);

    Route::get('/blog', action: [BlogController::class, 'index']);
    Route::post('/blog', action: [BlogController::class, 'store']);
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

