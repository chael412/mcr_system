<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\DeathCertificate;
use App\Http\Requests\StoreDeathCertificateRequest;
use App\Http\Requests\UpdateDeathCertificateRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeathCertificateController extends Controller
{
    //=====API FUNCTION
    public function destroyDeathCertificate($id)
    {
        try {
            $deathCertificate = DeathCertificate::findOrFail($id);

            // 🔎 Delete file if exists
            if ($deathCertificate->file && file_exists(public_path($deathCertificate->file))) {
                unlink(public_path($deathCertificate->file));
            }

            $deathCertificate->delete();

            return response()->json([
                'message' => 'Death certificate record deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while deleting the data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateDeathCertificate(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'register_number' => 'nullable|string',
                'date_of_registration' => 'nullable|date',
                'firstname' => 'required|string|max:255',
                'middlename' => 'nullable|string|max:255',
                'lastname' => 'required|string|max:255',
                'place_death' => 'nullable|string|max:255',
                'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf',
            ]);


            $deathCertificate = DeathCertificate::findOrFail($id);

            // Clean lastname & firstname (remove spaces)
            $lastname = preg_replace('/\s+/', '', $validated['lastname']);
            $firstname = preg_replace('/\s+/', '', $validated['firstname']);

            // Keep old file path unless replaced
            $filePath = $deathCertificate->file;
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $fileName = $lastname . $firstname . '_deathCertificate.' . $extension;

                $destinationPath = public_path('deaths');
                if (!is_dir($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $fileName);
                $filePath = 'deaths/' . $fileName;
            }

            $deathCertificate->update([
                'register_number' => $validated['register_number'] ?? "",
                'date_of_registration' => $validated['date_of_registration'] ?? "",
                'firstname' => $validated['firstname'],
                'middlename' => $validated['middlename'] ?? "",
                'lastname' => $validated['lastname'],
                'place_death' => $validated['place_death'],
                'file' => $filePath,
            ]);

            return response()->json([
                'message' => 'Death certificate record updated successfully.',
                'birth' => $deathCertificate,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while updating the data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function storeDeathCertificate(Request $request)
    {
        try {
            $validated = $request->validate([
                'register_number' => 'nullable|string',
                'date_of_registration' => 'nullable|date',
                'firstname' => 'required|string|max:255',
                'middlename' => 'nullable|string|max:255',
                'lastname' => 'required|string|max:255',
                'place_death' => 'nullable|string|max:255',
                'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf',
            ]);

            // Process file upload
            $filePath = null;
            if ($request->hasFile('file')) {
                $file = $request->file('file');

                // Clean lastname & firstname (remove spaces)
                $lastname = preg_replace('/\s+/', '', $validated['lastname']);
                $firstname = preg_replace('/\s+/', '', $validated['firstname']);

                // Get extension (pdf, jpg, etc.)
                $extension = $file->getClientOriginalExtension();

                // New filename with extension
                $fileName = $lastname . $firstname . '_deathCertificate.' . $extension;

                $destinationPath = public_path('deaths');
                if (!is_dir($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $fileName);
                $filePath = 'deaths/' . $fileName;
            }


            $death = DeathCertificate::create([
                'register_number' => $validated['register_number'] ?? "",
                'date_of_registration' => $validated['date_of_registration'] ?? "",
                'firstname' => $validated['firstname'],
                'middlename' => $validated['middlename'] ?? "",
                'lastname' => $validated['lastname'],
                'place_death' => $validated['place_death'],
                'file' => $filePath,
            ]);


            return response()->json([
                'message' => 'Death certificate record added successfully.',
                'death' => $death,
            ], 201);
        } catch (\Exception $e) {
            // ✅ Catch unexpected runtime errors
            return response()->json([
                'message' => 'An unexpected error occurred while saving data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getDeaths(Request $request)
    {
        try {
            $search = $request->query('search');
            $sortColumn = $request->query('sortColumn', 'lastname');
            $sortDirection = $request->query('sortDirection', 'asc');
            $placeDeath = $request->query('place_death');

            // ✅ Valid sort columns
            $validSortColumns = [
                'register_number',
                'date_of_registration',
                'lastname',
                'firstname',
                'middlename',
                'place_death',
                'created_at',
            ];

            if (!in_array($sortColumn, $validSortColumns)) {
                $sortColumn = 'lastname'; // fallback
            }

            $query = DeathCertificate::query();

            // 🔍 Search filter
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('lastname', 'like', '%' . $search . '%')
                        ->orWhere('firstname', 'like', '%' . $search . '%')
                        ->orWhere('middlename', 'like', '%' . $search . '%');
                });
            }

            // 🏘 Filter by place of death (if not "All")
            if (!empty($placeDeath) && $placeDeath !== 'All') {
                $query->where('place_death', $placeDeath);
            }

            // 📋 Sorting and pagination
            $deaths = $query->orderBy($sortColumn, $sortDirection)->paginate(50);

            return response()->json($deaths);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong while fetching death records.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }



    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Death/Index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Death/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeathCertificateRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $death = DeathCertificate::find($id);

        return Inertia::render("Death/Show", [
            'death' => $death
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $death = DeathCertificate::find($id);

        return Inertia::render("Death/Edit", [
            'death' => $death
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeathCertificateRequest $request, DeathCertificate $deathCertificate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeathCertificate $deathCertificate)
    {
        //
    }
}
