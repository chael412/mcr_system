<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marriage extends Model
{
    protected $fillable = [
        'register_number',
        'date_of_registration',
        'husband_firstname',
        'husband_middlename',
        'husband_lastname',
        'wife_firstname',
        'wife_middlename',
        'wife_lastname',
        'file'
    ];
}
