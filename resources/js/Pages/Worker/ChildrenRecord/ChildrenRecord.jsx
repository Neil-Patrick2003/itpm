import React, { useState } from "react";
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    EyeIcon,
    UserGroupIcon,
    ArrowTrendingUpIcon,
    UserIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";

const ChildrenRecord = ({ beneficiaries, total_children, improved_children, boys, girls }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBeneficiaries, setFilteredBeneficiaries] = useState(beneficiaries);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setIsLoading(true);

        setTimeout(() => {
            const filteredData = beneficiaries.filter((beneficiary) =>
                beneficiary.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredBeneficiaries(filteredData);
            setIsLoading(false);
        }, 500);
    };

    const calculateAge = (birthdate) => {
        if (!birthdate) return null;
        const birth = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    };

    const hasData = filteredBeneficiaries.length > 0;

    const statCards = [
        { title: "Total Children", value: total_children, icon: UserGroupIcon },
        { title: "Improved Children", value: improved_children, icon: ArrowTrendingUpIcon },
        { title: "Boys", value: boys, icon: UserIcon },
        { title: "Girls", value: girls, icon: UserCircleIcon },
    ];

    return (
        <WorkerLayout title="Children Record">
            <div className=" space-y-8">
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map(({ title, value, icon: Icon }) => (
                        <div key={title} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 rounded-full bg-green-100 text-green-600">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{title}</p>
                                    <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-800">Children Monitoring Records</h1>

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by name..."
                        className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z" />
                    </svg>
                </div>

                {/* Loading Spinner */}
                {isLoading && (
                    <div className="text-center py-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="inline-block w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full"
                        />
                    </div>
                )}

                {/* Table or Empty State */}
                {hasData ? (
                    <div className="overflow-x-auto rounded-lg shadow-sm">
                        <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
                            <thead className="bg-green-100 sticky top-0 z-10">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-green-800">ID</th>
                                <th className="py-3 px-4 text-left font-semibold text-green-800">Name</th>
                                <th className="py-3 px-4 text-left font-semibold text-green-800">Gender</th>
                                <th className="py-3 px-4 text-left font-semibold text-green-800">Age</th>
                                <th className="py-3 px-4 text-left font-semibold text-green-800">Program</th>
                                <th className="py-3 px-4 text-left font-semibold text-green-800">Remarks</th>
                                <th className="py-3 px-4 text-left font-semibold text-green-800">Action</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                            <AnimatePresence>
                                {filteredBeneficiaries.map((beneficiary, index) => (
                                    <motion.tr
                                        key={beneficiary.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-green-50 transition"
                                    >
                                        <td className="px-4 py-4 text-green-700 whitespace-nowrap">{beneficiary.id}</td>
                                        <td className="px-4 py-4 font-medium text-green-700 whitespace-nowrap">{beneficiary.name}</td>
                                        <td className="px-4 py-4 text-green-700 whitespace-nowrap">{beneficiary.gender}</td>
                                        <td className="px-4 py-4 text-green-700 whitespace-nowrap">
                                            {calculateAge(beneficiary.birth_date)} years old
                                        </td>
                                        <td className="px-4 py-4 text-green-700 whitespace-nowrap">
                                            {beneficiary.program.length > 0
                                                ? beneficiary.program.map((prog) => (
                                                    <p key={prog.id}>{prog.title}</p>
                                                ))
                                                : "No Program"}
                                        </td>
                                        <td className="px-4 py-4 text-green-700 whitespace-nowrap">
                                            {beneficiary.latest_bmi != null && beneficiary.current_bmi != null ? (
                                                beneficiary.current_bmi > beneficiary.latest_bmi
                                                    ? "Improved"
                                                    : beneficiary.current_bmi < beneficiary.latest_bmi
                                                        ? "Declined"
                                                        : "No Change"
                                            ) : (
                                                "No BMI Data"
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/health_workers/beneficiary/${beneficiary.id}`}
                                                className="inline-flex items-center bg-green-600 text-white hover:bg-green-700 px-3 py-1.5 rounded-md transition"
                                            >
                                                <EyeIcon className="h-4 w-4 mr-1" />
                                                View Profile
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-gray-300 rounded-md"
                    >
                        <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9.75 17l-4.5-4.5m0 0L9.75 8m-4.5 4.5H21" />
                        </svg>
                        <p className="text-lg font-medium mb-1">No children records found</p>
                        <p className="text-sm">Once children are added to your assigned barangay, their records will appear here.</p>
                    </motion.div>
                )}
            </div>
        </WorkerLayout>
    );
};

export default ChildrenRecord;
