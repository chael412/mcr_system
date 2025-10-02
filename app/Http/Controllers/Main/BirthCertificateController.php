<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\BirthCertificate;
use App\Http\Requests\StoreBirthCertificateRequest;
use App\Http\Requests\UpdateBirthCertificateRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BirthCertificateController extends Controller
{
    public function destroyBirthCertificate($id)
    {
        try {
            $birthCertificate = BirthCertificate::findOrFail($id);

            // 🔎 Delete file if exists
            if ($birthCertificate->file && file_exists(public_path($birthCertificate->file))) {
                unlink(public_path($birthCertificate->file));
            }

            $birthCertificate->delete();

            return response()->json([
                'message' => 'Birth certificate record deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while deleting the data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateBirthCertificate(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'register_number' => 'nullable|string|max:50',
                'date_of_registration' => 'nullable|date',
                'firstname' => 'required|string|max:255',
                'middlename' => 'nullable|string|max:255',
                'lastname' => 'required|string|max:255',
                'sex' => 'required|string|max:10',
                'date_birth' => 'required|date',
                'place_birth' => 'nullable|string|max:255',
                'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf',
            ]);

            $birthCertificate = BirthCertificate::findOrFail($id);

            // Clean lastname & firstname (remove spaces)
            $lastname = preg_replace('/\s+/', '', $validated['lastname']);
            $firstname = preg_replace('/\s+/', '', $validated['firstname']);

            // Keep old file path unless replaced
            $filePath = $birthCertificate->file;
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $fileName = $lastname . $firstname . '_birthCertificate.' . $extension;

                $destinationPath = public_path('files');
                if (!is_dir($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $fileName);
                $filePath = 'files/' . $fileName;
            }

            $birthCertificate->update([
                'register_number' => $validated['register_number'] ?? "",
                'date_of_registration' => $validated['date_of_registration'] ?? "",
                'firstname' => $validated['firstname'],
                'middlename' => $validated['middlename'] ?? "",
                'lastname' => $validated['lastname'],
                'sex' => $validated['sex'],
                'date_birth' => $validated['date_birth'],
                'place_birth' => $validated['place_birth'] ?? "",
                'file' => $filePath,
            ]);

            return response()->json([
                'message' => 'Birth certificate record updated successfully.',
                'birth' => $birthCertificate,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while updating the data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function storeBirthCertificate(Request $request)
    {
        try {
            $validated = $request->validate([
                'register_number' => 'nullable|string',
                'date_of_registration' => 'nullable|date',
                'firstname' => 'required|string|max:255',
                'middlename' => 'nullable|string|max:255',
                'lastname' => 'required|string|max:255',
                'sex' => 'required|string|max:10',
                'date_birth' => 'required|date',
                'place_birth' => 'nullable|string|max:255',
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
                $fileName = $lastname . $firstname . '_birthCertificate.' . $extension;

                $destinationPath = public_path('files');
                if (!is_dir($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $fileName);
                $filePath = 'files/' . $fileName;
            }


            $birth = BirthCertificate::create([
                'register_number' => $validated['register_number'] ?? "",
                'date_of_registration' => $validated['date_of_registration'] ?? "",
                'firstname' => $validated['firstname'],
                'middlename' => $validated['middlename'] ?? "",
                'lastname' => $validated['lastname'],
                'sex' => $validated['sex'],
                'date_birth' => $validated['date_birth'],
                'place_birth' => $validated['place_birth'] ?? "",
                'file' => $filePath,
            ]);


            return response()->json([
                'message' => 'Birth certificate record added successfully.',
                'birth' => $birth,
            ], 201);
        } catch (\Exception $e) {
            // ✅ Catch unexpected runtime errors
            return response()->json([
                'message' => 'An unexpected error occurred while saving data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getBirths(Request $request)
    {
        try {
            $search = $request->query('search');
            $sortColumn = $request->query('sortColumn', 'lastname');
            $sortDirection = $request->query('sortDirection', 'asc');
            $placeBirth = $request->query('place_birth'); // filter param

            $validSortColumns = [
                'lastname',
                'firstname',
                'middlename',
                'sex',
                'place_birth',
                'date_birth',
                'father_name',
                'mother_name',
                'created_at',
                'date_of_registration'
            ];

            if (!in_array($sortColumn, $validSortColumns)) {
                $sortColumn = 'lastname';
            }

            $query = BirthCertificate::query();

            // 🔍 Search filter
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('lastname', 'like', "%{$search}%")
                        ->orWhere('firstname', 'like', "%{$search}%");
                });
            }

            // 🏘 Barangay filter (default: show all if empty)
            if (!empty($placeBirth) && $placeBirth !== 'All') {
                $query->where('place_birth', $placeBirth);
            }

            $births = $query->orderBy($sortColumn, $sortDirection)->paginate(50);

            return response()->json($births);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong while fetching birth records.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }



    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("BirthCertificate/Index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("BirthCertificate/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBirthCertificateRequest $request)
    {
        try {
            $data = $request->validated();
            $birth = BirthCertificate::create($data);

            return to_route('birth_certificates.index');
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $birth_certificate = BirthCertificate::find($id);

        return Inertia::render("BirthCertificate/Show", [
            'birth_certificate' => $birth_certificate
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $birth = BirthCertificate::findOrFail($id);

        return inertia('BirthCertificate/Edit', [
            'birth' => $birth,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBirthCertificateRequest $request, $id)
    {
        try {
            $birth = BirthCertificate::findOrFail($id);

            $data = $request->validated();

            $birth->update($data);

            return to_route('birth_certificates.index');;
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $birthCertificate = BirthCertificate::findOrFail($id);

            // 🔎 Delete file if exists
            if ($birthCertificate->file && file_exists(public_path($birthCertificate->file))) {
                unlink(public_path($birthCertificate->file));
            }

            $birthCertificate->delete();

            return response()->json([
                'message' => 'Birth certificate deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while deleting the data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
