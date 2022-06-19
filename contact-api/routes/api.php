<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::post('registration',[UserController::class,'registration']);
Route::post('email-verification',[UserController::class,'emailValidation']);
Route::post('reset-email-verification',[UserController::class,'resetEmailValidation']);
Route::post('login',[UserController::class,'login']);
Route::post('reset-password',[UserController::class,'resetPassword']);
Route::get('logout',[UserController::class,'logout']);

Route::middleware(['UserAuth'])->group(function () {
    Route::get('contacts',[ContactController::class,'getContacts']);
    Route::post('create-contacts',[ContactController::class,'createContacts']);
    Route::post('update-contacts',[ContactController::class,'editContacts']);
    Route::get('delete-contacts/{id}',[ContactController::class,'deleteContacts']);
});
Route::post('test',function(){
	return 'token';
});



