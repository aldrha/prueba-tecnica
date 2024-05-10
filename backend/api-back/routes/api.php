<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginRegisterController;
use App\Http\Controllers\EmployeeController;

Route::controller(LoginRegisterController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::controller(EmployeeController::class)->group(function () {
    Route::get('/employees/{filter?}', 'index')->name('employees.index');
    Route::get('/employees/{employee}', 'show')->name('employees.show');
    Route::get('/employees/search/{name}', 'search')->name('employees.search');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginRegisterController::class, 'logout']);
 
    Route::controller(EmployeeController::class)->group(function () {
        Route::post('/employees', 'store')->name('employees.store');
        Route::put('/employees/{id}', 'update')->name('employees.update');
        Route::delete('/employees/{employee}', 'destroy')->name('employees.destroy');
    });
});
