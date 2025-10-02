<?php

namespace App\Http\Controllers;

use App\Models\BirthCertificate;
use App\Models\DeathCertificate;
use App\Models\FamilyHead;
use App\Models\FamilyMember;
use App\Models\Marriage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        // Using query builder to count by place_birth
        $birthStats = DB::table('birth_certificates')
            ->select('place_birth', DB::raw('COUNT(*) as total'))
            ->groupBy('place_birth')
            ->get();

        return response()->json($birthStats);
    }

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
