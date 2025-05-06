import React, { useState } from "react";
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

const ChildrenRecord = ({ beneficiaries }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBeneficiaries, setFilteredBeneficiaries] = useState(beneficiaries);
    const [isLoading, setIsLoading] = useState(false);

    // Filter the records based on search query
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
        }, 500); // Simulating a delay for loading
    };

    const hasData = filteredBeneficiaries.length > 0;

    return (
        <WorkerLayout title="Children Record">
            <div className="p-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Children Monitoring Records</h1>

                {/* Search Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by name..."
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Loading Spinner */}
                {isLoading && (
                    <div className="text-center py-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="inline-block w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full"
                        ></motion.div>
                    </div>
                )}

                {/* Table */}
                {hasData ? (
                    <div className="overflow-x-auto rounded-md shadow ring-1 ring-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-green-50">
                            <tr>
                                <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                                <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-700">Program</th>
                                <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-700">Action</th>
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
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(beneficiary.created_at).toLocaleDateString("en-GB")}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            {beneficiary.name}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                            {beneficiary.program.length > 0
                                                ? beneficiary.program.map((prog) => (
                                                    <p key={prog.id}>{prog.title}</p>
                                                ))
                                                : "No Program"}
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <Link
                                                href={`/health_workers/beneficiary/${beneficiary.id}`}
                                                className="inline-flex items-center gap-1 border border-green-500 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700 font-medium text-sm px-3 py-1.5 rounded-md transition-colors duration-150"
                                            >
                                                View
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
                        className="text-center py-20 text-gray-500 border border-dashed border-gray-300 rounded-md"
                    >
                        <p className="text-lg font-medium mb-2">No children records found</p>
                        <p className="text-sm">Once children are added to your assigned barangay, their records will appear here.</p>
                    </motion.div>
                )}
            </div>
        </WorkerLayout>
    );
};

export default ChildrenRecord;
