import { AiOutlinePlus } from "react-icons/ai";
import { ClipLoader, FadeLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import FormField from "@/Components/FormField";
import FormSelect from "@/Components/FormSelect";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Select from "react-select";
import useAppUrl from "@/hooks/useAppUrl";
import axios from "axios";

const Create = () => {
    const API_URL = useAppUrl();
    const [heads, setHeads] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [selectedFamilyHeadId, setSelectedFamilyHeadId] = useState("");
    const [selectedSex, setSelectedSex] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const { data, setData, post, errors, reset, processing } = useForm({
        register_number: "",
        date_of_registration: "",
        firstname: "",
        middlename: "",
        lastname: "",
        sex: "",
        date_birth: "",
        place_birth: "",
        file: "",
    });

    const handleFileChange = (e) => {
        setData("file", e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData();
        formData.append("firstname", data.firstname);
        formData.append("middlename", data.middlename);
        formData.append("lastname", data.lastname);
        formData.append("sex", data.sex);
        formData.append("date_birth", data.date_birth);
        formData.append("place_birth", data.place_birth);
        formData.append("register_number", data.register_number);
        formData.append("date_of_registration", data.date_of_registration);
        formData.append("file", data.file);

        try {
            console.log("Sending Payload:", data);

            const response = await axios.post(
                `${API_URL}/api/store_birthcertificate`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                // wait 3 seconds before reload
                setTimeout(() => {
                    setIsSaving(false);
                    alert("Birth certificate record updated successfully!");
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            console.error("Error saving data:", error.response?.data || error);
        }
    };

    const sexOptions = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
    ];

    const barangayOptions = [
        { value: "Bicobian", label: "Bicobian" },
        { value: "Dibulos", label: "Dibulos" },
        { value: "Dicambangan", label: "Dicambangan" },
        { value: "Dicaruyan", label: "Dicaruyan" },
        { value: "Dicatian", label: "Dicatian" },
        { value: "Dilakit", label: "Dilakit" },
        { value: "Dimapnat", label: "Dimapnat" },
        { value: "Dimapula", label: "Dimapula" },
        { value: "Dimasalansan", label: "Dimasalansan" },
        { value: "Dipudo", label: "Dipudo" },
        { value: "Ditarum", label: "Ditarum" },
        { value: "Sapinit", label: "Sapinit" },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Birth Certificates
                </h2>
            }
        >
            <Head title="Birth Certificates" />

            {/* overlay goes here */}
            {isSaving && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white px-6 py-4 rounded-lg shadow-md flex items-center space-x-3">
                        <ClipLoader size={28} color="#16a34a" />
                        <span className="text-lg font-semibold text-gray-700">
                            Saving...
                        </span>
                    </div>
                </div>
            )}

            <div className=" flex justify-center mb-5">
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

                <div className="border border-gray-400 w-[620px] rounded-md ">
                    <form onSubmit={onSubmit} className="px-6 py-4 space-y-4">
                        <h2 className="text-2xl">Add New Birth Certificate</h2>
                        <hr />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="mt-2">
                                <Label htmlFor="file">Birth Certificate</Label>
                                <Input
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                id="regsistry_number"
                                label="Registry Number"
                                value={data.register_number}
                                onChange={(e) =>
                                    setData("register_number", e.target.value)
                                }
                                error={errors.register_number}
                            />
                            <FormField
                                id="date_of_registration"
                                label="Date of Registration"
                                type="date"
                                value={data.date_of_registration}
                                onChange={(e) =>
                                    setData(
                                        "date_of_registration",
                                        e.target.value
                                    )
                                }
                                error={errors.date_of_registration}
                            />
                        </div>
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
                                id="lastname"
                                label="LastName"
                                value={data.lastname}
                                onChange={(e) =>
                                    setData("lastname", e.target.value)
                                }
                                error={errors.lastname}
                            />
                            <div>
                                <Label htmlFor="sex">Sex</Label>
                                <Select
                                    value={sexOptions.find(
                                        (option) => option.value === selectedSex
                                    )}
                                    options={sexOptions}
                                    onChange={(selectedOption) => {
                                        const value =
                                            selectedOption?.value || "";
                                        setSelectedSex(value);
                                        setData("sex", value); // <-- sync with form data
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                id="date_birth"
                                label="Date of Birth"
                                type="date"
                                value={data.date_birth}
                                onChange={(e) =>
                                    setData("date_birth", e.target.value)
                                }
                                error={errors.date_birth}
                            />
                            <div>
                                <Label htmlFor="place_birth">
                                    Place of birth
                                </Label>
                                <Select
                                    value={barangayOptions.find(
                                        (option) =>
                                            option.value === selectedBarangay
                                    )}
                                    options={barangayOptions}
                                    onChange={(selectedOption) => {
                                        const value =
                                            selectedOption?.value || "";
                                        setSelectedBarangay(value);
                                        setData("place_birth", value); // <-- sync with form data
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <Link href="/birth_certificates">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
