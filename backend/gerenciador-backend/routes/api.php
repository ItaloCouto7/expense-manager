<?php

use App\Http\Controllers\Api\SuggestionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TransactionController;

Route::apiResource('transactions', TransactionController::class);
Route::post('/suggestions', [SuggestionController::class, 'suggest']);

