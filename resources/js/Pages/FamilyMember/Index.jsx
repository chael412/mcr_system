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
        data: member_paginate,
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
        queryKey: "paginate_members",
        endpoint: "family_members",
    });

    console.log(member_paginate);

    const columns = [
        { key: "register_number", label: "Register Number" },
        { key: "date_of_registration", label: "Date of Registration" },
        { key: "lastname", label: "Name of Family Member" },
        { key: "sex", label: "Sex" },
        { key: "date_birthdate", label: "Place Birthdate" },
        { key: "", label: "Action" },
    ];

    console.log("Member Paginate Data:", member_paginate);

    const deleteMember = async (memberId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this family member?"
        );

        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `/family_members/${memberId}`
                );
                alert(response.data.message);
                window.location.reload();
            } catch (error) {
                console.error(error);
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Family Members
                </h2>
            }
        >
            <Head title="Family Members" />
            <div className="mx-auto max-w-7xl px-4 mt-5">
                <div className="mb-5 font-semibold">
                    <h3>Family Member Section</h3>
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

                    <Link href="/family_members/create">
                        <Button className="ml-4 ">
                            <AiOutlinePlus />
                            Add Family Member
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
                            {member_paginate?.data?.map((member, index) => (
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
                                        {member.family_member.lastname},{" "}
                                        {member.family_member.firstname}{" "}
                                        {member.family_member.middlename ?? ""}
                                    </TableCell>
                                    <TableCell className="border-2 py-0 px-2">
                                        {member.family_member.sex}
                                    </TableCell>
                                    <TableCell className="border-2 py-0 px-2">
                                        {member.family_member.date_birth
                                            ? format(
                                                  new Date(
                                                      member.family_member.date_birth
                                                  ),
                                                  "dd-MMM-yyyy"
                                              ).toUpperCase()
                                            : "n/a"}
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
                                                        "family_members.show",
                                                        {
                                                            id: member
                                                                .family_member
                                                                .id,
                                                        }
                                                    )}
                                                >
                                                    <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">
                                                        View Details
                                                    </DropdownMenuItem>
                                                </Link>

                                                <Link
                                                    className="hover:bg-blue-800 hover:rounded hover:text-white"
                                                    href={route(
                                                        "family_members.edit",
                                                        {
                                                            id: member
                                                                .family_member
                                                                .id,
                                                        }
                                                    )}
                                                >
                                                    <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>

                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        deleteMember(
                                                            member.family_member
                                                                .id
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
