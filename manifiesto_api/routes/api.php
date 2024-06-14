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


Route::controller(ControlPackage::class)->group(function () {
    Route::post('/insert_manifest', 'store_manifest');
    Route::post('/insert_package', 'store');
    Route::get('/manifiesto', 'index');
});