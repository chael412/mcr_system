<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\FamilyMember;
use App\Http\Requests\StoreFamilyMemberRequest;
use App\Http\Requests\UpdateFamilyMemberRequest;
use App\Models\FamilyHead;
use App\Models\FamilyRegisterMember;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FamilyMemberController extends Controller
{
    public function updateFamilyMember(Request $request, $id)
    {
        try {
            // validate fields
            $validated = $request->validate([
                // FamilyMember fields
                'firstname' => 'required|string|max:255',
                'middlename' => 'nullable|string|max:255',
                'lastname' => 'required|string|max:255',
                'sex' => 'required|string|max:10',
                'date_birth' => 'required|date',
                'order_birth' => 'nullable|integer',
                'place_birth' => 'nullable|string|max:255',
                'father_name' => 'nullable|string|max:255',
                'mother_name' => 'nullable|string|max:255',
                'date_place_marriage' => 'nullable|string|max:255',
                'relationship_to_familyhead' => 'nullable|string|max:255',
                'remarks' => 'nullable|string|max:500',
                'birth_certificate' => 'nullable|file|mimes:jpg,jpeg,png,pdf',

                // FamilyRegisterMember fields
                'register_number' => 'nullable|string|max:50',
                'family_head_id' => 'required|exists:family_heads,id',
                'date_of_registration' => 'nullable|date',
            ]);

            // 🔎 Step 1: find existing family member
            $familyMember = FamilyMember::findOrFail($id);

            /// Get firstname and lastname from validated request
            $lastname = preg_replace('/\s+/', '', $validated['lastname']);
            $firstname = preg_replace('/\s+/', '', $validated['firstname']);

            // 🔎 Step 2: handle file upload (replace if new one given)
            $filePath = $familyMember->birth_certificate; // keep old file if none uploaded
            if ($request->hasFile('birth_certificate')) {
                $file = $request->file('birth_certificate');

                // Clean lastname & firstname (remove spaces)
                $lastname = preg_replace('/\s+/', '', $validated['lastname']);
                $firstname = preg_replace('/\s+/', '', $validated['firstname']);

                // Get extension (pdf, jpg, etc.)
                $extension = $file->getClientOriginalExtension();

                // New filename with extension
                $fileName = $lastname . $firstname . '_birthCertificate.' . $extension;

                $destinationPath = public_path('files');
                if (!is_dir($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $fileName);
                $filePath = 'files/' . $fileName;
            }


            // 🔎 Step 3: update FamilyMember
            $familyMember->update([
                'firstname' => $validated['firstname'],
                'middlename' => $validated['middlename'] ?? "",
                'lastname' => $validated['lastname'],
                'sex' => $validated['sex'],
                'date_birth' => $validated['date_birth'],
                'order_birth' => $validated['order_birth'] ?? "",
                'place_birth' => $validated['place_birth'] ?? "",
                'father_name' => $validated['father_name'] ?? "",
                'mother_name' => $validated['mother_name'] ?? "",
                'date_place_marriage' => $validated['date_place_marriage'] ?? "",
                'relationship_to_familyhead' => $validated['relationship_to_familyhead'] ?? "",
                'remarks' => $validated['remarks'] ?? "",
                'birth_certificate' => $filePath,
            ]);

            // 🔎 Step 4: update FamilyRegisterMember
            $registerMember = FamilyRegisterMember::where('family_member_id', $familyMember->id)->first();

            if ($registerMember) {
                $registerMember->update([
                    'register_number' => $validated['register_number'] ?? "",
                    'family_head_id' => $validated['family_head_id'] ?? "",
                    'date_of_registration' => $validated['date_of_registration'],
                ]);
            }

            return response()->json([
                'message' => 'Family member updated successfully.',
                'family_member' => $familyMember,
                'register_member' => $registerMember,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while updating family member.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function storeFamilyMember(Request $request)
    {
        try {
            // validate both family_member and register_member fields
            $validated = $request->validate([
                // FamilyMember fields
                'firstname' => 'required|string|max:255',
                'middlename' => 'nullable|string|max:255',
                'lastname' => 'required|string|max:255',
                'sex' => 'required|string|max:10',
                'date_birth' => 'required|date',
                'order_birth' => 'nullable|integer',
                'place_birth' => 'nullable|string|max:255',
                'father_name' => 'nullable|string|max:255',
                'mother_name' => 'nullable|string|max:255',
                'date_place_marriage' => 'nullable|string|max:255',
                'relationship_to_familyhead' => 'nullable|string|max:255',
                'remarks' => 'nullable|string|max:500',
                'birth_certificate' => 'nullable|file|mimes:jpg,jpeg,png,pdf',

                // FamilyRegisterMember fields
                'register_number' => 'nullable|string|max:50',   //->make it nullable
                'family_head_id' => 'nullable|exists:family_heads,id',
                'date_of_registration' => 'nullable|date',      //->make it nullable
            ]);



            // Process birth_certificate upload
            $filePath = null;
            if ($request->hasFile('birth_certificate')) {
                $file = $request->file('birth_certificate');

                // Clean lastname & firstname (remove spaces)
                $lastname = preg_replace('/\s+/', '', $validated['lastname']);
                $firstname = preg_replace('/\s+/', '', $validated['firstname']);

                // Get extension (pdf, jpg, etc.)
                $extension = $file->getClientOriginalExtension();

                // New filename with extension
                $fileName = $lastname . $firstname . '_birthCertificate.' . $extension;

                $destinationPath = public_path('files');
                if (!is_dir($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $fileName);
                $filePath = 'files/' . $fileName;
            }




            // Step 1: create FamilyMember
            $familyMember = FamilyMember::create([
                'firstname' => $validated['firstname'],
                'middlename' => $validated['middlename'] ?? "",
                'lastname' => $validated['lastname'],
                'sex' => $validated['sex'],
                'date_birth' => $validated['date_birth'],
                'order_birth' => $validated['order_birth'] ?? "",
                'place_birth' => $validated['place_birth'] ?? "",
                'father_name' => $validated['father_name'] ?? "",
                'mother_name' => $validated['mother_name'] ?? "",
                'date_place_marriage' => $validated['date_place_marriage'] ?? "",
                'relationship_to_familyhead' => $validated['relationship_to_familyhead'] ?? "",
                'remarks' => $validated['remarks'] ?? "",
                'birth_certificate' => $filePath,
            ]);

            // Step 2: create FamilyRegisterMember referencing new FamilyMember
            $registerMember = FamilyRegisterMember::create([
                'register_number' => $validated['register_number'] ?? "",
                'family_member_id' => $familyMember->id,
                'family_head_id' => $validated['family_head_id'],
                'date_of_registration' => $validated['date_of_registration'] ?? "",
            ]);

            return response()->json([
                'message' => 'Family member registered successfully.',
                'family_member' => $familyMember,
                'register_member' => $registerMember
            ], 201);
        } catch (\Exception $e) {
            // ✅ Catch unexpected runtime errors
            return response()->json([
                'message' => 'An unexpected error occurred while saving family member.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function getFamilyMembers()
    {
        $search = request('search');
        $sortColumn = request('sortColumn', 'lastname');
        $sortDirection = request('sortDirection', 'asc');

        // Define valid sort columns for FamilyMember
        $validSortColumns = [
            'lastname',
            'firstname',
            'middlename',
            'sex',
            'order_birth',
            'place_birth',
            'father_name',
            'mother_name',
            'date_place_marriage',
            'relationship_to_familyhead',
            'created_at',
        ];

        if (!in_array($sortColumn, $validSortColumns)) {
            $sortColumn = 'lastname'; // fallback
        }


        $query = FamilyRegisterMember::with(['familyMember', 'familyHead'])
            ->whereHas('familyMember', function ($query) use ($search) {
                if ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where('lastname', 'like', '%' . $search . '%')
                            ->orWhere('firstname', 'like', '%' . $search . '%')
                            ->orWhere('relationship_to_familyhead', 'like', '%' . $search . '%');
                    });
                }
            });


        $query->join('family_members', 'family_register_members.family_member_id', '=', 'family_members.id')
            ->orderBy("family_members.$sortColumn", $sortDirection)
            ->select('family_register_members.*');

        $familyMembers = $query->paginate(20);

        return response()->json($familyMembers);
    }


    // public function getFamilyMembers()
    // {
    //     $search = request('search');
    //     $sortColumn = request('sortColumn', 'lastname');
    //     $sortDirection = request('sortDirection', 'asc');

    //     // Define valid sort columns for FamilyMember
    //     $validSortColumns = [
    //         'lastname',
    //         'firstname',
    //         'middlename',
    //         'sex',
    //         'order_birth',
    //         'place_birth',
    //         'father_name',
    //         'mother_name',
    //         'date_place_marriage',
    //         'relationship_to_familyhead',
    //         'created_at',
    //     ];

    //     // Validate the sort column
    //     if (!in_array($sortColumn, $validSortColumns)) {
    //         $sortColumn = 'lastname'; // fallback
    //     }

    //     // Query using FamilyMember model
    //     $query = FamilyMember::with('register')
    //         ->when($search, function ($query) use ($search) {
    //             $query->where(function ($query) use ($search) {
    //                 $query->where('lastname', 'like', '%' . $search . '%')
    //                     ->orWhere('firstname', 'like', '%' . $search . '%')
    //                     ->orWhere('relationship_to_familyhead', 'like', '%' . $search . '%');
    //             });
    //         });

    //     // Apply sorting and pagination
    //     $familyMembers = $query->orderBy($sortColumn, $sortDirection)
    //         ->paginate(20);

    //     return response()->json($familyMembers);
    // }



    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("FamilyMember/Index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("FamilyMember/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFamilyMemberRequest $request) {}

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $member = FamilyMember::find($id);

        return Inertia::render("FamilyMember/Show", [
            'member' => $member
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $member = FamilyMember::with('register')->find($id);

        return Inertia::render("FamilyMember/Edit", [
            'member' => $member
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFamilyMemberRequest $request, FamilyMember $familyMember)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $member = FamilyMember::find($id);

        if (!$member) {
            return abort(404, 'Family member not found');
        }

        try {
            // Start DB transaction for safety
            DB::beginTransaction();

            // Delete the family member first
            $member->delete();

            // Then delete the related record in family_register_members
            DB::table('family_register_members')
                ->where('family_member_id', $id)
                ->delete();

            // Commit transaction
            DB::commit();

            return response()->json([
                'message' => 'Family member deleted successfully.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error deleting family member and related data: ' . $e->getMessage()
            ], 500);
        }
    }
}
