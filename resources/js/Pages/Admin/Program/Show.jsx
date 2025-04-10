import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, Link } from "@inertiajs/react";
import { HomeIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/20/solid/index.js";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';


const Show = ({ program, beneficiaries }) => {
    // Function to calculate age from the birthdate
    const calculateAge = (birthdate) => {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // Breadcrumb navigation bar for the top of the page
    const pages = [
        { name: 'Programs', href: '/programs', current: false },
        { name: program.title, href: `/programs/${program.id}`, current: false },
    ];

    // Handle edit action (currently just logs the row, can be expanded)
    const handleEdit = (row) => {
        console.log('Edit clicked for: ', row);
        // Handle the edit functionality, such as opening a modal or redirecting
    };

    // Handle delete action with SweetAlert confirmation
    const handleDelete = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with the deletion logic here, such as calling an API
                console.log('Delete clicked for: ', row);
                Swal.fire(
                    'Deleted!',
                    'The beneficiary has been deleted.',
                    'success'
                );
            }
        });
    };

    // Define the columns for the DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fullName', headerName: 'Full Name', width: 400 },
        { field: 'age', headerName: 'Age', type: 'number', width: 100 },
        { field: 'gender', headerName: 'Gender', width: 180 },
        { field: 'address', headerName: 'Address', width: 440 },
        { field: 'status', headerName: 'Status', width: 140 },

        // Action column with Edit and Delete buttons
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <div className="flex items-center gap-x-2 pt-4">
                    {/* Edit Button */}
                    <button
                        onClick={() => handleEdit(params.row)}
                        style={{ marginRight: '10px' }}
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            style={{ width: '24px', height: '24px' }}  // Explicitly set the width and height
                        >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"></path>
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"></path>
                        </svg>
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={() => handleDelete(params.row)}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        {/* Delete SVG Icon */}
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            style={{ width: '24px', height: '24px' }} // Correct placement of style
                        >
                            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"></path>
                            <path clipRule="evenodd" fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"></path>
                        </svg>
                    </button>
                </div>
            ),
        }
    ];

    // Mapping beneficiaries to rows with their data (including calculated age)
    const rows = beneficiaries.map((beneficiary) => ({
        id: beneficiary.children.parent.id,  // Unique identifier for the beneficiary
        fullName: beneficiary.children.name,
        age: calculateAge(beneficiary.children.birth_date),  // Calculate age based on birthdate
        gender: beneficiary.children.gender,
        address: beneficiary.children.parent.address,
        status: beneficiary.status,  // Assuming status is part of the beneficiary data
    }));

    // State for pagination control
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    // Total row count (in this case, it's the length of beneficiaries)
    const totalRowCount = beneficiaries.length;

    // Handle page change in DataGrid
    const handlePageChange = (newPage) => {
        setPaginationModel((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    // Handle page size change in DataGrid
    const handlePageSizeChange = (newPageSize) => {
        setPaginationModel((prev) => ({
            ...prev,
            pageSize: newPageSize,
        }));
    };

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col h-screen py-4 pr-4 pl-2">
                {/* Breadcrumb navigation */}
                <nav aria-label="Breadcrumb" className="flex">
                    <ol role="list" className="flex items-center space-x-4">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <HomeIcon className="size-5 shrink-0" />
                                <span className="sr-only">Home</span>
                            </a>
                        </li>
                        {pages.map((page) => (
                            <li key={page.name}>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="size-5 text-gray-400" />
                                    <a href={page.href} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                        {page.name}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>

                

                <di className="bg-white my-4 ring-1 shadow-sm ring-black/5 sm:rounded-lg py-8 px-4">
                    <h1>{program.title}</h1>
                </di>
                <div className='flex justify-end'>
                    <Link href={`/programs/${program.id}/add_beneficiaries`}>
                        <button className="flex gap-2 bg-[#01DAA2] rounded-full px-4 py-2 text-white hover:bg-green-400">
                            <span>
                                <PlusIcon className="h-6 w-6 text-" />
                            </span>
                            Add new Program
                        </button>
                    </Link>
                </div>
                <div className='mt-4'>
                    <Paper sx={{ height: 800, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pagination
                            paginationMode="server"
                            pageSize={paginationModel.pageSize}
                            page={paginationModel.page}
                            rowCount={totalRowCount}  // Total number of rows for pagination
                            pageSizeOptions={[5, 10, 25, 50, 100]}  // Pagination options
                            checkboxSelection
                            onPageChange={handlePageChange}  // Handle page change
                            onPageSizeChange={handlePageSizeChange}  // Handle page size change
                            sx={{ border: 0 }}
                        />
                    </Paper>    
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
