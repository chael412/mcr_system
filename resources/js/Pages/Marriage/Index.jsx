import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import TablePagination from "@/Components/table-pagination";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ClipLoader, FadeLoader } from "react-spinners";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronsUpDown, List } from "lucide-react";
import { compareAsc, format } from "date-fns";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import useAppUrl from "@/hooks/useAppUrl";

const Index = () => {
    const {
        data: birth_paginate,
        isLoading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        sortConfig,
        setSortConfig,
        totalPages,
        totalEntries,
    } = usePaginatedQuery({
        queryKey: "paginate_marriages",
        endpoint: "get_marriages",
    });

    const API_URL = useAppUrl();

    const columns = [
        { key: "register_number", label: "Register Number" },
        { key: "date_of_registration", label: "Date of Registration" },
        { key: "husband_lastname", label: "Husband Name" },
        { key: "wife_lastname", label: "Wife Name" },
        { key: "place_marriage", label: "Place Marriage" },
        { key: "", label: "Action" },
    ];

    // console.log("Member Paginate Data:", birth_paginate);

    const deleteMember = async (birthId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this marriage certificate record?"
        );

        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `${API_URL}/api/delete_marriage/${birthId}`
                );
                alert(response.data.message);
                window.location.reload();
            } catch (error) {
                console.error(error);
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    };

    const handlePrintPdf = (filePath) => {
        if (!filePath) {
            alert("No file uploaded for this record.");
            return;
        }

        const fileUrl = `${window.location.origin}/${filePath}`;
        const win = window.open(fileUrl, "_blank");
        if (win) {
            win.onload = () => win.print();
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Marriage Certificates
                </h2>
            }
        >
            <Head title="Birth Certificates" />
            <div className="mx-auto max-w-7xl px-4 mt-5">
                <div className="mb-5 font-semibold">
                    <h3>Marriage Certificate Section</h3>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex w-full max-w-md">
                        <Input
                            type="text"
                            placeholder="Search by husband or wife lastname..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <Link href="/marriage_certificates/create">
                        <Button className="ml-4 ">
                            <AiOutlinePlus />
                            Add New
                        </Button>
                    </Link>
                </div>

                <div className="h-[480px] overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-2 ">
                                {columns.map(({ key, label }) => (
                                    <TableHead
                                        key={key}
                                        className="cursor-pointer border-2 py-0 px-2"
                                        onClick={() =>
                                            setSortConfig({
                                                column: key,
                                                direction:
                                                    sortConfig.column === key &&
                                                    sortConfig.direction ===
                                                        "asc"
                                                        ? "desc"
                                                        : "asc",
                                            })
                                        }
                                    >
                                        <span
                                            className={`flex items-center gap-2 ${
                                                sortConfig.column === key
                                                    ? "text-blue-600 font-semibold"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span className="text-md font-bold">
                                                {label}
                                            </span>
                                            <ChevronsUpDown
                                                className="size-4"
                                                color={
                                                    sortConfig.column === key
                                                        ? "#2563eb"
                                                        : "currentColor"
                                                }
                                            />
                                        </span>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan="5">
                                        <span className="flex flex-col justify-center items-center py-4 text-green-800">
                                            fetching data...
                                            <ClipLoader
                                                color="#16a34a"
                                                size={42}
                                            />
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )}
                            {birth_paginate?.data?.map((member, index) => (
                                <TableRow key={index} className="border-2">
                                    <TableCell className="border-2 py-0 px-2">
                                        {member.register_number ?? ""}
                                    </TableCell>
                                    <TableCell className="border-2 py-0 px-2">
                                        {member.date_of_registration
                                            ? format(
                                                  new Date(
                                                      member.date_of_registration
                                                  ),
                                                  "dd-MMM-yyyy"
                                              ).toUpperCase()
                                            : member.date_of_registration ?? ""}
                                    </TableCell>
                                    <TableCell className="border-2 py-0 px-2">
                                        {member.husband_lastname},{" "}
                                        {member.husband_firstname}{" "}
                                        {member.husband_middlename ?? ""}
                                    </TableCell>
                                    <TableCell className="border-2 py-0 px-2">
                                        {member.wife_lastname},{" "}
                                        {member.wife_firstname}{" "}
                                        {member.wife_middlename ?? ""}
                                    </TableCell>
                                    <TableCell className="border-2 py-0 px-2">
                                        {member.place_marriage ?? "N/A"}
                                    </TableCell>

                                    <TableCell className="border-2 py-0 px-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button
                                                    variant="ghost"
                                                    className="hover:bg-green-200"
                                                >
                                                    <List color="#16a34a" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>
                                                    Action
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handlePrintPdf(
                                                            member.file
                                                        )
                                                    }
                                                    className="hover:bg-gray-200 cursor-pointer"
                                                >
                                                    Print File
                                                </DropdownMenuItem>

                                                <Link
                                                    className="hover:bg-blue-800 hover:rounded hover:text-white"
                                                    href={route(
                                                        "marriage_certificates.edit",
                                                        {
                                                            id: member.id,
                                                        }
                                                    )}
                                                >
                                                    <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>

                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        deleteMember(member.id)
                                                    }
                                                    className="hover:bg-gray-200 cursor-pointer"
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-5">
                    <span className="text-sm font-medium">
                        {" "}
                        {`${totalEntries} total entries`}
                    </span>

                    <TablePagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
