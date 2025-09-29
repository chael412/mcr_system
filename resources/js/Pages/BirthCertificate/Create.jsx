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

const Create = () => {
    const API_URL = useAppUrl();
    const [heads, setHeads] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [selectedFamilyHeadId, setSelectedFamilyHeadId] = useState("");
    const [selectedSex, setSelectedSex] = useState("");

    const { data, setData, post, errors, reset, processing } = useForm({
        register_number: "",
        date_of_registration: "",
        firstname: "",
        middlename: "",
        lastname: "",
        sex: "",
        date_birth: "",
        place_birth: "",
        father_name: "",
        mother_name: "",
        file: "",
    });

    const handleFileChange = (e) => {
        setData("file", e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstname", data.firstname);
        formData.append("middlename", data.middlename);
        formData.append("lastname", data.lastname);
        formData.append("sex", data.sex);
        formData.append("date_birth", data.date_birth);
        formData.append("place_birth", data.place_birth);
        formData.append("father_name", data.father_name);
        formData.append("mother_name", data.mother_name);
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
                alert("Birth certificate record added successfully!");
                window.location.reload();
                // reset();
            }
        } catch (error) {
            console.error("Error saving data:", error.response?.data || error);
        }
    };

    const sexOptions = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
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
                            <FormField
                                id="place_birth"
                                label="Place of Birth"
                                value={data.place_birth}
                                onChange={(e) =>
                                    setData("place_birth", e.target.value)
                                }
                                error={errors.place_birth}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                id="father_name"
                                label="Name of Father"
                                value={data.father_name}
                                onChange={(e) =>
                                    setData("father_name", e.target.value)
                                }
                                error={errors.father_name}
                            />
                            <FormField
                                id="mother_name"
                                label="Name of Mother"
                                value={data.mother_name}
                                onChange={(e) =>
                                    setData("mother_name", e.target.value)
                                }
                                error={errors.mother_name}
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <Link href="/family_members">
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
