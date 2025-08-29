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

const Index = () => {
    const {
        data: head_paginate,
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
        queryKey: "paginate_heads",
        endpoint: "family_heads",
    });

    console.log(head_paginate);

    const columns = [
        { key: "lastname", label: "Name of Family Head" },
        { key: "barangay", label: "Barangay" },
        { key: "municipality", label: "Municipality" },

        { key: "", label: "Action" },
    ];

    const deleteFamilyHead = async (familyHeadId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this family head?"
        );
        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `/family_heads/${familyHeadId}`
                );

                // ✅ Only show success if status = 200
                if (response.status === 200) {
                    alert(response.data.message);
                    window.location.reload();
                } else {
                    alert("Something went wrong. Please try again later.");
                }
            } catch (error) {
                console.error(error);

                // ✅ Handle Laravel error messages
                if (error.response?.data?.message) {
                    alert(error.response.data.message);
                } else {
                    alert(
                        "An unexpected error occurred. Please try again later."
                    );
                }
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Family Heads
                </h2>
            }
        >
            <Head title="Family Heads" />
            <div className="mx-auto max-w-7xl px-4 mt-5">
                <div className="mb-5 font-semibold">
                    <h3>Family Head Section</h3>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex w-full max-w-md">
                        <Input
                            type="text"
                            placeholder="Search by lastname..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <Link href="/family_heads/create">
                        <Button className="ml-4 ">
                            <AiOutlinePlus />
                            Add Family Head
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
                            {head_paginate?.data?.map((head, index) => (
                                <TableRow key={index} className="border-2">
                                    <TableCell className="border-2 py-0 px-2">
                                        {`${head.lastname}, ${head.firstname} ${
                                            head.middlename ?? ""
                                        }`}
                                    </TableCell>
                                    <TableCell className="border-2 py-0 px-2">
                                        {head.barangay.barangay_name}
                                    </TableCell>
                                    <TableCell className="border-2 py-0 px-2">
                                        {head.municipality}
                                    </TableCell>
                                    <TableCell className="border-2 py-0 px-2">
                                        {head.province}
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

                                                <Link
                                                    className="hover:bg-blue-800 hover:rounded hover:text-white"
                                                    href={route(
                                                        "family_heads.edit",
                                                        {
                                                            id: head.id,
                                                        }
                                                    )}
                                                >
                                                    <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>

                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        deleteFamilyHead(
                                                            head.id
                                                        )
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
