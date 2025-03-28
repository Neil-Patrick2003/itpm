import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import { Link } from '@inertiajs/react';


const AdminDashboard = ({ users }) => {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);
    const [isViewUserOpen, setIsViewUserOpen] = useState(false);
    const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
    const [viewingUser, setViewingUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    const { data: userData, setData, post, put, errors, processing } = useForm({
        name: '',
        email: ''
    });

    const {delete: deleteUser} = useForm();

    

    // Add User Modal Functions
    const openAddUser = () => setIsAddUserOpen(true);
    const closeAddUser = () => setIsAddUserOpen(false);

    // Edit User Modal Functions
    const openEditUser = (user) => {
        setEditingUser(user); //set user 
        setData({ name: user.name, email: user.email }) // set current user data to inputfeild
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
        console.log("here")
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
                closeAddUser(); // Close the modal after user is added
                alert("User created successfully!");
                setData({ name: '', email: '' }); // Reset data after creation
            },
            onError: (error) => {
                console.error("Error creating user:", error); // Log the error
                alert("Error creating the user.");
            }
        });
    };

    const handleUpdateUser = () => {
        put(`/users/${editingUser.id}`, {
            onSuccess: () => {
                closeEditUser();
                alert("User updated successfully!");
            },
            onError: () => {
                alert("Error updating the user.");
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Users" />
            <div>
                <div className="flex border w-full h-screen sm:p-4 md:p-6">
                    <div className="overflow-hidden w-full bg-white border shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-base font-semibold text-gray-900">Users</h1>
                                        <p className="mt-2 text-sm text-gray-700">
                                            A list of all the users in your account including their name, title, email, and role.
                                        </p>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                        <button
                                            type="button"
                                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={openAddUser}
                                        >
                                            Add user
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-8 flow-root">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block border rounded-xl min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <table className="min-w-full divide-y divide-gray-300">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Email
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    
                                                    {users.data.map(user => (
                                                        <tr key={user.id}>
                                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                                {user.name}
                                                            </td>
                                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.email}</td>
                                                            <td className="flex gap-2 py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                                <button
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                    onClick={() => openEditUser(user)}
                                                                >
                                                                    Edit<span className="sr-only">, {user.name}</span>
                                                                </button>
                                                                <button
                                                                    className="text-red-600 hover:text-red-900"
                                                                    onClick={() => openDeleteUser(user)}
                                                                >
                                                                    Delete
                                                                </button>
                                                                <button 
                                                                    className="text-green-600 hover:text-green=900"
                                                                    onClick={() => openViewUser(user)}
                                                                >
                                                                    View
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}


                                                    
                                                </tbody>
                                            </table>
 
                                        </div>
                                        <div className="flex gap-2">
                                            {users.links.map(link => (
                                                link.url ? (
                                                <Link 
                                                    key={link.label} 
                                                    href={link.url} 
                                                    className={`p-1 mx-1 ${link.active ? "text-blue-400 font-bold" : ''}`} // Fixed the typo in the class
                                                    dangerouslySetInnerHTML={{ __html: link.label }} // Corrected this line
                                                />
                                            )
                                                
                                                :
                                            (
                                                <span
                                                key={link.label} 
                                                    className="p-1 mx-1 text-slate-400  hover:disabled"
                                                    dangerouslySetInnerHTML={{ __html: link.label }} >
                                                    
                                                </span>
                                            )
                                                
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Modal for Adding User */}
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
                                    <div className="mt-2">
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
                                            className="px-6 py-2 border bg-green-400 text-white rounded-lg"
                                            onClick={handleCreateUser}
                                            disabled={processing} // Disable if processing
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

                            {/* Modal for Editing User */}
                            <Modal show={isEditUserOpen} onClose={closeEditUser} maxWidth="2xl" closable={true}>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">Edit {userData.name}</h2>
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={userData.name}
                                            onChange={(e) => setData('name', e.target.value)} // Use setData to update the form field
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mt-2">
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
                                            className="px-6 py-2 border bg-green-400 text-white rounded-lg"
                                            onClick={handleUpdateUser} // Trigger the update function
                                            disabled={processing} // Disable if processing
                                        >
                                            {processing ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button
                                            className="px-6 py-2 border bg-gray-200 text-white rounded-lg"
                                            onClick={closeEditUser}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Modal>

                            {/* Modal for Deleting User */}
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
