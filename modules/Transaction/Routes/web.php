<?php

use Illuminate\Support\Facades\Route;
use Modules\Transaction\Controllers\IncomingController;

Route::middleware('web')
    ->prefix('transaction')
    ->as('transaction.')
    ->group(function () {
         Route::get('incoming/export', [IncomingController::class, 'export'])
            ->name('incoming.export');
            
        Route::resource('incoming', IncomingController::class);
    });