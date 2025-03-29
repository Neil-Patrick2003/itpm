import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import { Link } from '@inertiajs/react';
import { IoPersonAddSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import FlashMessage from '@/Components/FlashMessage';



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

    // Edit User Modal Functions
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
                closeAddUser(); 
                alert("User created successfully!");
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

    return (
        <AuthenticatedLayout>
            <Head title="Users" />

            <div>

                <div className="flex flex-col border w-full h-screen sm:p-4 md:p-6">
                    <div className="w-full mb-2 ">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                                <div className='flex flex-col'>
                                    <h1 className='sm:text-md md:text-lg lg:text-xl font-bold'>
                                        Add New Users
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-700">
                                                A list of all the users in your account including their name, title, email, and role.
                                    </p>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="flex gap-2 rounded-full bg-green-600  p-4 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={openAddUser}
                                    >
                                        <IoPersonAddSharp />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden w-full h-full bg-white  shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <h1 className="text-base font-semibold text-gray-900">Users</h1>
                                        <FlashMessage/>                                            
                                        <p className="mt-2 text-sm text-gray-700">
                                            A list of all the users in your account including their name, title, email, and role.
                                        </p>
                            
                            <div className="px-4 sm:px-6 lg:px-8">
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
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Email
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Phone Number
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
                                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.phone}</td>
                                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.role}</td>
                                                            <td className="flex gap-2 py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                                <button
                                                                    className=" flex gap-2 px-4 pt-1 text-white bg-green-500 hover:bg-green-400 rounded-lg"
                                                                    onClick={() => openEditUser(user)}
                                                                >
                                                                    <FaEdit style={{ fontSize: '18px' }}/>
                                                                    <p className="pb-2">Edit</p>
                                                                </button>
                                                                <button
                                                                    className="flex gap-2 rounded-lg px-4 pt-1 bg-red-600 text-white hover:bg-red-400"
                                                                    onClick={() => openDeleteUser(user)}
                                                                >
                                                                    <MdDeleteForever style={{ fontSize: '18px' }}/>
                                                                    <p className="pb-1">Delete</p>
                                                                </button>
                                                                <button 
                                                                    className="border border-2x border-slate-600 rounded-lg px-4         pt-1 flex gap-2 text-slate-600 hover:text-slate-900"
                                                                    onClick={() => openViewUser(user)}
                                                                >
                                                                    <GrFormView style={{ fontSize: '18px' }} />
                                                                    <p className="pb-1">View</p>
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

                            <Modal show={isEditUserOpen} onClose={closeEditUser} maxWidth="2xl" closable={true}>
                                <div className="p-6 bg-white rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-semibold text-gray-900">Edit {userData.name}</h2>
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
                                               
                                                value={userData?.role  ?? "user"}  // Use userData.role directly
                                                onChange={(e) => setData('role', e.target.value)}
                                                className="mt-1 block w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm bg-white"
                                            >
                                                <option value="user" className="text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors">User</option>
                                                <option value="admin" className="text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors">Admin</option>
                                                <option value="sponsor" className="text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors">Sponsor</option>
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
