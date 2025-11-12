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

    // Birth chart states
    const [birthLoading, setBirthLoading] = useState(true);
    const [birthChart, setBirthChart] = useState({
        series: [],
        options: {
            chart: { type: "pie", width: 380 },
            labels: [],
        },
    });

    // Marriage chart states
    const [marriageLoading, setMarriageLoading] = useState(true);
    const [marriageChart, setMarriageChart] = useState({
        series: [],
        options: {
            chart: { type: "pie", width: 380 },
            labels: [],
        },
    });

    // Death chart states
    const [deathLoading, setDeathLoading] = useState(true);
    const [deathChart, setDeathChart] = useState({
        series: [],
        options: {
            chart: { type: "pie", width: 380 },
            labels: [],
        },
    });

    // Fetch Birth stats
    useEffect(() => {
        setBirthLoading(true);
        axios
            .get(`${API_URL}/api/birth-certificates/stats`)
            .then((res) => {
                const data = res.data;
                const series = data.map((item) => item.total);
                const labels = data.map((item) => item.place_birth);
                const colors = labels.map((_, i) => {
                    const hue = (i * 137.508) % 360;
                    return `hsl(${hue}, 70%, 50%)`;
                });

                setBirthChart({
                    series,
                    options: {
                        ...birthChart.options,
                        labels,
                        colors,
                        legend: { position: "right" },
                        tooltip: {
                            y: { formatter: (val) => `${val} total` },
                        },
                    },
                });
            })
            .catch((err) => console.error(err))
            .finally(() => setBirthLoading(false));
    }, []);

    // Fetch Marriage stats
    useEffect(() => {
        setMarriageLoading(true);
        axios
            .get(`${API_URL}/api/marriage-certificates/stats`)
            .then((res) => {
                const data = res.data;
                const series = data.map((item) => item.total);
                const labels = data.map((item) => item.place_marriage);
                const colors = labels.map((_, i) => {
                    const hue = (i * 157.5) % 360; // slightly different hue spacing
                    return `hsl(${hue}, 65%, 55%)`;
                });

                setMarriageChart({
                    series,
                    options: {
                        ...marriageChart.options,
                        labels,
                        colors,
                        legend: { position: "right" },
                        tooltip: {
                            y: { formatter: (val) => `${val} total` },
                        },
                    },
                });
            })
            .catch((err) => console.error(err))
            .finally(() => setMarriageLoading(false));
    }, []);

    // Fetch Death stats
    useEffect(() => {
        setMarriageLoading(true);
        axios
            .get(`${API_URL}/api/death-certificates/stats`)
            .then((res) => {
                const data = res.data;
                const series = data.map((item) => item.total);
                const labels = data.map((item) => item.place_death);
                const colors = labels.map((_, i) => {
                    const hue = (i * 157.5) % 360;
                    return `hsl(${hue}, 65%, 55%)`;
                });

                setDeathChart({
                    series,
                    options: {
                        ...deathChart.options,
                        labels,
                        colors,
                        legend: { position: "right" },
                        tooltip: {
                            y: { formatter: (val) => `${val} total` },
                        },
                    },
                });
            })
            .catch((err) => console.error(err))
            .finally(() => setDeathLoading(false));
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Summary Cards */}
            <div className="p-6 grid grid-cols-3 gap-4">
                {[
                    { title: "Total Birth Certificate", value: birth },
                    { title: "Total Marriage Certificate", value: marriage },
                    { title: "Total Death Certificate", value: death },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg border border-gray-300 shadow-md h-[140px] w-[300px]"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-500 text-white p-4 rounded-full">
                                <AiFillFileText size={30} />
                            </div>
                            <div>
                                <div className="h-[60px]">
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2">
                {/* Birth Chart */}
                <div className="p-6">
                    <h1 className="text-lg font-bold mb-4">
                        Birth Certificates Issued per Barangay
                    </h1>
                    {birthLoading ? (
                        <SkeletonCard />
                    ) : (
                        <ReactApexChart
                            options={birthChart.options}
                            series={birthChart.series}
                            type="pie"
                            width={420}
                        />
                    )}
                </div>

                {/* Marriage Chart */}
                <div className="p-6">
                    <h1 className="text-lg font-bold mb-4">
                        Marriage Certificates Issued per Barangay
                    </h1>
                    {marriageLoading ? (
                        <SkeletonCard />
                    ) : (
                        <ReactApexChart
                            options={marriageChart.options}
                            series={marriageChart.series}
                            type="pie"
                            width={420}
                        />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2">
                {/* Death Chart */}
                <div className="p-6">
                    <h1 className="text-lg font-bold mb-4">
                        Death Certificates Issued per Barangay
                    </h1>
                    {birthLoading ? (
                        <SkeletonCard />
                    ) : (
                        <ReactApexChart
                            options={deathChart.options}
                            series={deathChart.series}
                            type="pie"
                            width={420}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
