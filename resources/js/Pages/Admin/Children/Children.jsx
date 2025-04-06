import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { debounce } from "@mui/material";
import { FaSearch } from 'react-icons/fa';
import Modal from '@/Components/Modal';
import {HomeIcon} from "@heroicons/react/20/solid/index.js";
import {IoPersonAddSharp} from "react-icons/io5";

const AdminDashboard = ({ childrens, search = '', page = 1 }) => {
    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        return today.getFullYear() - birthDate.getFullYear();
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [viewingProfile, setViewingProfile] = useState(null); // To hold the selected child's profile data
    const [isProfileOpen, setIsProfileOpen] = useState(false); // To manage modal visibility

    useEffect(() => {
        if (search) {
            setSearchTerm(search);
        }
    }, [search]);

    const handleSearchTermChange = (value) => {
        setSearchTerm(value);

        const debouncedSearchTerm = debounce(() => {
            const query = { page, search: value };
            router.get('/childrens', query, {
                preserveState: true,
                replace: true
            });
        }, 500);

        debouncedSearchTerm();

        return () => debouncedSearchTerm.cancel();
    };

    const openProfile = (children) => {
        setViewingProfile(children); // Set the selected child's data
        setIsProfileOpen(true); // Open the modal
    };

    const closeProfile = () => setIsProfileOpen(false);

    const pages = [
        { name: 'Programs', href: '/programs', current: false },
        { name: 'Create', href: '/programs/create', current: false },

    ]
    return (
        <AuthenticatedLayout>
            <Head title="Users" />

            <Modal show={isProfileOpen} onClose={closeProfile}>
                {viewingProfile && (
                    <div>
                        <p>Name: {viewingProfile.name}</p>
                        <p>Birth Date: {viewingProfile.birth_date}</p>
                        <p>Gender: {viewingProfile.gender}</p>
                        <p>BMI: {viewingProfile.bmi}</p>
                    </div>
                )}
            </Modal>

            <div className="flex flex-col py-4 h-screen pl-2 pr-4">
                <div className="">
                    <nav aria-label="Breadcrumb" className="flex border-b  mb-4 border-gray-200 bg-[#01DAA2] mb-2">
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
                        <div className=" flex justify-center items-center pr-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                                <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                                <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                            </svg>

                        </div>
                    </nav>
                </div>
                <div className="">
                    <div className="w-full mb-6">
                        <div className="overflow-hidden h-28 bg-white shadow-sm dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">

                                <div className='flex justify-between'>
                                    <h1>All Benificiaries </h1>

                                    <a href="/childrens/create" className="text-green-600 hover:underline">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center bg-[#01DAA2] text-white rounded-full w-16 h-16 shadow-lg hover:bg-green-500 focus:outline-none transition-colors duration-300"
                                        >
                                            <IoPersonAddSharp className="text-white text-2xl" />
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full bg-white  ">
                    <div className="bg-white rounded-lg p-4">
                        <div className=" w-full h-full py-2 align-middle">
                            <div className="flex gap-4 items-center mb-2">
                                <div className="relative w-full max-w-xl">
                                    <input
                                        value={searchTerm}
                                        type="text"
                                        name="Search"
                                        id="searchInput"
                                        className="border-2 border-green-500 rounded-full h-10 px-4 pl-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 w-full"
                                        onChange={(e) => handleSearchTermChange(e.target.value)}
                                        placeholder="Search..."
                                    />
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                                </div>
                            </div>

                            <div className="overflow-hidden ring-1 h-full shadow-sm ring-black/5 sm:rounded-lg">
                                <table className="min-w-full divide-y h-full divide-gray-300">
                                    <thead className="bg-[#01DAA2]">
                                    <tr>
                                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-white sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                            Age
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                            Gender
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                            Status
                                        </th>
                                        <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {childrens.data.map((children) => (
                                        <tr key={children.id}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                {children.name}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {calculateAge(children.birth_date)} years
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {children.gender}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                healthy
                                            </td>
                                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                                                <button onClick={() => openProfile(children)}>view</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-2 items-center">
                    {childrens.links.map((link) => (
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
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
