import React, {useEffect, useState} from 'react';
import {router, useForm} from '@inertiajs/react';
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
import {Inertia} from "@inertiajs/inertia";
import { debounce } from 'lodash';


const steps = ['Personal Details', 'Security', 'Role'];

const AdminDashboard = ({ users, search = '', page = 1 }) => {
    const { data, setData, post, put, reset } = useForm({
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
    const [searchTerm, setSearchTerm] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleReset = () => setActiveStep(0);


    const stringAvatar = (name) => {
        const initials = name
            .trim()
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('');
        return {
            sx: { bgcolor: '#4CAF50' },
            children: initials.toUpperCase(),
        };
    };



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

    const openEditUserModal = (user) => {
        setSelectedUser(user); // Save the selected user
        setData({
            name: user.name || '',  // Ensure data is populated, fallback to empty string if missing
            email: user.email || '',
            address: user.address || '',
            phone: user.phone || '',
            role: user.role || '',
            password: '', // Do not prepopulate password for security reasons
            assign_address: '',
            confirm_password: '',



        });
        setActiveStep(0); // Reset the step index when opening edit modal
        setShowEditUserModal(true); // Open edit modal
    }

    const closeEditUserModal = () => {
        setShowEditUserModal(false);
        reset();
        setActiveStep(0);
    }

    const addUser = (e) => {
        e.preventDefault();
        post('/users', {
            onSuccess: () => {
                reset();
                closeAddUser();
            }
        });
    };



    const editUser = (e) => {
        e.preventDefault();
        console.log(selectedUser);

        put(`/users/${selectedUser.id}`, selectedUser, {
            onSuccess: () => {
                reset(); // If you want to reset the form
                closeEditUserModal(); // Close the modal after success
            },
            onError: (errors) => {
                console.error(errors); // Handle any validation errors or issues
            }
        });
    };

    useEffect(() => {
        if (search) setSearchTerm(search);
    }, [search]);

    const handleSearchTermChange = (value) => {
        console.log(users.data.length);
        setSearchTerm(value);
        const delayed = debounce(() => {
            router.get('/users', { page, search: value }, {
                preserveState: true,
                replace: true,
            });
        }, 500);
        delayed();
        return () => delayed.cancel();
    };

    return (
        <AuthenticatedLayout>
            <div className="bg-gray-50  ">
                {/* Modal for Adding User */}
                <Modal show={isAddUserOpen} onClose={closeAddUser} maxWidth="2xl">
                    <Backdrop open={isAddUserOpen} style={{ zIndex: 1 }} />
                    <form onSubmit={addUser}>
                        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg z-50 relative">
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

                                <Box sx={{ mt: 4 }}>
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
                                            {getStepContent(activeStep)}
                                            <Box className="flex justify-end gap-2 mt-4">
                                                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ color: 'green' }}>
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

                <Modal show={showEditUserModal} onClose={closeEditUserModal} maxWidth="2xl">
                    <Backdrop open={isAddUserOpen} style={{ zIndex: 1 }} />
                    <form onSubmit={editUser}>
                        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg z-50 relative">
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

                                <Box sx={{ mt: 4 }}>
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
                                            {getStepContent(activeStep)}
                                            <Box className="flex justify-end gap-2 mt-4">
                                                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ color: 'green' }}>
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

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-1/2">
                        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                        <input
                            value={searchTerm}
                            onChange={(e) => handleSearchTermChange(e.target.value)}
                            type="text"
                            placeholder="Search"
                            className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <button
                        onClick={openAddUser}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md "
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add New User
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-auto rounded-lg border border-gray-200 bg-white ">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs  text-gray-600 text-sm font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-600 text-sm font-medium uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-600 text-sm font-medium uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-600 text-sm font-medium uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-center text-xs text-gray-600 text-sm font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.data.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-6 text-red-200 text-center">
                                        <EmptySearch estate="No users found for this search." />
                                    </td>
                                </tr>
                            ) : (
                                users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex items-center gap-3">
                                                {user.profile_photo_url ? (
                                                    <img
                                                        src={imageUrl + user.profile_photo_url}
                                                        alt={user.name}
                                                        className="rounded-full w-12 h-12 object-cover"
                                                    />
                                                ) : (
                                                    <Avatar {...stringAvatar(user.name)} sx={{ width: 48, height: 48 }} />
                                                )}
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
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Active</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                                        <td className="px-6 py-4 flex justify-center gap-2 text-gray-600">
                                            <Tooltip title="Edit User" arrow>
                                                <button
                                                    className="flex items-center gap-1 px-2 py-1 text-sm rounded-md border border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                                                    onClick={() => openEditUserModal(user)}
                                                >
                                                    <FaEdit className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </button>
                                            </Tooltip>

                                            <Tooltip title="View Details" arrow>
                                                <button className="flex items-center gap-1 px-2 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
                                                    <GrFormView className="w-4 h-4" />
                                                    <span>View</span>
                                                </button>
                                            </Tooltip>

                                            <Tooltip title="Delete User" arrow>
                                                <button className="flex items-center gap-1 px-2 py-1 text-sm rounded-md border border-red-300 text-red-600 hover:bg-red-50">
                                                    <MdDeleteForever className="w-4 h-4" />
                                                    <span>Delete</span>
                                                </button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
