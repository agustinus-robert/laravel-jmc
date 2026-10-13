<?php

use Illuminate\Support\Facades\Route;
use Modules\Transaction\Controllers\IncomingController;

Route::middleware('web')
    ->prefix('transaction')
    ->as('transaction.')
    ->group(function () {
        Route::resource('incoming', IncomingController::class);
    });