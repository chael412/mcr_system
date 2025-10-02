// resources/js/Components/SkeletonCard.jsx
import React from "react";

export default function SkeletonCard({ width = "100%", height = "140px" }) {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded-lg`}
            style={{ width, height }}
        >
            <div className="flex flex-col justify-center items-center h-full p-4 space-y-2">
                <div className="bg-gray-300 rounded w-1/3 h-6"></div>
                <div className="bg-gray-300 rounded w-2/3 h-4"></div>
                <div className="bg-gray-300 rounded w-1/2 h-4"></div>
            </div>
        </div>
    );
}
