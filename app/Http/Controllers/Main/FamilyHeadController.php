<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\FamilyHead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FamilyHeadController extends Controller
{
    public function storeFamilyHead(Request $request)
    {
        try {
            $validated = $request->validate([
                'firstname'   => 'required|string|max:255',
                'middlename'  => 'nullable|string|max:255',
                'lastname'    => 'required|string|max:255',
                'barangay_id' => 'required|exists:barangays,id',
            ]);

            $familyHead = FamilyHead::create([
                'firstname'   => $validated['firstname'],
                'middlename'  => $validated['middlename'] ?? null,
                'lastname'    => $validated['lastname'],
                'barangay_id' => $validated['barangay_id'],
                'municipality' => 'DIVILACAN', // ✅ hardcoded since enum
                'province'    => 'ISABELA',   // ✅ hardcoded since enum
            ]);

            return response()->json([
                'message'     => 'Family head added successfully.',
                'family_head' => $familyHead,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while saving family head.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }


    public function familyHeadOptions()
    {
        $search = request('search');
        $sortColumn = request('sortColumn', 'lastname');
        $sortDirection = request('sortDirection', 'asc');

        $validSortColumns = [
            'lastname',
            'barangay',
            'municipality',
            'province',
        ];

        if (!in_array($sortColumn, $validSortColumns)) {
            $sortColumn = 'lastname';
        }

        $query = FamilyHead::with('barangay')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('lastname', 'like', '%' . $search . '%');
                });
            });

        // If sorting by barangay, join the table
        if ($sortColumn === 'barangay') {
            $query->leftJoin('barangays', 'family_heads.barangay_id', '=', 'barangays.id')
                ->select('family_heads.*', 'barangays.barangay_name as barangay_name')
                ->orderBy('barangay_name', $sortDirection);
        } else {
            $query->orderBy($sortColumn, $sortDirection);
        }

        $familyHeads = $query->get();

        return response()->json($familyHeads);
    }

    public function getFamilyHeads()
    {
        $search = request('search');
        $sortColumn = request('sortColumn', 'lastname');
        $sortDirection = request('sortDirection', 'asc');

        $validSortColumns = [
            'lastname',
            'barangay',
            'municipality',
            'province',
        ];

        if (!in_array($sortColumn, $validSortColumns)) {
            $sortColumn = 'lastname';
        }

        $query = FamilyHead::with('barangay')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('lastname', 'like', '%' . $search . '%');
                });
            });

        // If sorting by barangay, join the table
        if ($sortColumn === 'barangay') {
            $query->leftJoin('barangays', 'family_heads.barangay_id', '=', 'barangays.id')
                ->select('family_heads.*', 'barangays.barangay_name as barangay_name')
                ->orderBy('barangay_name', $sortDirection);
        } else {
            $query->orderBy($sortColumn, $sortDirection);
        }

        $familyHeads = $query->paginate(20);

        return response()->json($familyHeads);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("FamilyHead/Index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("FamilyHead/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'firstname'   => 'required|string|max:255',
                'middlename'  => 'nullable|string|max:255',
                'lastname'    => 'required|string|max:255',
                'barangay_id' => 'required|exists:barangays,id',
            ]);

            $familyHead = FamilyHead::create([
                'firstname'   => $validated['firstname'],
                'middlename'  => $validated['middlename'] ?? null,
                'lastname'    => $validated['lastname'],
                'barangay_id' => $validated['barangay_id'],
                'municipality' => 'DIVILACAN', // ✅ hardcoded since enum
                'province'    => 'ISABELA',   // ✅ hardcoded since enum
            ]);


            return to_route('family_heads.index');
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while saving family head.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(FamilyHead $familyHead)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $family_head = FamilyHead::with(['barangay'])
            ->findOrFail($id);

        return inertia('FamilyHead/Edit', [
            'family_head' => $family_head,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'firstname'   => 'required|string|max:255',
                'middlename'  => 'nullable|string|max:255',
                'lastname'    => 'required|string|max:255',
                'barangay_id' => 'required|exists:barangays,id',
            ]);

            $familyHead = FamilyHead::findOrFail($id);

            $familyHead->update([
                'firstname'    => $validated['firstname'],
                'middlename'   => $validated['middlename'] ?? null,
                'lastname'     => $validated['lastname'],
                'barangay_id'  => $validated['barangay_id'],
                'municipality' => 'DIVILACAN', // ✅ hardcoded
                'province'     => 'ISABELA',   // ✅ hardcoded
            ]);

            return to_route('family_heads.index')
                ->with('success', 'Family head updated successfully!');
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while updating family head.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $family_head = FamilyHead::findOrFail($id);


            if ($family_head->familyRegisterMembers()->exists()) {
                return response()->json([
                    'message' => 'Cannot delete. This family head has registered members.'
                ], 409); // conflict
            }


            $family_head->delete();

            return response()->json([
                'message' => 'Family head deleted successfully.'
            ], 200); // ✅ explicitly success

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting family head: ' . $e->getMessage()
            ], 500);
        }
    }
}
