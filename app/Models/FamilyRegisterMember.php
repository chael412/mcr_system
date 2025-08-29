<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FamilyRegisterMember extends Model
{
    protected $fillable = [
        'register_number',
        'family_member_id',
        'family_head_id',
        'date_of_registration',
    ];

    public function familyMember()
    {
        return $this->belongsTo(FamilyMember::class, 'family_member_id');
    }

    public function familyHead()
    {
        return $this->belongsTo(Familyhead::class, 'family_head_id');
    }
}
