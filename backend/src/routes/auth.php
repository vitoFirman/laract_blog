<?php

use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use App\Http\Controllers\Auth\Register;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::post('/register', Register::class);
    Route::post('/login', Login::class);
    Route::post('/logout', Logout::class)->middleware('auth:sanctum');
});
