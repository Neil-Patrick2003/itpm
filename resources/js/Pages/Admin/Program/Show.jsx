import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import {Head, Link, router} from "@inertiajs/react";
import { HomeIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/20/solid/index.js";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import {motion} from "framer-motion";


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




    const handleDelete = (id) => {
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
                router.delete(`/admin/beneficiaries/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            'Deleted!',
                            'The beneficiary has been deleted.',
                            'success'
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            'Error!',
                            'Failed to delete the beneficiary.',
                            'error'
                        );
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col">
                <div className="flex items-center border border-gray-300 rounded-md justify-center bg-white w-full py-4">
                    <img
                        src={`/storage/${program.program_background_url}`}
                        className="w-1/3 max-h-64 object-contain rounded-md "
                        alt="program background"
                    />
                </div>

                <div className="bg-white mt-4 py-8 px-4 border border-gray-200 space-y-4 rounded ">
                    <h1 className="text-2xl font-semibold text-gray-800">{program.title}</h1>
                    <p className="text-gray-600">{program.description}</p>
                </div>
                <div className='flex justify-center my-4'>
                    <Link href={`/programs/${program.id}/add_beneficiaries`}>
                        <button className="flex gap-2 bg-[#01DAA2] rounded-md px-4 py-2 text-white hover:bg-green-400">
                            <span>
                                <PlusIcon className="h-6 w-6 text-" />
                            </span>
                            Add Beneficiary
                        </button>
                    </Link>
                </div>
                <div className="overflow-auto rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Id</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Gender</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Remarks</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-white w-full">
                        {beneficiaries.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-gray-300 rounded-md bg-white text-gray-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>
                                        </svg>

                                        <p className="text-lg font-medium">No Beneficiary yet</p>
                                        <p className="text-sm text-gray-400 mt-1">Add new beneficiaries and start improving health</p>
                                    </motion.div>
                                </td>
                            </tr>
                        ) : (
                            beneficiaries.map((beneficiary) => (
                                beneficiary.children ? (
                                    <tr key={beneficiary.children.id}>
                                        <td className="px-6 py-4 text-sm text-gray-700">{beneficiary.children.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-semibold">{beneficiary.children.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div>{calculateAge(beneficiary.children.birth_date)} years old</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{beneficiary.children.gender}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {/* You can handle the status logic here */}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center gap-3 text-gray-600">
                                            {/* Render remarks or any other data */}
                                            -Remark-
                                        </td>
                                    </tr>
                                ) : null
                            ))
                        )}
                        </tbody>
                    </table>
                </div>


            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
