import { useMemo } from "react";

const useAppUrl = () => {
    // Define the URL constants for offline and online environments
    const appUrl = "http://localhost:8000";
    //const appUrl = "http://filesystem.chael.online";

    const API_URL = useMemo(() => {
        return appUrl;
    }, []);

    return API_URL;
};

export default useAppUrl;
