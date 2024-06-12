<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
class ControllAddress extends Controller
{
    public function guatemalaadd () {
        $addresses = Address::join('froms', 'addresses.id_from', '=', 'froms.id')
                            ->where('froms.country', 'GT') 
                            ->select('addresses.*', 'froms.region_state', 'froms.country')
                            ->get();

        return $addresses;
    }

    public function unitatestateadd(){
        $addresses = Address::join('froms', 'addresses.id_from', '=', 'froms.id')
                            ->where('froms.country', 'USA') 
                            ->select('addresses.*', 'froms.region_state', 'froms.country')
                            ->get();

        return $addresses;
    }
}
