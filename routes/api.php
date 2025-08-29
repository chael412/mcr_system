<?php

use App\Http\Controllers\Main\BarangayController;
use App\Http\Controllers\Main\FamilyHeadController;
use App\Http\Controllers\Main\FamilyMemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('family_members', [FamilyMemberController::class, 'getFamilyMembers']);
Route::get('family_heads', [FamilyHeadController::class, 'getFamilyHeads']);
Route::get('barangays', [BarangayController::class, 'getBarangays']);

Route::post('/family_register_member', [FamilyMemberController::class, 'storeFamilyMember']);
Route::put('/update_familymember/{id}', [FamilyMemberController::class, 'updateFamilyMember']);


Route::get('familyhead_options', [FamilyHeadController::class, 'familyHeadOptions']);
Route::get('barangay_options', [BarangayController::class, 'barangayOptions']);


Route::post('/store_familyhead', [FamilyHeadController::class, 'storeFamilyHead']);
