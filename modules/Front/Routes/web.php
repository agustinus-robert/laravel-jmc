<?php

use Illuminate\Support\Facades\Route;

Route::middleware('web')
    ->prefix('front')
    ->as('front.')
    ->group(function () {});
