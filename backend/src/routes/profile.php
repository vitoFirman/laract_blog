<?php

use App\Http\Controllers\Profile\MyInfo;
use App\Http\Controllers\Profile\UploadImage;
use Illuminate\Support\Facades\Route;

Route::prefix('api/profile')->group(function () {
    Route::get('/info', MyInfo::class)->middleware('auth:sanctum');
    Route::post('/upload-image', UploadImage::class)->middleware('auth:sanctum');
});
