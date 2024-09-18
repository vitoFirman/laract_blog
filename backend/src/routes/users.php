<?php

use App\Http\Controllers\User\MyInfo;
use App\Http\Controllers\User\UpdatePassword;
use Illuminate\Support\Facades\Route;

Route::prefix('api/user')->group(function () {
    Route::get('/info', MyInfo::class)->middleware('auth:sanctum');
    Route::post('/update-password', UpdatePassword::class)->middleware('auth:sanctum');
});
