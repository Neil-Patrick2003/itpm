import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import {Head, Link, useForm} from "@inertiajs/react";
import { HomeIcon } from "@heroicons/react/20/solid/index.js";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


const Show = ({ program, sponsor }) => {
    const pages = [
        { name: 'Programs', href: '/programs', current: false },
        { name: program.title, href: `/programs/${program.id}`, current: false },
    ];


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    const rows = [

        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };


    // Ensure sponsor.data is an array before attempting to map over it
    const sponsors = program.sponsor?.data || [];

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col h-screen py-4 pr-4 pl-2">

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

                <div className="overflow-hidden h-28 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                        <div className='flex flex-col'>
                            <h1 className='sm:text-md md:text-lg lg:text-xl font-bold'>
                                {program.title}
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the users in your account including their name, title, email, and role.
                            </p>
                        </div>
                        <div>
                            <Link href={`/programs/${program.id}/add_beneficiaries`}>
                                add
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white mt-2 h-full">
                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </div>

            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
