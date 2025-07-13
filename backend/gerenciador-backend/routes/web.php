<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TransactionController;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('transactions', TransactionController::class);
