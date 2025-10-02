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
        // Define all possible barangays
        $barangays = [
            'Bicobian',
            'Dibulos',
            'Dicambangan',
            'Dicaruyan',
            'Dicatian',
            'Dilakit',
            'Dimapnat',
            'Dimapula',
            'Dimasalansan',
            'Dipudo',
            'Ditarum',
            'Sapinit',
            'N/A', // include the blank option if you want
        ];

        // Get counts from database
        $birthCounts = DB::table('birth_certificates')
            ->select('place_birth', DB::raw('COUNT(*) as total'))
            ->groupBy('place_birth')
            ->pluck('total', 'place_birth'); // key = place_birth, value = count

        // Merge counts with all barangays, default to 0 if not in DB
        $result = [];
        foreach ($barangays as $b) {
            $result[] = [
                'place_birth' => $b,
                'total' => $birthCounts[$b] ?? 0,
            ];
        }

        return response()->json($result);
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
