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
            <Modal show={isProfileOpen} onClose={closeProfile}>
                {viewingProfile && (
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Child Profile</h2>
                        <p><strong>Name:</strong> {viewingProfile.name}</p>
                        <p><strong>Birth Date:</strong> {viewingProfile.birth_date}</p>
                        <p><strong>Gender:</strong> {viewingProfile.gender}</p>
                        <p><strong>BMI:</strong> {viewingProfile.bmi}</p>
                    </div>
                )}
            </Modal>

            {/* Breadcrumb navigation */}
            <div>
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
            </div>

            {/* Search + Actions */}
            <div className="flex justify-between mt-20 mb-4 gap-4">
                {/* Search bar */}
                <div className="w-full">
                    <div className="relative w-full max-w-xl mb-4">
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

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 w-full">
                    <Link href="/childrens/create">
                        <button className="flex items-center gap-2 px-2 text-sm md:text-md py-1 md:px-4 md:py-2 bg-[#7BDC9F] hover:bg-green-600 text-white rounded-full shadow">
                            <PlusIcon className="h-5 w-5" /> Add New Record
                        </button>
                    </Link>
                    <Link href="/childrens">
                        <button className="flex items-center gap-2 px-2 text-sm md:text-md py-1 md:px-4 md:py-2 bg-[#7BDC9F] hover:bg-green-600 text-white rounded-full shadow">
                            <UserGroupIcon className="h-5 w-5" /> View All Beneficiaries
                        </button>
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden bg-white shadow ring-1 ring-black/5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-green-50">
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
                                        <span className="text-gray-400 italic">N/A</span>
                                    )}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500">
                                    {children.address}
                                </td>


                                <td className="py-4 pr-4 pl-3 sm:pr-6 text-right">
                                    <button
                                        onClick={() => openProfile(children)}
                                        className="text-green-600 hover:text-green-900 text-sm font-medium"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex gap-2 justify-end mt-4 items-center">
                {records.links.map((link) =>
                    link.url ? (
                        <Link
                            key={link.label}
                            href={link.url}
                            className={`p-2 px-4 text-sm font-medium rounded-md ${
                                link.active
                                    ? 'bg-green-600 text-white font-bold hover:bg-green-500'
                                    : 'bg-white text-gray-700 hover:bg-green-50'
                            } border border-gray-300 shadow-md transition-all duration-200`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <span
                            key={link.label}
                            className="p-2 px-4 text-sm font-medium text-slate-400 cursor-not-allowed bg-white border border-gray-300 shadow-md rounded-md"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    )
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
