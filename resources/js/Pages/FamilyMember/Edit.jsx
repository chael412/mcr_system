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

const Edit = ({ member }) => {
    const API_URL = useAppUrl();
    const familyMemberId = member.id;

    const [heads, setHeads] = useState([]);
    const [selectedFamilyHeadId, setSelectedFamilyHeadId] = useState(
        member.register.family_head_id?.toString() || ""
    );

    const [selectedSex, setSelectedSex] = useState("");

    const { data, setData, patch, errors, reset, processing } = useForm({
        firstname: member.firstname,
        middlename: member.middlename,
        lastname: member.lastname,
        sex: member.sex,
        date_birth: member.date_birth,
        order_birth: member.order_birth,
        place_birth: member.place_birth,
        father_name: member.father_name,
        mother_name: member.mother_name,
        relationship_to_familyhead: member.relationship_to_familyhead,
        remarks: member.remarks,
        register_number: member.register.register_number,
        family_head_id: selectedFamilyHeadId,
        date_of_registration: member.register.date_of_registration,
        date_place_marriage: member.sex,
        birth_certificate: "",
    });

    const fetchHeads = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/familyhead_options`
            );
            setHeads(response.data);
        } catch (error) {
            console.error("Error fetching authors:", error);
            alert("Failed to fetch authors.");
        }
    };

    useEffect(() => {
        fetchHeads();
    }, []);

    useEffect(() => {
        setSelectedSex(member.sex || "");
        setData("sex", member.sex || "");
    }, [member.sex]);

    useEffect(() => {
        if (member.register?.family_head_id) {
            const id = member.register.family_head_id.toString();
            setSelectedFamilyHeadId(id);
            setData("family_head_id", id); // 👈 keep it string here
        }
    }, [member]);

    const headOptions = heads.map((head) => ({
        value: head.id.toString(),
        label:
            head.lastname +
            ", " +
            head.firstname +
            " " +
            (head.middlename || ""),
    }));

    const sexOptions = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
    ];

    const handleFileChange = (e) => {
        setData("birth_certificate", e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstname", data.firstname);
        formData.append("middlename", data.middlename);
        formData.append("lastname", data.lastname);
        formData.append("sex", data.sex);
        formData.append("date_birth", data.date_birth);
        formData.append("order_birth", data.order_birth);
        formData.append("place_birth", data.place_birth);
        formData.append("father_name", data.father_name);
        formData.append("mother_name", data.mother_name);
        formData.append(
            "relationship_to_familyhead",
            data.relationship_to_familyhead
        );
        formData.append("remarks", data.remarks);
        formData.append("register_number", data.register_number);

        // ✅ send converted integer family_head_id
        formData.append("family_head_id", parseInt(data.family_head_id, 10));

        formData.append("date_of_registration", data.date_of_registration);
        formData.append("date_place_marriage", data.date_place_marriage);
        formData.append("birth_certificate", data.birth_certificate);

        try {
            // console.log("Sending Payload:", {
            //     formData,
            //     family_head_id: parseInt(data.family_head_id, 10),
            // });

            const response = await await axios.post(
                `http://localhost:8000/api/update_familymember/${familyMemberId}`,
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
                alert("Family member updated successfully!");
                window.location.reload();
                // reset();
            }
        } catch (error) {
            console.error(
                "Error saving family member:",
                error.response?.data || error
            );
            alert("Failed to update family member.");
        }
    };

    console.log("member prop:", member);
    // console.log("Head Options:", headOptions);
    // console.log("selected head:", selectedFamilyHeadId);

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
                        <h2 className="text-2xl">Edit Family Member</h2>
                        <hr />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-6 mb-2">
                                    <Label htmlFor="family_head">
                                        Family Head
                                    </Label>
                                </div>
                                <input
                                    type="hidden"
                                    value={selectedFamilyHeadId}
                                    onChange={(e) =>
                                        setData(
                                            "family_head_id",
                                            e.target.value
                                        )
                                    }
                                />

                                <Select
                                    value={headOptions.find(
                                        (option) =>
                                            option.value ===
                                            selectedFamilyHeadId
                                    )}
                                    options={headOptions}
                                    onChange={(selectedOption) => {
                                        const value =
                                            selectedOption?.value || "";
                                        setSelectedFamilyHeadId(value);
                                        setData("family_head_id", value); // 👈 keep it string for consistency
                                    }}
                                />
                            </div>
                            <div>
                                <Label htmlFor="birth_certificate">
                                    Birth Certificate
                                </Label>
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
                                id="order_birth"
                                label="Order of Birth"
                                value={data.order_birth}
                                onChange={(e) =>
                                    setData("order_birth", e.target.value)
                                }
                                error={errors.order_birth}
                            />
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
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 ">
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
                        <div className="grid grid-cols-1 sm:grid-cols-1 ">
                            <FormField
                                id="date_place_marriage"
                                label="Date & Place of Marriage"
                                value={data.date_place_marriage}
                                onChange={(e) =>
                                    setData(
                                        "date_place_marriage",
                                        e.target.value
                                    )
                                }
                                error={errors.date_place_marriage}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                id="relationship_to_familyhead"
                                label="Relationship to Family Head"
                                value={data.relationship_to_familyhead}
                                onChange={(e) =>
                                    setData(
                                        "relationship_to_familyhead",
                                        e.target.value
                                    )
                                }
                                error={errors.relationship_to_familyhead}
                            />
                            <FormField
                                id="remarks"
                                label="Remarks"
                                value={data.remarks}
                                onChange={(e) =>
                                    setData("remarks", e.target.value)
                                }
                                error={errors.remarks}
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
