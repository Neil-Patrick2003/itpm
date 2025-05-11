<?php

use App\Http\Controllers\API\Parent\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/parent/login', LoginController::class);
//Route::get('/parent/login', LoginController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

