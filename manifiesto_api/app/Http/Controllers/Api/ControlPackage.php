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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

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

    public function update(Request $request, string $codigo)
    {
        // Validate the input data
        $validator = Validator::make($request->all(), [
            'telefono_recibe' => 'required|string|size:10|unique:clients,telephone',
        ], [
            'telefono_recibe.required' => 'El número de teléfono es obligatorio.',
            'telefono_recibe.string' => 'El número de teléfono debe ser una cadena de texto.',
            'telefono_recibe.size' => 'El número de teléfono debe tener exactamente 10 caracteres.',
        ]);

        // Validate errors
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            // Debugging statement to log the 'hawb' value
            Log::info('Updating package with hawb: ' . $codigo);

            // Find the package by 'hawb'
            $package = Package::where('hawb', $codigo)->firstOrFail();

            // Debugging statement to log the found package
            Log::info('Package found: ', $package->toArray());

            // Update package details
            $package->weight_lb = $request->input('peso(lb)');
            $package->weight_kg = 0.453592 * $request->input('peso(lb)');
            $package->description_spanish = $request->input('contenido');

            // Make an HTTP request to translate the description
            $response = Http::post('http://127.0.0.1:3000/traductor', [
                'text' => $request->input('contenido'),
                'from_code' => 'es',
                'to_code' => 'en',
            ]);

            if ($response->successful()) {
                $responseData = $response->json();
                $package->description_english = $responseData['translated_text'];
            } else {
                $package->description_english = 'not found translate';
            }

            // Handle shipper information
            $shipper = Clients::where('name', $request->input('envia'))->first();
            if (!$shipper) {
                $shipper = new Clients();
                $shipper->name = $request->input('envia');
                $shipper->type = 'SHIPPER';
                $shipper->telephone = '';
                $shipper->id_address = $request->input('direccion_envia');
                $shipper->save();
            }
            $package->shipper = $shipper->name;

            // Handle consing information
            $consing = Clients::where('name', $request->input('recibe'))->first();
            if (!$consing) {
                $consing = new Clients();
                $consing->name = $request->input('recibe');
                $consing->type = 'CONSIGN';
                $consing->telephone = $request->input('telefono_recibe');
                $consing->id_address = $request->input('direccion_recibe');
                $consing->save();
            }
            $package->consing = $consing->name;

            // Calculate custom value
            $libras = $request->input('peso(lb)');
            $valorBulto = 6;
            while ($libras >= 10) {
                $valorBulto += 1;
                $libras -= 10;
            }
            $package->custom_value = $valorBulto;

            // Update other package details
            $package->type_bag = $request->input('tipo');
            $package->atendend = $request->input('atendido_por');
            $package->bag = $request->input('bulto');

            // Save the updated package
            $package->save();

            Log::info('Package updated successfully: ', $package->toArray());

            return response()->json(['message' => 'Package updated successfully', 'package' => $package], 200);
        } catch (\Exception $e) {
            Log::error('Error updating package: ' . $e->getMessage());
            return response()->json(['error' => 'No se encontró el paquete'], 500);
        }
    }
    

    public function show(string $hawb)
    {
        try{
            $package = Package::where('hawb', $hawb)
                                ->join('clients as consing', 'packages.consing', '=', 'consing.name')
                                ->join('clients as shipper', 'packages.shipper', '=', 'shipper.name')
                                ->select(
                                    'packages.hawb as codigo',
                                    'packages.bag as bulto',
                                    'packages.shipper as envia',
                                    'shipper.id_address as direccion_envia',
                                    'packages.consing as recibe',
                                    'consing.telephone as telefono_recibe',
                                    'consing.id_address as direccion_recibe',
                                    'packages.description_spanish as contenido',
                                    'packages.weight_lb as peso(lb)',
                                    'packages.type_bag as tipo',
                                    'packages.atendend as atendido_por'
                                )
                                ->get();
            return $package;
        }catch (\Exception $e){
            return response()->json(['error' => 'No se encontro el paquete'], 500);            
        }
    }

    public function destroy(string $hawb)
    {
        $product = Package::destroy($hawb);        
        return $product;
    }

    public function printall () {
        $packages = Package::join('clients as shipper', 'packages.shipper', '=', 'shipper.name')
                            ->join('clients as consing', 'packages.consing', '=', 'consing.name')
                            ->join('addresses as add_ship', 'shipper.id_address', '=', 'add_ship.id')
                            ->join('addresses as add_consg', 'consing.id_address', '=', 'add_consg.id')
                            ->join('froms as ship_from', 'add_ship.id_from', '=', 'ship_from.id')
                            ->join('froms as cosg_from', 'add_consg.id_from', '=', 'cosg_from.id')
                            ->join('manifests', 'manifests.code', '=', 'packages.manifest')
                            ->select(
                                'packages.shipper as envia',
                                'packages.bag as bulto',
                                'add_ship.address as direccion_envia',
                                DB::raw("CONCAT(add_ship.city, ' - ', ship_from.completename) as ciudad_envia"),
                                'packages.consing as recibe',
                                'add_consg.address as direccion_recibe',
                                'add_consg.city as ciudad_recibe',
                                'cosg_from.region_state as region',
                                'add_consg.postal_code as codigo_postal',
                                'consing.telephone as telefono_recibe',
                                DB::raw("DATE_FORMAT(manifests.date, '%d/%m/%Y') as fecha_manifesto"),
                                DB::raw("CONCAT(packages.pieces, 'PAQ') as descripcion"),
                                'packages.description_spanish as contenido',
                                'packages.weight_lb as peso',
                                'packages.hawb as codigo',
                                'packages.type_bag as tipo',
                                'packages.atendend as atendido',
                                )
                            ->get();
        return $packages;        
    }

    public function printlist (Request $request) {
        $validatedData = $request->validate([
            'hawb_codes' => 'required|array',
            'hawb_codes.*' => 'required|string|distinct', // Ensure all hawb codes are unique strings
        ]);
        $hawbCodes = $validatedData['hawb_codes'];
        $packages = Package::join('clients as shipper', 'packages.shipper', '=', 'shipper.name')
                            ->join('clients as consing', 'packages.consing', '=', 'consing.name')
                            ->join('addresses as add_ship', 'shipper.id_address', '=', 'add_ship.id')
                            ->join('addresses as add_consg', 'consing.id_address', '=', 'add_consg.id')
                            ->join('froms as ship_from', 'add_ship.id_from', '=', 'ship_from.id')
                            ->join('froms as cosg_from', 'add_consg.id_from', '=', 'cosg_from.id')
                            ->join('manifests', 'manifests.code', '=', 'packages.manifest')
                            ->whereIn('packages.hawb', $hawbCodes)
                            ->select(
                                'packages.shipper as envia',
                                'packages.bag as bulto',
                                'add_ship.address as direccion_envia',
                                DB::raw("CONCAT(add_ship.city, ' - ', ship_from.completename) as ciudad_envia"),
                                'packages.consing as recibe',
                                'add_consg.address as direccion_recibe',
                                'add_consg.city as ciudad_recibe',
                                'cosg_from.region_state as region',
                                'add_consg.postal_code as codigo_postal',
                                'consing.telephone as telefono_recibe',
                                DB::raw("DATE_FORMAT(manifests.date, '%d/%m/%Y') as fecha_manifesto"),
                                DB::raw("CONCAT(packages.pieces, 'PAQ') as descripcion"),
                                'packages.description_spanish as contenido',
                                'packages.weight_lb as peso',
                                'packages.hawb as codigo',
                                'packages.type_bag as tipo',
                                'packages.atendend as atendido',
                            )
                            ->get();

        return response()->json(['packages' => $packages]);
    }
    
    public function printone(string $hawb)
    {
        try {
            $package = Package::where('hawb', $hawb)
                                ->join('clients as shipper', 'packages.shipper', '=', 'shipper.name')
                                ->join('addresses as add_ship', 'shipper.id_address', '=', 'add_ship.id')
                                ->join('froms as ship_from', 'add_ship.id_from', '=', 'ship_from.id')
                                ->join('clients as consing', 'packages.consing', '=', 'consing.name')
                                ->join('addresses as add_consg', 'consing.id_address', '=', 'add_consg.id')
                                ->join('froms as cosg_from', 'add_consg.id_from', '=', 'cosg_from.id')
                                ->join('manifests', 'manifests.code', '=', 'packages.manifest')
                
                ->select(
                    'packages.shipper as envia',
                    'packages.bag as bulto',
                    'add_ship.address as direccion_envia',
                    DB::raw("CONCAT(add_ship.city, ' - ',ship_from.completename) as ciudad_envia"),
                    'packages.consing as recibe',
                    'add_consg.address as direccion_recibe',
                    'add_consg.city as ciudad_recibe',
                    'cosg_from.region_state as region',
                    'add_consg.postal_code as codigo_postal',
                    'consing.telephone as telefono_recibe',
                    DB::raw("DATE_FORMAT(manifests.date, '%d/%m/%Y') as fecha_manifesto"),
                    DB::raw("CONCAT(packages.pieces, 'PAQ') as descripcion"),
                    'packages.description_spanish as contenido',
                    'packages.weight_lb as peso',
                    'packages.hawb as codigo',
                    'packages.type_bag as tipo',
                    'packages.atendend as atendido',
                )
                ->firstOrFail(); 
    
            return $package;
        } catch (\Exception $e) {
            Log::error('Error fetching package: ' . $e->getMessage());
            return response()->json(['error' => 'No se encontró el paquete'], 500);
        }
    }
}