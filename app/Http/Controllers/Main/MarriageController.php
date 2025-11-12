<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Marriage;
use App\Http\Requests\StoreMarriageRequest;
use App\Http\Requests\UpdateMarriageRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarriageController extends Controller
{
    public function destroyMarriageCertificate($id)
    {
        try {
            $marriageCertificate = Marriage::findOrFail($id);

            // 🔎 Delete file if exists
            if ($marriageCertificate->file && file_exists(public_path($marriageCertificate->file))) {
                unlink(public_path($marriageCertificate->file));
            }

            $marriageCertificate->delete();

            return response()->json([
                'message' => 'Marriage certificate record deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while deleting the data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateMarriageCertificate(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'register_number' => 'nullable|string',
                'date_of_registration' => 'nullable|date',
                'husband_firstname' => 'required|string|max:255',
                'husband_middlename' => 'nullable|string|max:255',
                'husband_lastname' => 'required|string|max:255',
                'wife_firstname' => 'required|string|max:255',
                'wife_middlename' => 'nullable|string|max:255',
                'wife_lastname' => 'required|string|max:255',
                'place_marriage' => 'nullable|string|max:255',
                'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf',
            ]);

            $marriageCertificate = Marriage::findOrFail($id);

            // Clean lastname & firstname (remove spaces)
            $lastname = preg_replace('/\s+/', '', $validated['husband_firstname']);
            $firstname = preg_replace('/\s+/', '', $validated['wife_firstname']);

            // Keep old file path unless replaced
            $filePath = $marriageCertificate->file;
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $fileName = $lastname . $firstname . '_marriageCertificate.' . $extension;

                $destinationPath = public_path('marriages');
                if (!is_dir($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $fileName);
                $filePath = 'marriages/' . $fileName;
            }

            $marriageCertificate->update([
                'register_number' => $validated['register_number'] ?? "",
                'date_of_registration' => $validated['date_of_registration'] ?? "",
                'husband_firstname' => $validated['husband_firstname'],
                'husband_middlename' => $validated['husband_middlename'] ?? "",
                'husband_lastname' => $validated['husband_lastname'],
                'wife_firstname' => $validated['wife_firstname'],
                'wife_middlename' => $validated['wife_middlename'] ?? "",
                'wife_lastname' => $validated['wife_lastname'],
                'place_marriage' => $validated['place_marriage'],
                'file' => $filePath,
            ]);

            return response()->json([
                'message' => 'Marriage certificate record updated successfully.',
                'marriage' => $marriageCertificate,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while updating the data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function storeMarriageCertificate(Request $request)
    {
        try {
            $validated = $request->validate([
                'register_number' => 'nullable|string',
                'date_of_registration' => 'nullable|date',
                'husband_firstname' => 'required|string|max:255',
                'husband_middlename' => 'nullable|string|max:255',
                'husband_lastname' => 'required|string|max:255',
                'wife_firstname' => 'required|string|max:255',
                'wife_middlename' => 'nullable|string|max:255',
                'wife_lastname' => 'required|string|max:255',
                'place_marriage' => 'nullable|string|max:255',
                'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf',
            ]);

            // Process file upload
            $filePath = null;
            if ($request->hasFile('file')) {
                $file = $request->file('file');

                // Clean lastname & firstname (remove spaces)
                $lastname = preg_replace('/\s+/', '', $validated['husband_firstname']);
                $firstname = preg_replace('/\s+/', '', $validated['wife_firstname']);

                // Get extension (pdf, jpg, etc.)
                $extension = $file->getClientOriginalExtension();

                // New filename with extension
                $fileName = $lastname . $firstname . '_marriageCertificate.' . $extension;

                $destinationPath = public_path('marriages');
                if (!is_dir($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $fileName);
                $filePath = 'marriages/' . $fileName;
            }


            $marriage = Marriage::create([
                'register_number' => $validated['register_number'] ?? "",
                'date_of_registration' => $validated['date_of_registration'] ?? "",
                'husband_firstname' => $validated['husband_firstname'],
                'husband_middlename' => $validated['husband_middlename'] ?? "",
                'husband_lastname' => $validated['husband_lastname'],
                'wife_firstname' => $validated['wife_firstname'],
                'wife_middlename' => $validated['wife_middlename'] ?? "",
                'wife_lastname' => $validated['wife_lastname'],
                'place_marriage' => $validated['place_marriage'],
                'file' => $filePath,
            ]);

            return response()->json([
                'message' => 'Marriage certificate record added successfully.',
                'marriage' => $marriage,
            ], 201);
        } catch (\Exception $e) {
            // ✅ Catch unexpected runtime errors
            return response()->json([
                'message' => 'An unexpected error occurred while saving data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getMarriages(Request $request)
    {
        try {
            $search = $request->query('search');
            $sortColumn = $request->query('sortColumn', 'husband_lastname');
            $sortDirection = $request->query('sortDirection', 'asc');
            $placeBirth = $request->query('place_birth');

            // ✅ Valid sort columns
            $validSortColumns = [
                'register_number',
                'date_of_registration',
                'husband_lastname',
                'wife_lastname',
                'place_birth',
                'created_at',
            ];

            if (!in_array($sortColumn, $validSortColumns)) {
                $sortColumn = 'husband_lastname'; // fallback
            }

            $query = Marriage::query();

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('husband_lastname', 'like', '%' . $search . '%')
                        ->orWhere('wife_lastname', 'like', '%' . $search . '%');
                });
            }

            // 🏘 Barangay filter (default: show all if empty)
            if (!empty($placeBirth) && $placeBirth !== 'All') {
                $query->where('place_birth', $placeBirth);
            }

            $marriages = $query->orderBy($sortColumn, $sortDirection)->paginate(50);

            return response()->json($marriages);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong while fetching the data.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Marriage/Index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Marriage/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMarriageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $marriage = Marriage::find($id);

        return Inertia::render("Marriage/Show", [
            'marriage' => $marriage
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $marriage = Marriage::find($id);

        return Inertia::render("Marriage/Edit", [
            'marriage' => $marriage
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMarriageRequest $request, Marriage $marriage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marriage $marriage)
    {
        //
    }
}
