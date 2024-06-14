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
use Illuminate\Support\Facades\Validator;

class ControlPackage extends Controller
{
    public function index(){
        $packages = Package::join('clients as shipper', 'packages.shipper', '=', 'shipper.name')
                            ->join('clients as consing', 'packages.consing', '=', 'consing.name')
                            ->join('addresses as add_ship', 'shipper.id_address', '=', 'add_ship.id')
                            ->join('addresses as add_consg', 'consing.id_address', '=', 'add_consg.id')
                            ->select(
                                'packages.bag as Bulto', 
                                'packages.hawb as Codigo',
                                'packages.weight_kg as Peso(kg)', 
                                'packages.weight_lb as Peso(lb)',
                                'packages.type_bag as Tipo',
                                'packages.description_spanish as Contenido(Español)',
                                'packages.description_english as Contenido(Ingles)',
                                'packages.shipper as Envia',
                                'add_ship.address as Direccion_Envia',
                                'add_ship.city as Ciudad_Envia',
                                'packages.consing as Recibe',
                                'consing.telephone as Telefono_Recibe',
                                'add_consg.address as Direccion_Recibe',
                                'add_consg.city as Ciudad_Recibe',
                                'packages.atendend as Atendido',
                                'packages.custom_value as Costo'
                                )
                            ->get();
        return $packages;
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hawb' => 'required|unique:packages,hawb',
            'tel_consg' => 'required|string|size:10|unique:clients,telephone',
            'consing' => 'required|unique:packages,consing',
        ], [
            'hawb.unique' => 'El número de hawb ya está registrado.',
            'tel_consg.required' => 'El número de teléfono es obligatorio.',
            'tel_consg.string' => 'El número de teléfono debe ser una cadena de texto.',
            'tel_consg.size' => 'El número de teléfono debe tener exactamente 10 caracteres.',
            'tel_consg.unique' => 'El número de teléfono ya está registrado.',
            'consing.unique' => 'El consignatario ya está registrado.',
        ]);

        //Validar errores
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
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
            $shipper = Clients::where('name', $request->shipper)->first();
            if (!$shipper) {
                // Crear cliente shipper solo si no existe
                $shipper = new Clients();
                $shipper->name = $request->shipper;
                $shipper->type = 'SHIPPER';
                $shipper->telephone = $request->tel_ship;
                $shipper->id_address = $request->id_ship;
                $shipper->save();
            }
            $package->shipper = $shipper->name;
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
        }catch (\Exception $e) {
            // Capturar cualquier excepción no esperada
            return response()->json(['error' => 'Ha ocurrido un error al procesar la solicitud'], 500);
        }
    }

    public function store_manifest(Request $request){
        $manifest = new Manifest();
        $manifest -> code = $request -> code;
        $manifest-> save();
    }
}
