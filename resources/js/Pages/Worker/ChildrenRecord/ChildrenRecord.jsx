import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { Link } from "@inertiajs/react";
import React from "react";

const ChildrenRecord = ({ beneficiaries }) => {
    console.log(beneficiaries); // Debugging

    return (
        <WorkerLayout>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                    <tr>
                        {/* Hidden on mobile (sm) */}
                        <th
                            scope="col"
                            className="sm:table-cell py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                            Date
                        </th>

                        <th
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                            Name
                        </th>

                        {/* Hidden on mobile (sm) */}
                        <th
                            scope="col"
                            className="sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            Program
                        </th>

                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            Action
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                    {beneficiaries.map((beneficiary) => (
                        <tr key={beneficiary.id}>
                            {/* Hidden on mobile (sm) */}
                            <td className="sm:table-cell sm:px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                {new Date(beneficiary.created_at).toLocaleDateString("en-GB")}
                            </td>

                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-600 sm:pl-6">
                                {beneficiary.name}
                            </td>

                            {/* Hidden on mobile (sm) */}
                            <td className="sm:table-cell sm:px-3 py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-600 sm:pl-6">
                                {beneficiary.program.map((program) => (
                                    <p className="flex flex-row" key={program.id}>
                                        {program.title}
                                    </p>
                                ))}
                            </td>

                            <td className="py-4 px-3 text-sm whitespace-nowrap text-gray-600">
                                <Link
                                    href={`/health_workers/beneficiary/${beneficiary.id}`}
                                    className="inline-flex items-center gap-1 border border-green-500 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700 font-medium text-sm px-3 py-1.5 rounded-md transition-colors duration-150"
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </WorkerLayout>
    );
};

export default ChildrenRecord;
