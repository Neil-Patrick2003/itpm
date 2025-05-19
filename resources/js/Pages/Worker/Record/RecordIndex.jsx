import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import React from "react";
import { Head, Link } from "@inertiajs/react";
import { DocumentPlusIcon } from "@heroicons/react/16/solid";

const RecordIndex = ({ programs }) => {
    return (
        <WorkerLayout>
            <Head title="Records" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                
                {/* General Records Card */}
                <div className="bg-white border rounded-lg shadow hover:shadow-md transition">
                    <div className="p-6 bg-green-50">
                        <h2 className="text-xl font-semibold text-emerald-700">General Records</h2>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                            All initial records of all children.
                        </p>
                    </div>
                    <div className="border-t p-4 flex justify-end">
                        <Link
                            href="/health_workers/records/general/create"
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded border text-emerald-600 hover:bg-emerald-50"
                        >
                            <DocumentPlusIcon className="w-4 h-4" />
                            Add Record
                        </Link>
                    </div>
                </div>

                {/* Program Cards */}
                {programs.map((program) => (
                    <div key={program.id} className="bg-white border rounded-lg shadow hover:shadow-md transition">
                        <div className="p-6 bg-green-50">
                            <h2 className="text-xl font-semibold text-emerald-700">{program.title}</h2>
                            <p className="mt-2 text-sm text-gray-600 line-clamp-1">
                                {program.description}
                            </p>
                        </div>
                        <div className="border-t p-4 flex justify-end">
                            <Link
                                href={`/health_workers/records/${program.id}`}
                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded border text-emerald-600 hover:bg-emerald-50"
                            >
                                <DocumentPlusIcon className="w-4 h-4" />
                                Add Record
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </WorkerLayout>
    );
};

export default RecordIndex;
