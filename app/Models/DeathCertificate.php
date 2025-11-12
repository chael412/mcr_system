<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeathCertificate extends Model
{
    protected $fillable = [
        'register_number',
        'date_of_registration',
        'firstname',
        'middlename',
        'lastname',
        'place_death',
        'file'
    ];
}
