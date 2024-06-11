<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;
    protected $fillable = [
        'hawb',
        'manifest',
        'pieces',
        'weight_kg',
        'weight_lb',
        'description_english',
        'description_spanish',
        'shipper',
        'consing',
        'custom_value',
        'type_bag',
        'atendend',
        'bag'
    ];
}
