<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ControlPackage;
use App\Http\Controllers\Api\ControllAddress;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(ControllAddress::class)->group(function () {
    Route::get('/guatemala_address', 'guatemalaadd');
    Route::get('/usa_address', 'unitatestateadd');
});
