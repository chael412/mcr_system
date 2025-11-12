import { AiOutlinePlus } from "react-icons/ai";
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

const Edit = ({ marriage }) => {
    const API_URL = useAppUrl();
    const birthId = marriage.id;

    const { data, setData, patch, errors, reset, processing } = useForm({
        register_number: marriage.register_number || "",
        date_of_registration: marriage.date_of_registration || "",
        husband_firstname: marriage.husband_firstname || "",
        husband_middlename: marriage.husband_middlename || "",
        husband_lastname: marriage.husband_lastname || "",
        wife_firstname: marriage.wife_firstname || "",
        wife_middlename: marriage.wife_middlename || "",
        wife_lastname: marriage.wife_lastname || "",
        place_marriage: marriage.place_marriage,
        file: "",
    });

    const handleFileChange = (e) => {
        setData("file", e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("husband_firstname", data.husband_firstname);
        formData.append("husband_middlename", data.husband_middlename);
        formData.append("husband_lastname", data.husband_lastname);
        formData.append("wife_firstname", data.wife_firstname);
        formData.append("wife_middlename", data.wife_middlename);
        formData.append("wife_lastname", data.wife_lastname);
        formData.append("register_number", data.register_number);
        formData.append("date_of_registration", data.date_of_registration);
        formData.append("place_marriage", data.place_marriage);
        formData.append("file", data.file);

        try {
            const response = await await axios.post(
                `${API_URL}/api/update_marriagecertificate/${birthId}`,
                formData,
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "multipart/form-data",
                        "X-HTTP-Method-Override": "PUT", // or PATCH, depending on your API
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.error(
                "Error updating data:",
                error.response?.data || error
            );
        }
    };
    const barangayOptions = [
        { value: "N/A", label: "N/A" },
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
                    Marriage Certificates
                </h2>
            }
        >
            <Head title="Marriage Certificates" />
            <div className=" flex justify-center mb-5">
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

                <div className="border border-gray-400 w-[860px] rounded-md ">
                    <form onSubmit={onSubmit} className="px-6 py-4 space-y-4">
                        <h2 className="text-2xl">Edit Marriage Certificate</h2>
                        <hr />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="mt-2">
                                <Label htmlFor="file">File</Label>
                                <Input
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                            <div>
                                <Label htmlFor="place_marriage">Barangay</Label>
                                <Select
                                    value={barangayOptions.find(
                                        (option) =>
                                            option.value === data.place_marriage
                                    )}
                                    options={barangayOptions}
                                    onChange={(selectedOption) =>
                                        setData(
                                            "place_marriage",
                                            selectedOption?.value || ""
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <p>Husband Information</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <FormField
                                id="husband_firstname"
                                label="FirstName"
                                value={data.husband_firstname}
                                onChange={(e) =>
                                    setData("husband_firstname", e.target.value)
                                }
                                error={errors.husband_firstname}
                            />
                            <FormField
                                id="husband_middlename"
                                label="MiddleName"
                                value={data.husband_middlename}
                                onChange={(e) =>
                                    setData(
                                        "husband_middlename",
                                        e.target.value
                                    )
                                }
                                error={errors.husband_middlename}
                            />
                            <FormField
                                id="husband_lastname"
                                label="LastName"
                                value={data.husband_lastname}
                                onChange={(e) =>
                                    setData("husband_lastname", e.target.value)
                                }
                                error={errors.husband_lastname}
                            />
                        </div>
                        <hr />
                        <div>
                            <p>Wife Information</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <FormField
                                id="wife_firstname"
                                label="FirstName"
                                value={data.wife_firstname}
                                onChange={(e) =>
                                    setData("wife_firstname", e.target.value)
                                }
                                error={errors.wife_firstname}
                            />
                            <FormField
                                id="wife_middlename"
                                label="MiddleName"
                                value={data.wife_middlename}
                                onChange={(e) =>
                                    setData("wife_middlename", e.target.value)
                                }
                                error={errors.wife_middlename}
                            />
                            <FormField
                                id="wife_lastname"
                                label="LastName"
                                value={data.wife_lastname}
                                onChange={(e) =>
                                    setData("wife_lastname", e.target.value)
                                }
                                error={errors.wife_lastname}
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <Link href="/marriage_certificates">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2"
                            >
                                Update changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
