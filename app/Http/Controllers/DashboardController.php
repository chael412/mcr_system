<?php

namespace App\Http\Controllers;

use App\Models\FamilyHead;
use App\Models\FamilyMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $family_heads = FamilyHead::count();
        $family_members = FamilyMember::count();


        return Inertia::render('Dashboard', [
            'family_members' => $family_members,
            'family_heads' => $family_heads
        ]);
    }
}
