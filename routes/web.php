<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use Inertia\Inertia;

Route::get('/', [TicketController::class, 'support'])->name('support');
Route::put('/tickets/{ticketId}/status', [TicketController::class, 'updateStatus']);
Route::get('/test',function (){
    return Inertia::render('test');
});
// Route::post('/dynamicoptions', [TicketController::class, 'storeDynamicOption']);
