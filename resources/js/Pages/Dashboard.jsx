import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { MdAccountCircle } from "react-icons/md";

export default function Page({ family_members, family_heads }) {
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
                            <MdAccountCircle size={30} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">
                                Total Family Member
                            </h3>
                            <p className="text-2xl font-bold text-gray-900">
                                {family_members}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md h-[140px] w-[300px]">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-500 text-white p-4 rounded-full">
                            <MdAccountCircle size={30} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">
                                Total Family Head
                            </h3>
                            <p className="text-2xl font-bold text-gray-900">
                                {family_heads}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
