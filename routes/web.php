<?php

use Illuminate\Support\Facades\Route;
use Modules\Front\Controllers\FrontController;

Route::get('/', [FrontController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
