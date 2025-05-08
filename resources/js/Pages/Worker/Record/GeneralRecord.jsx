import React from "react";
import { Link } from "@inertiajs/react";
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import DynamicEmptyEstate from "@/Components/DynamicEmptyEstate.jsx";
import {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    UserIcon,
    HeartIcon,
    PlusIcon
} from "@heroicons/react/24/solid";

const GeneralRecord = ({
                           programs,
                           records,
                           underweight_count,
                           normal_count,
                           overweight_count,
                           obese_count
                       }) => {
    const hasData = records?.data?.length > 0;

    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    const statCards = [
        { title: "Normal", value: normal_count, icon: HeartIcon },
        { title: "Underweight", value: underweight_count, icon: ArrowTrendingDownIcon },
        { title: "Overweight", value: overweight_count, icon: ArrowTrendingUpIcon },
        { title: "Obese", value: obese_count, icon: UserIcon }
    ];

    return (
        <WorkerLayout>
            <div className="p-4 mt-8 space-y-8">
                {/* Page Title */}
                <div>
                    <h1 className="text-2xl font-semibold text-green-800">General Records</h1>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map(({ title, value, icon: Icon }) => (
                        <div
                            key={title}
                            className="bg-green-50 border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-2 rounded-full bg-green-100 text-green-600">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-green-800 font-semibold">{title}</p>
                                    <h2 className="text-2xl font-semibold text-green-800">{value}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Record Button */}
                <div className="flex justify-end">
                    <Link href="/health_workers/records/general/new_record">
                        <button className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition">
                            <PlusIcon className="w-5 h-5" />
                            Add New Record
                        </button>
                    </Link>
                </div>

                {/* Records Table or Empty State */}
                {!hasData ? (
                    <DynamicEmptyEstate
                        title="No records yet"
                        description="Add a new record and start improving health"
                        icon={null}
                        logo={null}
                        actionLabel="Add New Record"
                        onActionClick={() => {}}
                    />
                ) : (
                    <div className="overflow-x-auto shadow-sm ring-1 ring-black/5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 bg-white">
                            <thead className="bg-green-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-green-800">Children Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-green-800">Age</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-green-800">Gender</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-green-800">Height</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-green-800">Weight</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-green-800">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {records.data.map((record) => (
                                <tr key={record.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{calculateAge(record.birth_date)} years old</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{record.gender}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{record.latest_record?.height ?? "N/A"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{record.latest_record?.weight ?? "N/A"}</td>
                                    <td className="px-6 py-4 text-right text-sm">
                                        <a href="#" className="text-green-700 font-semibold hover:underline">Edit</a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-end gap-2 mt-4">
                    {records.links.map((link, i) =>
                        link.url ? (
                            <Link
                                key={i}
                                href={link.url}
                                className={`px-4 py-2 text-sm rounded-md border font-semibold transition ${
                                    link.active
                                        ? "bg-green-100 text-green-800 border-green-300"
                                        : "bg-white text-green-700 border-green-200 hover:bg-green-50"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                key={i}
                                className="px-4 py-2 text-sm text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    )}
                </div>
            </div>
        </WorkerLayout>
    );
};

export default GeneralRecord;
