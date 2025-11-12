import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import UseAppUrl from "@/hooks/UseAppUrl";
import SkeletonCard from "@/Components/SkeletonCard";
import { AiFillFileText } from "react-icons/ai";

export default function Dashboard({ birth, marriage, death }) {
    const API_URL = UseAppUrl();
    const [chartLoading, setChartLoading] = useState(true);
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: { type: "pie", width: 380 },
            labels: [],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: { width: 200 },
                        legend: { position: "bottom" },
                    },
                },
            ],
        },
    });

    useEffect(() => {
        setChartLoading(true);

        axios
            .get(`${API_URL}/api/birth-certificates/stats`)
            .then((res) => {
                const data = res.data;

                // Map data to series and labels
                const series = data.map((item) => item.total);
                const labels = data.map((item) => item.place_birth);

                // Generate unique color for each barangay using golden angle
                const colors = labels.map((_, index) => {
                    const hue = (index * 137.508) % 360; // distribute hues evenly
                    return `hsl(${hue}, 70%, 50%)`;
                });

                setChartData({
                    series,
                    options: {
                        ...chartData.options,
                        labels,
                        colors, // 👈 assign unique colors
                        legend: {
                            position: "right",
                            labels: {
                                colors: "#333",
                                useSeriesColors: false,
                            },
                        },
                        tooltip: {
                            y: {
                                formatter: (val) => `${val} total`,
                            },
                        },
                    },
                });
            })
            .catch((err) => console.error(err))
            .finally(() => setChartLoading(false));
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Birth Certificates
                </h2>
            }
        >
            <Head title="Birth Certificates Dashboard" />

            <div className="p-6 grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-md h-[140px] w-[300px]">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-500 text-white p-4 rounded-full">
                            <AiFillFileText size={30} />
                        </div>
                        <div>
                            <div className="h-[60px]">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Total Birth Certficate
                                </h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {birth}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-md h-[140px] w-[300px]">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-500 text-white p-4 rounded-full">
                            <AiFillFileText size={30} />
                        </div>
                        <div>
                            <div className="h-[60px]">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Total Marriage Certificate
                                </h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {marriage}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-l border border-gray-300 shadow-md h-[140px] w-[300px]">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-500 text-white p-4 rounded-full">
                            <AiFillFileText size={30} />
                        </div>
                        <div>
                            <div className="h-[60px]">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Total Death Certificate
                                </h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {death}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h1 className="text-lg font-bold mb-4">
                    Birth Certificates Issued per Barangay
                </h1>

                {chartLoading ? (
                    <SkeletonCard />
                ) : (
                    <ReactApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="pie"
                        width={420}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
