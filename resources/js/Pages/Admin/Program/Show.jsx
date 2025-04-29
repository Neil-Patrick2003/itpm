import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import {Head, Link, router} from "@inertiajs/react";
import { HomeIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/20/solid/index.js";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {FaEdit} from "react-icons/fa";
import {GrFormView} from "react-icons/gr";
import {MdDeleteForever} from "react-icons/md";
import children from "@/Pages/Admin/Children/Children.jsx";
import EmptyState from "@/Components/EmptyState.jsx";
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




    // Handle edit action (currently just logs the row, can be expanded)


    // Handle delete action with SweetAlert confirmation
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

    // Define the columns for the DataGrid
    // // // const columns = [
    // // //     { field: 'id', headerName: 'ID', width: 70 },
    // // //     { field: 'fullName', headerName: 'Full Name', width: 400 },
    // // //     { field: 'age', headerName: 'Age', type: 'number', width: 100 },
    // // //     { field: 'gender', headerName: 'Gender', width: 180 },
    // // //     { field: 'address', headerName: 'Address', width: 440 },
    // // //     { field: 'status', headerName: 'Status', width: 140 },
    // // //
    // // //     // Action column with Edit and Delete buttons
    // // //     {
    // // //         field: 'action',
    // // //         headerName: 'Action',
    // // //         width: 200,
    // // //         renderCell: (params) => (
    // // //             <div className="flex items-center gap-x-2 pt-4">
    // // //                 {/* Edit Button */}
    // // //                 <button
    // // //                     onClick={() => handleEdit(params.row)}
    // // //                     style={{ marginRight: '10px' }}
    // // //                 >
    // // //                     <svg
    // // //                         fill="currentColor"
    // // //                         viewBox="0 0 24 24"
    // // //                         xmlns="http://www.w3.org/2000/svg"
    // // //                         aria-hidden="true"
    // // //                         style={{ width: '24px', height: '24px' }}  // Explicitly set the width and height
    // // //                     >
    // // //                         <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"></path>
    // // //                         <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"></path>
    // // //                     </svg>
    // // //                 </button>
    // // //
    // // //                 {/* Delete Button */}
    // // //                 <button
    // // //                     onClick={() => handleDelete(params.row)}
    // // //                     style={{ display: 'flex', alignItems: 'center' }}
    // // //                 >
    // // //                     {/* Delete SVG Icon */}
    // // //                     <svg
    // // //                         fill="currentColor"
    // // //                         viewBox="0 0 24 24"
    // // //                         xmlns="http://www.w3.org/2000/svg"
    // // //                         aria-hidden="true"
    // // //                         style={{ width: '24px', height: '24px' }} // Correct placement of style
    // // //                     >
    // // //                         <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"></path>
    // // //                         <path clipRule="evenodd" fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"></path>
    // // //                     </svg>
    // // //                 </button>
    // // //             </div>
    // // //         ),
    // // //     }
    // // // ];
    // //
    // // // Mapping beneficiaries to rows with their data (including calculated age)
    // // const rows = beneficiaries.map((beneficiary) => ({
    // //     id: beneficiary.children.parent.id,  // Unique identifier for the beneficiary
    // //     fullName: beneficiary.children.name,
    // //     age: calculateAge(beneficiary.children.birth_date),  // Calculate age based on birthdate
    // //     gender: beneficiary.children.gender,
    // //     address: beneficiary.children.parent.address,
    // //     status: beneficiary.status,  // Assuming status is part of the beneficiary data
    // // }));
    // //
    // // // State for pagination control
    // // const [paginationModel, setPaginationModel] = useState({
    // //     page: 0,
    // //     pageSize: 5,
    // // });
    //
    // // Total row count (in this case, it's the length of beneficiaries)
    // const totalRowCount = beneficiaries.length;
    //
    // // Handle page change in DataGrid
    // const handlePageChange = (newPage) => {
    //     setPaginationModel((prev) => ({
    //         ...prev,
    //         page: newPage,
    //     }));
    // };
    //
    // // Handle page size change in DataGrid
    // const handlePageSizeChange = (newPageSize) => {
    //     setPaginationModel((prev) => ({
    //         ...prev,
    //         pageSize: newPageSize,
    //     }));
    // };

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col">
                <div className="flex items-center justify-center bg-white w-full py-4">
                    <img
                        src={`/storage/${program.program_background_url}`}
                        className="w-1/3 max-h-64 object-contain rounded-md "
                        alt="program background"
                    />
                </div>

                <div className="bg-white mt-4 py-8 px-4 space-y-4 rounded ">
                    <h1 className="text-2xl font-semibold text-gray-800">{program.title}</h1>
                    <p className="text-gray-600">{program.description}</p>
                </div>
                <div className='flex justify-center my-4'>
                    <Link href={`/programs/${program.id}/add_beneficiaries`}>
                        <button className="flex gap-2 bg-[#01DAA2] rounded-full px-4 py-2 text-white hover:bg-green-400">
                            <span>
                                <PlusIcon className="h-6 w-6 text-" />
                            </span>
                            Add Beneficiary
                        </button>
                    </Link>
                </div>
                <div className="overflow-auto rounded-md">
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

                {/*<div className='mt-4'>*/}
                {/*    <Paper sx={{ height: 800, width: '100%' }}>*/}
                {/*        <DataGrid*/}
                {/*            rows={rows}*/}
                {/*            columns={columns}*/}
                {/*            pagination*/}
                {/*            paginationMode="server"*/}
                {/*            pageSize={paginationModel.pageSize}*/}
                {/*            page={paginationModel.page}*/}
                {/*            rowCount={totalRowCount}  // Total number of rows for pagination*/}
                {/*            pageSizeOptions={[5, 10, 25, 50, 100]}  // Pagination options*/}
                {/*            checkboxSelection*/}
                {/*            onPageChange={handlePageChange}  // Handle page change*/}
                {/*            onPageSizeChange={handlePageSizeChange}  // Handle page size change*/}
                {/*            sx={{ border: 0 }}*/}
                {/*        />*/}
                {/*    </Paper>*/}
                {/*</div>*/}
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
