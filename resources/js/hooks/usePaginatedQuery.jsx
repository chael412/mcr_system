import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseAppUrl from "@/hooks/UseAppUrl";

const usePaginatedQuery = ({
    queryKey,
    endpoint,
    queryParams = {},
    options = {},
}) => {
    const API_URL = UseAppUrl();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({
        column: "",
        direction: "asc",
    });

    const fetchData = async ({ queryKey }) => {
        const [_key, page, query, sortColumn, sortDirection, extraParams] =
            queryKey;

        const response = await axios.get(`${API_URL}/api/${endpoint}`, {
            params: {
                page,
                search: query,
                sortColumn,
                sortDirection,
                ...extraParams, // include any additional query params
            },
        });
        return response.data;
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [
            queryKey,
            currentPage,
            searchQuery,
            sortConfig.column,
            sortConfig.direction,
            queryParams, // 👈 include this so changes to effectivity_date can trigger refetch
        ],
        queryFn: fetchData,
        keepPreviousData: true,
        ...options,
    });

    return {
        data,
        error,
        isLoading,
        refetch,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        sortConfig,
        setSortConfig,
        totalPages: data?.last_page ?? 1,
        totalEntries: data?.total ?? 0,
    };
};

export default usePaginatedQuery;
