import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, Link } from "@inertiajs/react";
import { HomeIcon } from "@heroicons/react/20/solid/index.js";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const Show = ({ program, beneficiaries }) => {
    // Function to calculate age from the birthdate
    function calculateAge(birthdate) {
        const birthDate = new Date(birthdate);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age; // return the calculated age
    }

    // Breadcrumbs
    const pages = [
        { name: 'Programs', href: '/programs', current: false },
        { name: program.title, href: `/programs/${program.id}`, current: false },
    ];

    // Define columns for the DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fullName', headerName: 'Full Name', width: 400 },
        { field: 'age', headerName: 'Age', type: 'number', width: 100 },
        { field: 'gender', headerName: 'Gender', width: 180 },
        { field: 'address', headerName: 'Address', width: 440 },
        { field: 'status', headerName: 'Status', width: 140 },
        { field: 'action', headerName: 'Action', width: 200 },
    ];

    console.log(beneficiaries);
    // Mapping beneficiaries to rows with proper ID and calculated age
    const rows = beneficiaries.map((beneficiary) => ({
        fullName: beneficiary.children.parent.address,
        age: calculateAge(beneficiary.children.birth_date),  // Use the correct birthdate field



    }));

    // State for pagination
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    // Total row count (this could be passed as a prop or fetched via API)
    const totalRowCount = beneficiaries.length; // Example, replace with actual total count

    // Handle page change
    const handlePageChange = (newPage) => {
        setPaginationModel((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize) => {
        setPaginationModel((prev) => ({
            ...prev,
            pageSize: newPageSize,
        }));
    };

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col h-screen py-4 pr-4 pl-2">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex border-b mb-4 border-gray-200 bg-[#01DAA2] mb-2">
                    <ol role="list" className="mx-auto flex w-full space-x-4 px-4 sm:px-6 lg:px-8">
                        <li className="flex">
                            <div className="flex items-center">
                                <a href="#" className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                                    <span className="sr-only">Home</span>
                                </a>
                            </div>
                        </li>
                        {pages.map((page) => (
                            <li key={page.name} className="flex">
                                <div className="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 24 44"
                                        preserveAspectRatio="none"
                                        aria-hidden="true"
                                        className="h-full w-6 shrink-0 text-white"
                                    >
                                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                    </svg>
                                    <a
                                        href={page.href}
                                        aria-current={page.current ? 'page' : undefined}
                                        className="ml-4 text-sm font-medium text-white hover:text-green-600"
                                    >
                                        {page.name}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Program Header */}
                <div className="overflow-hidden h-28 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                        <div className="flex flex-col">
                            <h1 className="sm:text-md md:text-lg lg:text-xl font-bold">{program.title}</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the users in your account including their name, title, email, and role.
                            </p>
                        </div>
                        <div>
                            <Link href={`/programs/${program.id}/add_beneficiaries`}>
                                Add Beneficiaries
                            </Link>
                        </div>
                    </div>
                </div>

                {/* DataGrid Table */}
                <div className="bg-white mt-2 h-full">
                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pagination
                            paginationMode="server"
                            pageSize={paginationModel.pageSize}
                            page={paginationModel.page}
                            rowCount={totalRowCount} // Ensure total row count is passed for server pagination
                            pageSizeOptions={[5, 10, 25, 50, 100]}  // Add 100 here
                            checkboxSelection
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
