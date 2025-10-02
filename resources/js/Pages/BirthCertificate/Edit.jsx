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

const Edit = ({ birth }) => {
    const API_URL = useAppUrl();
    const birthId = birth.id;

    const [heads, setHeads] = useState([]);
    const [selectedSex, setSelectedSex] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");

    const { data, setData, patch, errors, reset, processing } = useForm({
        firstname: birth.firstname,
        middlename: birth.middlename,
        lastname: birth.lastname,
        sex: birth.sex,
        date_birth: birth.date_birth,
        place_birth: birth.place_birth,
        register_number: birth.register_number,
        date_of_registration: birth.date_of_registration,
        file: "",
    });

    useEffect(() => {
        setSelectedSex(birth.sex || "");
        setData("sex", birth.sex || "");
    }, [birth.sex]);

    const sexOptions = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
    ];

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
        formData.append("register_number", data.register_number);
        formData.append("date_of_registration", data.date_of_registration);
        formData.append("file", data.file);

        try {
            const response = await await axios.post(
                `${API_URL}/api/update_birthcertificate/${birthId}`,
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
                alert("Birth certificate record updated successfully!");
                window.location.reload();
                // reset();
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
                    Family Member
                </h2>
            }
        >
            <Head title="Family Members" />
            <div className=" flex justify-center mb-5">
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

                <div className="border border-gray-400 w-[620px] rounded-md ">
                    <form onSubmit={onSubmit} className="px-6 py-4 space-y-4">
                        <h2 className="text-2xl">Edit Birth Certificate</h2>
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
                                        (option) => option.value === data.sex
                                    )}
                                    options={sexOptions}
                                    onChange={(selectedOption) =>
                                        setData(
                                            "sex",
                                            selectedOption?.value || ""
                                        )
                                    }
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
                                <Label htmlFor="place_birth">Barangay</Label>
                                <Select
                                    value={barangayOptions.find(
                                        (option) =>
                                            option.value === data.place_birth
                                    )}
                                    options={barangayOptions}
                                    onChange={(selectedOption) =>
                                        setData(
                                            "place_birth",
                                            selectedOption?.value || ""
                                        )
                                    }
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
