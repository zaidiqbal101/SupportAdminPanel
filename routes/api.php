<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Dynamic options routes
Route::get('/dynamicoptions', [TicketController::class, 'getDynamicOptions']);
Route::post('/dynamicoptions', [TicketController::class, 'storeDynamicOption']);
Route::put('/dynamicoptions/{id}', [TicketController::class, 'updateDynamicOption']);
Route::delete('/dynamicoptions/{id}', [TicketController::class, 'deleteDynamicOption']);
