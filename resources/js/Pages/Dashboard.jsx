import { AiFillFileText } from "react-icons/ai";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { MdAccountCircle } from "react-icons/md";

export default function Page({ birth, marriage, death }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="p-6 grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-md h-[140px] w-[300px]">
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
                <div className="bg-white p-6 rounded-xl shadow-md h-[140px] w-[300px]">
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
                <div className="bg-white p-6 rounded-xl shadow-md h-[140px] w-[300px]">
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
        </AuthenticatedLayout>
    );
}
