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
        $package -> hawb = $request-> hawb;
        $package -> manifest = $request-> manifest;
        $package -> weight_lb = $request-> weight_lb;
        $package -> weight_kg = 0.0;
        $package -> description_spanish = $request-> description_spanish;
        $package -> description_english = $request-> description_english;
        $package -> shipper = $request-> shipper;
        $package -> consing = $request-> consing;
        $libras = $package -> weight_lb;
        $valorBulto = 0;
        while ($libras >= 10) {
            $valorBulto += 1;
            $libras -= 10;
        }
        $package -> custom_value = $valorBulto;
        $package -> type_bag = $request-> type_bag;
        $package -> atendend = $request-> atendend;
        $package -> bag = $request-> bag;
        $package-> save();
    }

    public function store_manifest(Request $request){
        $manifest = new Manifest();
        $manifest -> code = $request -> code;
        $manifest-> save();
    }
}
