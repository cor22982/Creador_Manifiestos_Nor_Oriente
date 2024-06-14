<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\Clients;
use App\Models\From;
use App\Models\Manifest;
use App\Models\Package;
use Illuminate\Support\Facades\Http;


class ControlPackage extends Controller
{
    public function store(Request $request)
    {
        $package = new Package();
        $package->hawb = $request->hawb;
        $package->manifest = $request->manifest;
        $package->weight_lb = $request->weight_lb;
        $package->weight_kg = 0.0;
        $package->description_spanish = $request->description_spanish;

        $response = Http::post('http://127.0.0.1:3000/traductor', [
            'text' => $request->description_spanish,
            'from_code' => 'es',
            'to_code' => 'en',
        ]);

        if ($response->successful()) {
            // Accede al texto traducido en la respuesta JSON
            $responseData = $response->json();
            $package->description_english = $responseData['translated_text'];
        } else {
            $package->description_english = 'not found translate';
        }

        //shipper
        $shipper = new Clients();
        $shipper->name = $request->shipper;
        $shipper->type = 'SHIPPER';
        $shipper->telephone = $request->tel_ship;
        $shipper->id_address = $request->id_ship;
        $shipper->save();
        $package->shipper = $request->shipper;
        //consing
        $consing = new Clients();
        $consing->name = $request->consing;
        $consing->type = 'CONSIGN';
        $consing->telephone = $request->tel_consg;
        $consing->id_address = $request->id_consing;
        $consing->save();
        $package->consing = $request->consing;
        //calculos
        $libras = $request->weight_lb;
        $valorBulto = 6;
        while ($libras >= 10) {
            $valorBulto += 1;
            $libras -= 10;
        }
        $package->custom_value = $valorBulto;
        $package->type_bag = $request->type_bag;
        $package->atendend = $request->atendend;
        $package->bag = $request->bag;
        $package->save();
    }

    public function store_manifest(Request $request){
        $manifest = new Manifest();
        $manifest -> code = $request -> code;
        $manifest-> save();
    }
}
