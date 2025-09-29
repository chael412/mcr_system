<?php

namespace App\Http\Controllers;

use App\Models\BirthCertificate;
use App\Models\DeathCertificate;
use App\Models\FamilyHead;
use App\Models\FamilyMember;
use App\Models\Marriage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        // $family_heads = FamilyHead::count();
        $birth = BirthCertificate::count();
        $marriage = Marriage::count();
        $death = DeathCertificate::count();



        return Inertia::render('Dashboard', [
            'birth' => $birth,
            'marriage' => $marriage,
            'death' => $death,
        ]);
    }
}
