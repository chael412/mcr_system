<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    protected $fillable = [
        'barangay_name',
    ];

    public function familyHeads()
    {
        return $this->hasMany(FamilyHead::class);
    }
}
