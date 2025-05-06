import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import React from "react";
import { Head, Link } from "@inertiajs/react";
import { DocumentPlusIcon, InformationCircleIcon } from "@heroicons/react/16/solid/index.js";

const RecordIndex = ({ programs }) => {
    return (
        <WorkerLayout>
            <Head title="Records" />

            <div className="p-2 md:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* General Records Card */}
                <div className="border rounded-md shadow-sm overflow-hidden">
                    <div className="bg-green-100 p-4 md:p-6 lg:p-8">
                        <h1 className="text-lg md:text-xl font-medium">General Records</h1>
                        <p className="mt-1 text-sm text-gray-700">All initial records of all children.</p>
                    </div>

                    <div className="border-t p-4">
                        <Link href="/health_workers/records/general/create" className="flex justify-end p-2">
                            <InformationCircleIcon className="h-6 w-6 text-green-800" aria-label="General Record Information" />
                            <DocumentPlusIcon className="w-6 h-6 text-green-800 ml-2" aria-label="Create General Record" />
                        </Link>
                    </div>
                </div>

                {/* Program Cards */}
                {programs.map((program) => (
                    <div key={program.id} className="border rounded-md shadow-sm overflow-hidden">
                        <div className="bg-green-100 p-8">
                            <h1 className="text-lg md:text-xl font-medium">{program.title}</h1>
                            <p className="mt-1 text-sm text-gray-700">{program.description}</p>
                        </div>

                        <div className="border-t p-4">
                            <span className="text-sm font-medium text-gray-500">
                                {program.description.length > 100
                                    ? `${program.description.slice(0, 100)}...`
                                    : program.description}
                            </span>
                        </div>

                        <div className="border-t p-4">
                            <Link
                                href={`/health_workers/records/${program.id}`}
                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md border  text-emerald-600 hover:bg-emerald-50 transition duration-200"
                            >
                                <DocumentPlusIcon className="w-4 h-4" />
                                <span>Add Record</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </WorkerLayout>
    );
};

export default RecordIndex;
