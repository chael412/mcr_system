<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FamilyMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'middlename',
        'lastname',
        'sex',
        'date_birth',
        'order_birth',
        'place_birth',
        'father_name',
        'mother_name',
        'date_place_marriage',
        'relationship_to_familyhead',
        'remarks',
        'birth_certificate'
    ];

    public function register()
    {
        return $this->hasOne(FamilyRegisterMember::class, 'family_member_id');
    }
}
