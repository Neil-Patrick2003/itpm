import React, { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import Tooltip from '@mui/material/Tooltip';
import { HomeIcon, ChevronRightIcon, PlusIcon, UsersIcon } from '@heroicons/react/20/solid';
import Swal from "sweetalert2";

const AdminDashboard = ({ users }) => {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);
    const [isViewUserOpen, setIsViewUserOpen] = useState(false);
    const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
    const [viewingUser, setViewingUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    const { data: userData, setData, post, put, delete: destroy, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        role: 'user'
    });

    // Modal toggles
    const openAddUser = () => setIsAddUserOpen(true);
    const closeAddUser = () => setIsAddUserOpen(false);
    const openEditUser = (user) => {
        setEditingUser(user);
        setData({ name: user.name, email: user.email, phone: user.phone, role: user.role });
        setIsEditUserOpen(true);
    };
    const closeEditUser = () => {
        setIsEditUserOpen(false);
        setEditingUser(null);
        setData({ name: '', email: '', phone: '', role: 'user' });
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
        setViewingUser(null);
        setIsViewUserOpen(false);
    };

    // CRUD functions
    const handleCreateUser = () => {
        post('/users', {
            onSuccess: () => {
                closeAddUser();
                Swal.fire('Success', 'User created successfully', 'success');
            }
        });
    };

    const handleUpdateUser = () => {
        put(`/users/${editingUser.id}`, {
            onSuccess: () => {
                closeEditUser();
                Swal.fire('Updated!', 'User information updated.', 'success');
            }
        });
    };

    const handleDeleteUser = () => {
        destroy(`/users/${deletingUser.id}`, {
            onSuccess: () => {
                closeDeleteUser();
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            }
        });
    };

    const pages = [{ name: 'Users', href: '/users', current: true }];

    return (
        <AuthenticatedLayout>
            <Head title="Users" />

            <div className="p-0 space-y-6">
                {/* Breadcrumb */}
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <HomeIcon className="h-5 w-5" />
                                <span className="sr-only">Home</span>
                            </a>
                        </li>
                        {pages.map((page) => (
                            <li key={page.name}>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                                    <a
                                        href={page.href}
                                        className="ml-4 text-sm font-medium text-green-700 hover:text-green-900"
                                        aria-current={page.current ? 'page' : undefined}
                                    >
                                        {page.name}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={openAddUser}
                        className="flex items-center gap-2 px-2 text-sm md:text-md   py-1 md:px-4 md:py-2  bg-green-500 hover:bg-green-600 text-white rounded-full shadow"
                    >
                        <PlusIcon className="h-5 w-5" /> Add New User
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow">
                        <UsersIcon className="h-5 w-5" /> Manage Workers
                    </button>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden bg-white shadow ring-1 ring-black/5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Role</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-green-700 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {users.data.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <div className="font-semibold">{user.name}</div>
                                                <div className="text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                        <div>{user.phone}</div>
                                        <div className="text-gray-400">{user.address}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-green-600 whitespace-nowrap">
                                        <span className="bg-green-100 px-2 py-1 rounded-md text-xs font-medium">Active</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{user.role}</td>
                                    <td className="px-6 py-4 flex justify-center gap-3 text-gray-600">
                                        <Tooltip title="Edit User" arrow>
                                            <button onClick={() => openEditUser(user)}><FaEdit className="w-5 h-5"/></button>
                                        </Tooltip>
                                        <Tooltip title="Delete User" arrow>
                                            <button onClick={() => openDeleteUser(user)}><MdDeleteForever className="h-6 w-6 text-red-500" /></button>
                                        </Tooltip>
                                        <Tooltip title="View Details" arrow>
                                            <button onClick={() => openViewUser(user)}><GrFormView className="w-8 h-8 flex justify-centert items-center text-blue-500" /></button>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end gap-2">
                    {users.links.map((link, i) =>
                        link.url ? (
                            <Link
                                key={i}
                                href={link.url}
                                className={`px-4 py-2 rounded-md border shadow-sm text-sm font-medium ${
                                    link.active
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-green-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                key={i}
                                className="px-4 py-2 rounded-md border bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    )}
                </div>

                {/* Add Modal */}
                <Modal show={isAddUserOpen} onClose={closeAddUser} maxWidth="2xl">
                    <div className="p-6 space-y-4">
                        <h2 className="text-xl font-bold">Create New User</h2>
                        <input type="text" placeholder="Name" value={userData.name} onChange={e => setData('name', e.target.value)} className="w-full border-b p-2" />
                        <input type="email" placeholder="Email" value={userData.email} onChange={e => setData('email', e.target.value)} className="w-full border-b p-2" />
                        <input type="text" placeholder="Phone" value={userData.phone} onChange={e => setData('phone', e.target.value)} className="w-full border-b p-2" />
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleCreateUser}>Create</button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded" onClick={closeAddUser}>Cancel</button>
                        </div>
                    </div>
                </Modal>

                {/* Edit Modal */}
                <Modal show={isEditUserOpen} onClose={closeEditUser} maxWidth="2xl">
                    <div className="p-6 space-y-4">
                        <h2 className="text-xl font-bold">Edit User</h2>
                        <input type="text" value={userData.name} onChange={e => setData('name', e.target.value)} className="w-full border-b p-2" />
                        <input type="email" value={userData.email} onChange={e => setData('email', e.target.value)} className="w-full border-b p-2" />
                        <input type="text" value={userData.phone} onChange={e => setData('phone', e.target.value)} className="w-full border-b p-2" />
                        <select value={userData.role} onChange={e => setData('role', e.target.value)} className="w-full border-b p-2">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="sponsor">Sponsor</option>
                            <option value="health_worker">Health Worker</option>
                        </select>
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleUpdateUser}>Save</button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded" onClick={closeEditUser}>Cancel</button>
                        </div>
                    </div>
                </Modal>

                {/* Delete Modal */}
                <Modal show={isDeleteUserOpen} onClose={closeDeleteUser} maxWidth="sm">
                    <div className="p-6 space-y-4 text-center">
                        <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
                        <p>Are you sure you want to delete <strong>{deletingUser?.name}</strong>?</p>
                        <div className="flex justify-center gap-4">
                            <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDeleteUser}>Delete</button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded" onClick={closeDeleteUser}>Cancel</button>
                        </div>
                    </div>
                </Modal>

                {/* View Modal */}
                <Modal show={isViewUserOpen} onClose={closeViewUser} maxWidth="sm">
                    <div className="p-6 space-y-4 text-center">
                        <img src={viewingUser?.image} alt={viewingUser?.name} className="mx-auto w-20 h-20 rounded-full" />
                        <h2 className="text-xl font-bold">{viewingUser?.name}</h2>
                        <p>{viewingUser?.email}</p>
                        <button className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded" onClick={closeViewUser}>Close</button>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
