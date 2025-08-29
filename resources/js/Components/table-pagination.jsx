import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const TablePagination = ({ currentPage, setCurrentPage, totalPages }) => {
    if (totalPages <= 1) return null; // Hide pagination if only 1 page

    const pageNumbers = [];
    const delta = 2; // Range around the current page

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            pageNumbers.push(i);
        } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
            pageNumbers.push("...");
        }
    }

    return (
        <Pagination>
            <PaginationContent>
                {/* First Button */}
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(1);
                        }}
                        disabled={currentPage === 1}
                    >
                        <AiOutlineDoubleLeft />
                    </PaginationLink>
                </PaginationItem>

                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((prev) => Math.max(prev - 1, 1));
                        }}
                        disabled={currentPage === 1}
                    />
                </PaginationItem>

                {/* Page Numbers with Ellipsis */}
                {pageNumbers.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "..." ? (
                            <span className="px-2">...</span>
                        ) : (
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            );
                        }}
                        disabled={currentPage === totalPages}
                    />
                </PaginationItem>

                {/* Last Button */}
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(totalPages);
                        }}
                        disabled={currentPage === totalPages}
                    >
                        <AiOutlineDoubleRight />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default TablePagination;
