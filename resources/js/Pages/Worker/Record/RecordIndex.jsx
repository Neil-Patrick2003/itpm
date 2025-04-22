import React, { useEffect, useState } from 'react';
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { debounce } from "@mui/material";

const RecordIndex = ({ records, search = '', page = 1 }) => {
    function calculateAge(birth_date) {
        const birthDateObj = new Date(birth_date);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDifference = today.getMonth() - birthDateObj.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
    }

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (search) {
            setSearchTerm(search);
        }
    }, []);

    const handleSearchTermChange = (value) => {
        setSearchTerm(value);

        const debouncedSearchTerm = debounce(() => {
            const query = { page, search: value };
            router.get('/health_workers/records', query, {
                preserveState: true,
                replace: true
            });
        }, 500);

        debouncedSearchTerm();

        return () => debouncedSearchTerm.cancel();
    };

    const pages = [
        { name: 'Records', href: '/health_workers/records', current: false },
    ];

    const [deletingUser, setDeletingUser] = useState(null);
    const { delete: deleteUser } = useForm();

    const handleDeleteUser = () => {
        deleteUser(`/users/${deletingUser.id}`, {
            onSuccess: () => {
                'message', 'success';
            },
            onError: () => {
                alert("Error deleting the user.");
            }
        });
    };

    return (
        <WorkerLayout>
            <Head title="Records" />
            <div className="p-4 min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">Records</h1>
                        <p className="mt-1 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email and role.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
                        <input
                            value={searchTerm}
                            type="text"
                            name="Search"
                            onChange={(e) => handleSearchTermChange(e.target.value)}
                            className="border-2 border-green-500 rounded-full h-10 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 w-full sm:w-64"
                            placeholder="Search..."
                        />

                        <Link
                            href="/health_workers/records/create"
                            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-green-500 focus:outline-none"
                        >
                            Add Record
                        </Link>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-md">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Height (cm)</th>
                                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Weight (kg)</th>
                                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Gender</th>
                                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Guardian</th>
                                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Contact Number</th>
                                    <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-900">Action</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {records.data.map((record) => (
                                    <tr key={record.id}>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(record.created_at).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-600 whitespace-nowrap">{record.children_name}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{calculateAge(record.birth_date)}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.height}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.weight}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.gender}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.address}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.parent_name}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{record.phone_number}</td>
                                        <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
                                            <Link
                                                href={`/health_workers/records/${record.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-end gap-2 px-4 py-4">
                    {records.links.map((link) =>
                        link.url ? (
                            <Link
                                key={link.label}
                                href={link.url}
                                className={`px-4 py-2 text-sm font-medium rounded-md border border-gray-300 shadow-md transition-all duration-200
                                    ${link.active
                                    ? "bg-green-600 text-white font-bold hover:bg-green-500"
                                    : "bg-white text-gray-700 hover:bg-green-50"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                key={link.label}
                                className="px-4 py-2 text-sm font-medium text-slate-400 bg-white border border-gray-300 shadow-md rounded-md cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    )}
                </div>
            </div>
        </WorkerLayout>
    );
};

export default RecordIndex;
