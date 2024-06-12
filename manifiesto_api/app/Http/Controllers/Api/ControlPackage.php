<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\Clients;
use App\Models\From;
use App\Models\Manifest;
use App\Models\Package;



class ControlPackage extends Controller
{
    public function store(Request $request)
    {
        $package = new Package();
        $package -> hawb = $request-> hawb ;

    }

    public function store_manifest(Request $request){
        $manifest = new Manifest();
        $manifest -> code = $request -> code;
        $manifest-> save();
    }
}
