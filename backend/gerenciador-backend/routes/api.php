<?php

use App\Http\Controllers\Api\SuggestionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TransactionController;

Route::apiResource('transactions', TransactionController::class);
Route::prefix('suggestions')->name('suggestions.')->group(function () {

    Route::post('/', [SuggestionController::class, 'suggest'])
        ->name('generate');

    Route::post('/analyze', [SuggestionController::class, 'suggest'])
        ->name('analyze');

    Route::post('/financial-tips', [SuggestionController::class, 'suggest'])
        ->name('tips');
});

Route::middleware(['throttle:10,1'])->prefix('ai')->name('ai.')->group(function () {

    Route::post('/suggestions', [SuggestionController::class, 'suggest'])
        ->name('suggestions');

    Route::post('/financial-analysis', [SuggestionController::class, 'suggest'])
        ->name('analysis');

    Route::post('/advisor', [SuggestionController::class, 'suggest'])
        ->name('advisor');
});

