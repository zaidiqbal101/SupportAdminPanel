<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;



Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/login', [AuthController::class, 'login'])->name('admin.users.index');

Route::prefix('admin')->group(function () {
    // Route::get('/', function () {
    //     return Inertia::render('Admin/Dashboard');
    // })->name('admin.dashboard');
    Route::get('/support', [TicketController::class, 'support'])->name('support'); 

    Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::get('/register', [UserController::class, 'create'])->name('admin.register');
    Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
});

Route::middleware(['auth', 'role:user'])->prefix('user')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('User/Dashboard');
    })->name('user.dashboard');
});

// Route::get('/', [TicketController::class, 'support'])->name('support'); 
Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    });
Route::put('/tickets/{ticketId}/status', [TicketController::class, 'updateStatus']);
Route::get('/test',function (){
    return Inertia::render('test');
});
// Route::post('/dynamicoptions', [TicketController::class, 'storeDynamicOption']);

    Route::get('/messages/{id}', [App\Http\Controllers\MessageController::class, 'index']);
    Route::post('/messages/{id}', [App\Http\Controllers\MessageController::class, 'store']);
    Route::get('/messages/{message}', [App\Http\Controllers\MessageController::class, 'show']);
    Route::put('/messages/{message}', [App\Http\Controllers\MessageController::class, 'update']);
    Route::patch('/messages/{message}', [App\Http\Controllers\MessageController::class, 'update']);
    Route::patch('/messages/{message}/read', [App\Http\Controllers\MessageController::class, 'markAsRead']);
    Route::delete('/messages/{message}', [App\Http\Controllers\MessageController::class, 'destroy']);


// If you want a dedicated route to display the messages page
Route::middleware('auth')->get('/messages/page', function () {
    return view('messages.index');
});

Route::get('/chat/{id}', function ($id) {
    return Inertia::render('MessageField', [
        'userId' => $id
    ]);
});
