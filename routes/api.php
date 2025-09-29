<?php

use App\Http\Controllers\Main\BarangayController;
use App\Http\Controllers\Main\BirthCertificateController;
use App\Http\Controllers\Main\DeathCertificateController;
use App\Http\Controllers\Main\FamilyHeadController;
use App\Http\Controllers\Main\FamilyMemberController;
use App\Http\Controllers\Main\MarriageController;
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


//===========================================Birth Certificate Section========================================================
Route::get('get_births', [BirthCertificateController::class, 'getBirths']);
Route::post('/store_birthcertificate', [BirthCertificateController::class, 'storeBirthCertificate']);
Route::put('/update_birthcertificate/{id}', [BirthCertificateController::class, 'updateBirthCertificate']);
Route::delete('/delete_birth/{id}', [BirthCertificateController::class, 'destroyBirthCertificate']);


//===========================================Marriage Section==================================================================
Route::get('get_marriages', [MarriageController::class, 'getMarriages']);
Route::post('/store_marriagecertificate', [MarriageController::class, 'storeMarriageCertificate']);
Route::put('/update_marriagecertificate/{id}', [MarriageController::class, 'updateMarriageCertificate']);
Route::delete('/delete_marriage/{id}', [MarriageController::class, 'destroyMarriageCertificate']);



//===========================================Death Certificate Section==========================================================
Route::get('get_deaths', [DeathCertificateController::class, 'getDeaths']);
Route::post('/store_deathcertificate', [DeathCertificateController::class, 'storeDeathCertificate']);
Route::put('/update_deathcertificate/{id}', [DeathCertificateController::class, 'updatDeathCertificate']);
Route::delete('/delete_death/{id}', [DeathCertificateController::class, 'destroyDeathCertificate']);
