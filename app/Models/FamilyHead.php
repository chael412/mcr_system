<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FamilyHead extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'middlename',
        'lastname',
        'barangay_id',
        'municipality',
        'province',
    ];

    public function barangay()
    {
        return $this->belongsTo(Barangay::class);
    }

    public function familyRegisterMembers()
    {
        return $this->hasMany(FamilyRegisterMember::class, 'family_head_id');
    }
}
