<?php

use App\Http\Controllers\API\Parent\AnnouncementController;
use App\Http\Controllers\API\Parent\ChildrenController;
use App\Http\Controllers\API\Parent\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/parent/login', LoginController::class);

Route::group(['middleware' => 'auth:sanctum', 'prefix' => '/parent'], function () {
    Route::get('/children', ChildrenController::class);
    Route::get('/announcements', AnnouncementController::class);
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

