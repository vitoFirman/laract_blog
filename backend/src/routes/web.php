<?php

use Illuminate\Support\Facades\Route;

include 'auth.php';
include 'users.php';
include 'profile.php';

Route::get('/', function () {
    return view('welcome');
});
