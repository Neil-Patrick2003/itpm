import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import { Link } from '@inertiajs/react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import Tooltip from '@mui/material/Tooltip';
import { HomeIcon, ChevronRightIcon, PlusIcon, UsersIcon  } from '@heroicons/react/20/solid'
import Swal from "sweetalert2";




const AdminDashboard = ({ users }) => {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);
    const [isViewUserOpen, setIsViewUserOpen] = useState(false);
    const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
    const [viewingUser, setViewingUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    const { flash } = usePage().props;


    const { data: userData, setData, post, put, errors, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        role: "user"
    });

    const {delete: deleteUser} = useForm();



    // Add User Modal Functions
    const openAddUser = () => setIsAddUserOpen(true);
    const closeAddUser = () => setIsAddUserOpen(false);

    // Show User Modal Functions
    const openEditUser = (user) => {
        setEditingUser(user); //set user
        setData({ name: user.name, email: user.email, phone: user.phone, role: user.role })
        setIsEditUserOpen(true);
    };
    const closeEditUser = () => {
        setIsEditUserOpen(false);
        setEditingUser(null);
        setData({ name: '', email: '' });
    };


    const openDeleteUser = (user) => {
        setDeletingUser(user);
        setIsDeleteUserOpen(true);
    };

    const closeDeleteUser = () => {
        setIsDeleteUserOpen(false);
        setDeletingUser(null);
    };


    const openViewUser = (user) => {
        setViewingUser(user);
        setIsViewUserOpen(true);
    };
    const closeViewUser = () => {
        setIsViewUserOpen(false);
        setViewingUser(null);
    };

    const handleDeleteUser = () => {

        deleteUser(`/users/${deletingUser.id}`, {
            onSuccess: () => {
                closeDeleteUser();
                alert("User deleted successfully!");
            },
            onError: (error) => {
                console.error("Error deleting user:", error);
                alert("Error deleting the user.");
            }
        });
    };

    const handleCreateUser = () => {
        post('/users', {
            onSuccess: () => {
                closeAddUser();
                Swal.fire(
                    'Deleted!',
                    'The beneficiary has been deleted.',
                    'success'
                );
                setData({ name: '', email: '' });
            },
            onError: (error) => {
                console.error("Error creating user:", error);
                alert("Error creating the user.");
            }
        });
    };

    const handleUpdateUser = () => {
        put(`/users/${editingUser.id}`, {
            onSuccess: () => {
                closeEditUser();
            },
            onError: () => {
                alert("Error updating the user.");
            }
        });
    };

    const pages = [
        { name: 'Users', href: '/users', current: false },
    ]




    return (
        <AuthenticatedLayout>
            <Head title="Users" />

            <div>

                <div className="flex flex-col  w-full  p-2   md:py-4 md:pr-4">
                    <nav aria-label="Breadcrumb" className="flex">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <div>
                                    <a href="#" className="text-gray-400 hover:text-gray-500">
                                        <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                                        <span className="sr-only">Home</span>
                                    </a>
                                </div>
                            </li>
                            {pages.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                                        <a
                                            href={page.href}
                                            aria-current={page.current ? 'page' : undefined}
                                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            {page.name}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    <div className="flex gap-2 justify-end mt-20" onClick={openAddUser}>
                        <button className="flex gap-2 bg-[#01DAA2] rounded-full px-4 py-2 text-white hover:bg-green-400">
                            <span>
                                <PlusIcon className="h-6 w-6 text-" />
                            </span>
                            Add new User
                        </button>
                        <button className="flex gap-2 bg-[#01DAA2] rounded-full px-4 py-2 text-white hover:bg-green-400">
                            <span>
                                <UsersIcon className="h-6 w-6 text-white" />
                            </span>
                            Manage Worker

                        </button>
                    </div>

                    <div className="overflow-hidden bg-white mt-4 h-full ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Contact
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Role
                                    </th>
                                    <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {users.data.map((user) => (
                                    <tr key={user.email}>
                                        <td className="py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="size-11 shrink-0">
                                                    <img alt="" src={user.image} className="size-11 rounded-full" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{user.name}</div>
                                                    <div className="mt-1 text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                                            <div className="text-gray-900">{user.phone}</div>
                                            <div className="mt-1 text-gray-500">{user.address}</div>
                                        </td>
                                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                            Active
                                          </span>
                                        </td>
                                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">{user.role}</td>
                                        <td className="flex gap-2 py-3 pr-4 pl-3 text-right justify-center text-xs font-medium whitespace-nowrap sm:pr-0">
                                            {/* Show Button with Tooltip */}
                                            <Tooltip title="Show User" arrow>
                                                <button
                                                    onClick={() => openEditUser(user)}
                                                >
                                                    <FaEdit className="w-5 h-5 text-gray-600" />
                                                </button>
                                            </Tooltip>

                                            {/* Delete Button with Tooltip */}
                                            <Tooltip title="Delete User" arrow>
                                                <button
                                                    onClick={() => openDeleteUser(user)}
                                                >
                                                    <MdDeleteForever className="h-6 w-6 text-gray-600" />
                                                </button>
                                            </Tooltip>

                                            {/* View Button with Tooltip */}
                                            <Tooltip title="View User" arrow>
                                                <button onClick={() => openViewUser(user)}>
                                                    <GrFormView className="pt-1 h-8 w-8 text-gray-600" />
                                                </button>
                                            </Tooltip>
                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        {/*<table className="min-w-full divide-y divide-gray-300">*/}
                        {/*    <thead className="text-wite bg-[#01DAA2]">*/}
                        {/*    <tr>*/}
                        {/*        <th scope="col" className="py-3.5 pr-3 pl-4 text-white text-left text-sm font-semibold  sm:pl-6">*/}
                        {/*            Name*/}
                        {/*        </th>*/}
                        {/*        <th scope="col" className="px-3 py-3.5 text-white text-left text-sm font-semibold ">*/}
                        {/*            Email*/}
                        {/*        </th>*/}
                        {/*        <th scope="col" className="px-3 py-3.5 text-white  text-left text-sm font-semibold ">*/}
                        {/*            Gender*/}
                        {/*        </th>*/}
                        {/*        <th scope="col" className="px-3 py-3.5 text-white text-left text-sm font-semibold ">*/}
                        {/*            Contact Number*/}
                        {/*        </th>*/}
                        {/*        <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">*/}
                        {/*            <span className="sr-only">Show</span>*/}
                        {/*        </th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody className="divide-y divide-gray-200 bg-white">*/}
                        {/*    {users.data.map((user) => (*/}
                        {/*        <tr key={user.id}>*/}
                        {/*            <td className="py-2 pl-4 text-xs font-medium whitespace-nowrap text-gray-900 sm:pl-6">*/}
                        {/*                {user.name}*/}
                        {/*            </td>*/}
                        {/*            <td className="py-2 px-3 text-xs font-medium whitespace-nowrap text-gray-900 sm:px-6">*/}
                        {/*                {user.email}*/}
                        {/*            </td>*/}
                        {/*            <td className="px-3 py-2 text-xs whitespace-nowrap text-gray-500">*/}
                        {/*                {user.role}*/}
                        {/*            </td>*/}
                        {/*            <td className="py-2 pr-3 pl-4 text-xs font-medium whitespace-nowrap text-gray-900 sm:px-6">*/}
                        {/*                {user.phone}*/}
                        {/*            </td>*/}
                        {/*            <td className="flex gap-2 py-3 pr-4 pl-3 text-right text-xs font-medium whitespace-nowrap sm:pr-0">*/}
                        {/*                /!* Show Button with Tooltip *!/*/}
                        {/*                <Tooltip title="Show User" arrow>*/}
                        {/*                    <button*/}
                        {/*                        onClick={() => openEditUser(user)}*/}
                        {/*                        className="flex items-center justify-center gap-1 px-3 py-1 text-white bg-blue-400 rounded-sm hover:bg-blue-500 focus:outline-none transition-colors duration-300"*/}
                        {/*                    >*/}
                        {/*                        <FaEdit style={{ fontSize: '16px' }} />*/}
                        {/*                    </button>*/}
                        {/*                </Tooltip>*/}

                        {/*                /!* Delete Button with Tooltip *!/*/}
                        {/*                <Tooltip title="Delete User" arrow>*/}
                        {/*                    <button*/}
                        {/*                        onClick={() => openDeleteUser(user)}*/}
                        {/*                        className="flex items-center justify-center gap-1 px-3 py-1 text-white bg-red-400 rounded-sm hover:bg-red-500 focus:outline-none transition-colors duration-300"*/}
                        {/*                    >*/}
                        {/*                        <MdDeleteForever style={{ fontSize: '16px' }} />*/}
                        {/*                    </button>*/}
                        {/*                </Tooltip>*/}

                        {/*                /!* View Button with Tooltip *!/*/}
                        {/*                <Tooltip title="View User" arrow>*/}
                        {/*                    <button*/}
                        {/*                        onClick={() => openViewUser(user)}*/}
                        {/*                        className="flex items-center justify-center gap-1 px-3 py-1 text-white bg-green-400 rounded-sm hover:bg-green-500 focus:outline-none transition-colors duration-300"*/}
                        {/*                    >*/}
                        {/*                        <GrFormView style={{ fontSize: '16px' }} />*/}
                        {/*                    </button>*/}
                        {/*                </Tooltip>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*    ))}*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
                    </div>
                    <div className="px-4 sm:px-6 lg:px-8 my-2">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="flex gap-2 justify-end mt-2 items-center">
                                {users.links.map((link) => (
                                    link.url ? (
                                        <Link
                                            key={link.label}
                                            href={link.url}
                                            className={`p-2 px-4 text-sm font-medium rounded-md
                                                ${link.active ? "bg-green-600 text-white font-bold hover:bg-green-500"
                                                : "bg-white text-gray-700 hover:bg-green-50"}
                                                border border-gray-300 shadow-md transition-all duration-200`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={link.label}
                                            className="p-2 px-4 text-sm font-medium text-slate-400 cursor-not-allowed
                                                bg-white border border-gray-300 shadow-md rounded-md"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>

                    </div>

                    <Modal show={isAddUserOpen} onClose={closeAddUser} maxWidth="2xl" closable={true}>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Create New User</h2>
                            <p className="mt-2">Fill in the details to create a new user.</p>
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setData('name', e.target.value)} // Use setData to update the form field
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className= "mt-2">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => setData('email', e.target.value)} // Use setData to update the form field
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    className="px-6 py-2 border bg-[#01DAA2] text-white rounded-lg"
                                    onClick={handleCreateUser}
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create'}
                                </button>
                                <button
                                    className="px-6 py-2 border bg-gray-200 text-white rounded-lg"
                                    onClick={closeAddUser}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <Modal show={isEditUserOpen} onClose={closeEditUser} maxWidth="2xl" closable={true}>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold text-gray-900">Show {userData.name}</h2>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={userData.name || ""}  // Controlled input
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={userData.email || ""}  // Controlled input
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="text"
                                        value={userData.phone || ""}  // Controlled input
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                    <select
                                        name="role"

                                        value={userData?.role  ?? "user"} ssss
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm bg-white"
                                    >
                                        <option value="user" className="text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors">User</option>
                                        <option value="admin" className="text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors">Admin</option>
                                        <option value="sponsor" className="text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors">Sponsor</option>
                                        <option value="health_worker" className="text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors">Health Worker</option>

                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    onClick={handleUpdateUser}
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>

                                <button
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    onClick={closeEditUser}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>



                    <Modal show={isDeleteUserOpen} onClose={closeDeleteUser} maxWidth="sm" closable={true}>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-red-600">Are you sure?</h2>
                            <p className="mt-2">Do you want to delete this user? This action cannot be undone.</p>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    className="px-6 py-2 border bg-red-600 text-white rounded-lg"
                                    onClick={handleDeleteUser}
                                >
                                    Delete
                                </button>
                                <button
                                    className="px-6 py-2 border bg-gray-200 text-white rounded-lg"
                                    onClick={closeDeleteUser}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <Modal show={isViewUserOpen} onClose={closeViewUser} maxWidth="sm" closable={true}>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-red-600">{viewingUser?.name}</h2>
                            <p> {viewingUser?.email} </p>
                            <button
                                className="px-6 py-2 border bg-gray-200 text-white rounded-lg"
                                onClick={closeViewUser}
                            >
                                Cancel
                            </button>

                        </div>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
