'use client';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import {
    ChevronUpDownIcon,
    PlusIcon,
    UserGroupIcon,
    CheckIcon,
} from '@heroicons/react/20/solid';
import { FaSearch } from 'react-icons/fa';
import React, { useEffect, useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import Modal from '@/Components/Modal';
import { debounce } from 'lodash';

const locations = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Acle' },
    { id: 2, name: 'Bayudbud' },
    { id: 3, name: 'Bolboc' },
    { id: 4, name: 'Dalima' },
    { id: 5, name: 'Dao' },
    { id: 6, name: 'Guinhawa' },
    { id: 7, name: 'Lumbangan' },
    { id: 8, name: 'Luntal' },
    { id: 9, name: 'Magahis' },
    { id: 10, name: 'Malibu' },
    { id: 11, name: 'Mataywanac' },
    { id: 12, name: 'Palincaro' },
    { id: 13, name: 'Luna' },
    { id: 14, name: 'Burgos' },
    { id: 15, name: 'Rizal' },
    { id: 16, name: 'Rillo' },
    { id: 17, name: 'Putol' },
    { id: 18, name: 'Sabang' },
    { id: 19, name: 'San Jose' },
    { id: 20, name: 'Talon' },
    { id: 21, name: 'Toong' },
    { id: 22, name: 'Tuyon-tuyon' },
];

const Children   = ({ records, search = '', page = 1 }) => {
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [viewingProfile, setViewingProfile] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(locations[0]); // Default to 'All'

    const debouncedSearch = useMemo(() => {
        return debounce((value) => {
            const params = { page, search: value };
            if (selectedLocation.name !== 'All') {
                params.location = selectedLocation.name;
            }
            router.get('/childrens', params, { preserveState: true, replace: true });
        }, 500);
    }, [page, selectedLocation]);

    useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const openProfile = (child) => setViewingProfile(child) || setIsProfileOpen(true);
    const closeProfile = () => setIsProfileOpen(false);

    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    const status = (bmi) => {
        if (bmi < 18.5) {
            return (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                    Underweight
                </span>
            );
        } else if (bmi < 25) {
            return (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    Normal
                </span>
            )
        }
        else if (bmi < 30) {
            return (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                    Overweight
                </span>
            )
        }
        else {
            return (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                    Obese
                </span>
            )
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Children" />
            <Modal show={isProfileOpen} onClose={closeProfile}>
                {viewingProfile && (
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">Child Profile</h2>
                        <p><strong>Name:</strong> {viewingProfile.name}</p>
                        <p><strong>Birth Date:</strong> {viewingProfile.birth_date}</p>
                        <p><strong>Gender:</strong> {viewingProfile.gender}</p>
                        <p><strong>BMI:</strong> {viewingProfile.bmi}</p>
                    </div>
                )}
            </Modal>

            <div className="px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="w-full md:w-2/3 relative">
                        <input
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full border-2 border-green-500 rounded-md h-10 px-4 pl-10 text-sm focus:outline-none"
                            placeholder="Search..."
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    </div>

                    <div className="w-full md:w-1/3 flex items-center justify-end space-x-2">
                        <Listbox
                            value={selectedLocation}
                            onChange={(location) => {
                                setSelectedLocation(location);
                                const params = { page: 1, search: searchTerm };
                                if (location.name !== 'All') {
                                    params.location = location.name;
                                }
                                router.get('/childrens', params, {
                                    preserveState: true,
                                    replace: true,
                                });
                            }}
                        >
                            <div className="relative w-40">
                                <ListboxButton className="w-full border border-green-500 rounded-md bg-white py-2 pl-3 pr-10 text-left text-sm">
                                    <span>{selectedLocation.name}</span>
                                    <ChevronUpDownIcon className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
                                </ListboxButton>
                                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white rounded-md shadow ring-1 ring-black/5 focus:outline-none text-sm">
                                    {locations.map((location) => (
                                        <ListboxOption key={location.id} value={location} className="cursor-default select-none relative py-2 pl-10 pr-4 hover:bg-green-100">
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {location.name}
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                                            <CheckIcon className="h-5 w-5" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </div>
                        </Listbox>

                        <Link href="/childrens/create">
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                                <PlusIcon className="h-5 w-5" /> Add New
                            </button>
                        </Link>
                        <Link href="/childrens/beneficiary">
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                                <UserGroupIcon className="h-5 w-5" /> Beneficiaries
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
                            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-600">Age</th>
                            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-600">Gender</th>
                            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-600">BMI</th>


                            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-600">Address</th>
                            <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {records.data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No beneficiaries found.
                                </td>
                            </tr>
                        ) : (
                            records.data.map((children) => (
                                <tr key={children.id}>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{children.children_name}</td>
                                    <td className="px-3 py-3 text-sm text-gray-500">{calculateAge(children.birth_date)} years</td>
                                    <td className="px-3 py-3 text-sm text-gray-500">{children.gender}</td>
                                    <td className="px-3 py-3 text-sm">
                                        {status(children.bmi)}
                                    </td>
                                    <td className="px-3 py-3 text-sm text-gray-500">{children.address}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => openProfile(children)} className="text-blue-600 hover:text-blue-800 text-sm">
                                            View Profile
                                        </button>
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

export default Children;
