<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manifest extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'siteid',
        'arrivalairport',
        'waibilloriginator',
        'origin',
        'destiny',
        'airline_prefix',
        'date'
    ];
}
