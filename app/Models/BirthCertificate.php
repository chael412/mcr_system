<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BirthCertificate extends Model
{
    protected $fillable = [
        'register_number',
        'date_of_registration',
        'firstname',
        'middlename',
        'lastname',
        'sex',
        'date_birth',
        'place_birth',
        'status',
        'file'
    ];
}
