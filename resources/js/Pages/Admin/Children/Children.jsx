import React, { useEffect, useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { debounce } from 'lodash'; // lodash debounce for optimized searching
import { FaSearch } from 'react-icons/fa';
import Modal from '@/Components/Modal';
import { HomeIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/20/solid';
import { IoPersonAddSharp } from 'react-icons/io5';
import { UserGroupIcon } from '@heroicons/react/16/solid';

// Component starts
const AdminDashboard = ({
                            records,                       // Child records with pagination
                            search = '',                   // Initial search query (if any)
                            page = 1,                      // Current pagination page
                            recordCount,                   // Total number of records
                            underweightCount,             // Statistical count (not displayed yet)
                            normalCount,
                            $overweight_andObeseCount,
                        }) => {

    // --- STATE DECLARATIONS ---

    // Search term typed by the user
    const [searchTerm, setSearchTerm] = useState('');

    // Currently selected child for profile view
    const [viewingProfile, setViewingProfile] = useState(null);

    // Controls whether the profile modal is visible
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // --- HELPER FUNCTIONS ---

    // Calculate age based on birth date
    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // --- EFFECTS ---

    // When the `search` prop updates, set it to local state
    useEffect(() => {
        if (search) setSearchTerm(search);
    }, [search]);

    // Debounced search function to prevent too many server requests
    const debouncedSearch = useMemo(() => {
        return debounce((value) => {
            const query = { page, search: value };
            router.get('/childrens', query, {
                preserveState: true,
                replace: true,
            });
        }, 500);
    }, [page]);

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, [debouncedSearch]);

    // --- EVENT HANDLERS ---

    // Handle search input change
    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        debouncedSearch(value);
    };

    // Open profile modal
    const openProfile = (children) => {
        setViewingProfile(children);
        setIsProfileOpen(true);
    };

    // Close profile modal
    const closeProfile = () => setIsProfileOpen(false);

    // Breadcrumb links
    const pages = [
        { name: 'Childrens', href: '/childrens', current: false },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Users" />

            {/* Modal for child profile */}
            <Modal show={isProfileOpen} onClose={closeProfile} aria-labelledby="profile-modal-title" aria-hidden={!isProfileOpen}>
                {viewingProfile && (
                    <div className="">
                        <h2 id="profile-modal-title" className="text-xl font-semibold mb-4">Child Profile</h2>
                        <p><strong>Name:</strong> {viewingProfile.name}</p>
                        <p><strong>Birth Date:</strong> {viewingProfile.birth_date}</p>
                        <p><strong>Gender:</strong> {viewingProfile.gender}</p>
                        <p><strong>BMI:</strong> {viewingProfile.bmi}</p>
                        <button onClick={closeProfile} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </Modal>

            <div className=" ">
                <div className="flex justify-between gap-4">
                    <div className="flex gap-2 w-full ">
                        <h1 className="text-2xl font-semibold">Records</h1>
                        <div className="w-full">
                            <div className="relative w-2/3 max-w-xl mb-4">
                                <label htmlFor="searchInput" className="sr-only">Search Records</label>
                                <input
                                    value={searchTerm}
                                    type="text"
                                    name="Search"
                                    id="searchInput"
                                    className="border-2 border-green-500 rounded-md h-10 px-4 pl-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 w-full"
                                    onChange={(e) => handleSearchTermChange(e.target.value)}
                                    placeholder="Search..."
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 w-full">
                        <Link href="/childrens/create">
                            <button className="flex items-center gap-2 px-2 text-sm md:text-md py-1 md:px-4 md:py-2 bg-[#7BDC9F] hover:bg-green-600 text-white rounded-md shadow">
                                <PlusIcon className="h-5 w-5" /> Add New Record
                            </button>
                        </Link>
                        <Link href="/childrens/beneficiary">
                            <button className="flex items-center gap-2 px-2 text-sm md:text-md py-1 md:px-4 md:py-2 bg-[#7BDC9F] hover:bg-green-600 text-white rounded-md shadow">
                                <UserGroupIcon className="h-5 w-5" /> View All Beneficiaries
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white  border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                        <tr>
                            <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-600 sm:pl-6">Name</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Age</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Gender</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Address</th>
                            <th className="py-3.5 pr-4 pl-3 sm:pr-6 text-right text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {records.data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No beneficiaries found.
                                </td>
                            </tr>
                        ) : (
                            records.data.map((children) => (
                                <tr key={children.id}>
                                    <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                                        {children.children_name}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">
                                        {calculateAge(children.birth_date)} years
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">{children.gender}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                        {children.bmi ? (
                                            children.bmi < 18.5 ? (
                                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                                                    Underweight
                                                </span>
                                            ) : children.bmi < 25 ? (
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                                    Normal
                                                </span>
                                            ) : children.bmi < 30 ? (
                                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                                                    Overweight
                                                </span>
                                            ) : (
                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                                                    Obese
                                                </span>
                                            )
                                        ) : (
                                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                                                N/A
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">{children.address}</td>
                                    <td className="py-3.5 pr-3 pl-3 sm:pr-6 text-right">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                            onClick={() => openProfile(children)}
                                        >
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-between items-center">
                    <div className="flex-1 flex justify-between items-center sm:hidden">
                        <span className="text-sm text-gray-700">
                            Showing {records.data.length} of {recordCount} results
                        </span>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:justify-between sm:items-center">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing {records.from} to {records.to} of {recordCount} results
                            </p>
                        </div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            {records.prev_page_url ? (
                                <Link
                                    href={records.prev_page_url}
                                    className="p-2 px-4 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-green-50"
                                >
                                    Previous
                                </Link>
                            ) : (
                                <span className="p-2 px-4 text-sm font-medium rounded-md bg-white text-gray-300">
                                    Previous
                                </span>
                            )}
                            {records.next_page_url ? (
                                <Link
                                    href={records.next_page_url}
                                    className="p-2 px-4 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-green-50"
                                >
                                    Next
                                </Link>
                            ) : (
                                <span className="p-2 px-4 text-sm font-medium rounded-md bg-white text-gray-300">
                                    Next
                                </span>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
