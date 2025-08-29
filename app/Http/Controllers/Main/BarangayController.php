<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Barangay;
use App\Http\Requests\StoreBarangayRequest;
use App\Http\Requests\UpdateBarangayRequest;

class BarangayController extends Controller
{
    public function barangayOptions()
    {
        $barangays = Barangay::all();
        return response()->json($barangays);
    }

    public function getBarangays()
    {
        $search = request('search');
        $sortColumn = request('sortColumn', 'barangay_name');
        $sortDirection = request('sortDirection', 'asc');

        $validSortColumns = [
            'barangay_name',
        ];

        if (!in_array($sortColumn, $validSortColumns)) {
            $sortColumn = 'barangay_name';
        }

        $query = Barangay::when($search, function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('barangay_name', 'like', '%' . $search . '%');
            });
        });

        $query->orderBy($sortColumn, $sortDirection);

        $Barangays = $query->paginate(20);

        return response()->json($Barangays);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarangayRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Barangay $barangay)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barangay $barangay)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBarangayRequest $request, Barangay $barangay)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barangay $barangay)
    {
        //
    }
}
