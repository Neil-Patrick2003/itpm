import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import Tooltip from '@mui/material/Tooltip';
import { PlusIcon } from '@heroicons/react/20/solid';
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import PersonalDetail from "@/Components/form/PersonalDetail.jsx";
import Security from "@/Components/form/Security.jsx";
import Role from "@/Components/form/Role.jsx";
import Confirmation from "@/Components/form/Confirmation.jsx";
import EmptySearch from "@/Components/EmptySearch.jsx";

const steps = ['Personal Details', 'Security', 'Role'];

const AdminDashboard = ({ users }) => {
    const { data, setData, post, reset } = useForm({
        name: '',
        email: '',
        address: '',
        phone: '',
        role: '',
        password: '',
        assign_address: '',
        confirm_password: '',
    });

    const imageUrl = '/storage/';

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(' ');
        const initials = nameSplit.length > 1
            ? `${nameSplit[0][0]}${nameSplit[1][0]}`
            : `${nameSplit[0][0]}`;
        return {
            sx: { bgcolor: '#4CAF50' },
            children: initials.toUpperCase(),
        };
    };

    const [activeStep, setActiveStep] = useState(0);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleReset = () => setActiveStep(0);

    const getStepContent = (step) => {
        switch (step) {
            case 0: return <PersonalDetail data={data} setData={setData} />;
            case 1: return <Security data={data} setData={setData} />;
            case 2: return <Role data={data} setData={setData} />;
            default: return 'Unknown step';
        }
    };

    const openAddUser = () => {
        reset();
        setActiveStep(0);
        setIsAddUserOpen(true);
    };

    const closeAddUser = () => {
        setIsAddUserOpen(false);
        reset();
        setActiveStep(0);
    };

    const addUser = (e) => {
        e.preventDefault();
        post('/users', {
            onSuccess: () => {
                reset();
                closeAddUser();
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-4 bg-white shadow rounded-md">
                <Modal show={isAddUserOpen} onClose={closeAddUser} maxWidth="2xl">
                    <Backdrop open={isAddUserOpen} style={{ zIndex: 1 }} />
                    <form onSubmit={addUser}>
                        <div className="flex flex-col gap-4 p-6 space-y-4 rounded-lg bg-white z-50 relative">
                            <Box sx={{ width: '100%' }}>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel sx={{
                                                '& .MuiStepIcon-root': { color: 'green' },
                                                '& .MuiStepIcon-active': { color: 'darkgreen' },
                                                '& .MuiStepIcon-completed': { color: 'darkgreen' },
                                            }}>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                <Box sx={{ mt: 4, textAlign: 'center' }}>
                                    {activeStep === steps.length ? (
                                        <>
                                            <Confirmation data={data} setData={setData} />
                                            <div className="flex justify-end gap-2 mt-4">
                                                <Button onClick={handleReset} variant="outlined" sx={{ color: 'green' }}>
                                                    Reset
                                                </Button>
                                                <Button type="submit" variant="contained" sx={{ backgroundColor: 'green', color: 'white' }}>
                                                    Submit
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>{getStepContent(activeStep)}</div>
                                            <Box className="flex justify-end gap-2 mt-4">
                                                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1, color: 'green' }}>
                                                    Back
                                                </Button>
                                                <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: 'green', color: 'white' }}>
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </div>
                    </form>
                </Modal>

                {/* Top Section */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-1/2">
                        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end">

                        <button
                            onClick={openAddUser}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Add New User
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-auto rounded-md border border-gray-200"    >
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {users.data.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="flex items-center gap-3">
                                        <div className="shrink-0">
                                            {user.profile_photo_url ? (
                                                <img
                                                    src={imageUrl + user.profile_photo_url}
                                                    alt={user.name}
                                                    className="rounded-full w-12 h-12 object-cover"
                                                />
                                            ) : (
                                                <Avatar {...stringAvatar(user.name)} sx={{ width: 48, height: 48 }} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{user.name}</div>
                                            <div className="text-gray-500 text-sm">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <div>{user.phone}</div>
                                    <div className="text-gray-400 text-sm">{user.address}</div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">Active</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                                <td className="px-6 py-4 flex justify-center gap-3 text-gray-600">
                                    <Tooltip title="Edit User" arrow>
                                        <button className="flex items-center gap-1 px-3 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-50">
                                            <FaEdit className="w-4 h-4" /> Edit
                                        </button>
                                    </Tooltip>

                                    <Tooltip title="View Details" arrow>
                                        <button className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-500 text-gray-700 hover:bg-gray-50">
                                            <GrFormView className="w-4 h-4" /> View
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Delete User" arrow>
                                        <button className="flex items-center gap-1 px-3 py-1 rounded-md border border-red-500 text-red-500 hover:bg-red-50">
                                            <MdDeleteForever className="w-4 h-4" /> Delete
                                        </button>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
