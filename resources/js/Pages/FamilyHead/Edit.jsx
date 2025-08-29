import FormField from "@/Components/FormField";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import useAppUrl from "@/hooks/useAppUrl";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const Edit = ({ family_head }) => {
    const API_URL = useAppUrl();
    const [barangays, setBarangays] = useState([]);
    const [selectedBarangayId, setSelectedBarangayId] = useState(
        family_head.barangay_id.toString()
    );

    const { data, setData, patch, errors, reset, processing } = useForm({
        firstname: family_head.firstname,
        middlename: family_head.middlename || "",
        lastname: family_head.lastname,
        barangay_id: selectedBarangayId,
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        await patch(route("family_heads.update", family_head.id), {
            onSuccess: () => {
                alert("Family head added successfully!");
                window.location.reload();
                reset();
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    const fetchBarangays = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/barangay_options`);
            setBarangays(response.data);
        } catch (error) {
            console.error("Error fetching barangays:", error);
            alert("Failed to fetch barangays.");
        }
    };

    useEffect(() => {
        fetchBarangays();
    }, []);

    const barangayOptions = barangays.map((barangay) => ({
        value: barangay.id.toString(),
        label: barangay.barangay_name,
    }));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Family Heads
                </h2>
            }
        >
            <Head title="Family Heads" />
            <div className="flex justify-center mb-5">
                <div className="border border-gray-400 w-[620px] rounded-md ">
                    <form onSubmit={onSubmit} className="px-6 py-4 space-y-4">
                        <h2 className="text-2xl">Edit Family Head</h2>
                        <hr />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                id="firstname"
                                label="FirstName"
                                value={data.firstname}
                                onChange={(e) =>
                                    setData("firstname", e.target.value)
                                }
                                error={errors.firstname}
                            />
                            <FormField
                                id="middlename"
                                label="MiddleName"
                                value={data.middlename}
                                onChange={(e) =>
                                    setData("middlename", e.target.value)
                                }
                                error={errors.middlename}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                id="Lastname"
                                label="LastName"
                                value={data.lastname}
                                onChange={(e) =>
                                    setData("lastname", e.target.value)
                                }
                                error={errors.lastname}
                            />
                            <div>
                                <Label>Barangay</Label>

                                <Select
                                    options={barangayOptions}
                                    placeholder="Choose a barangay"
                                    isClearable
                                    value={barangayOptions.find(
                                        (option) =>
                                            option.value === selectedBarangayId
                                    )}
                                    onChange={(selectedOption) => {
                                        const value =
                                            selectedOption?.value || "";
                                        setSelectedBarangayId(value);
                                        setData(
                                            "barangay_id",
                                            value ? parseInt(value, 10) : null
                                        );
                                    }}
                                    className={`${
                                        errors.barangay_id
                                            ? "border border-red-600"
                                            : ""
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <Link href="/family_heads">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2"
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
