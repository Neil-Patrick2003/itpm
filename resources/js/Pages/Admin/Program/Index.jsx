import React, { useEffect, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { debounce } from 'lodash';
import { FaSearch } from 'react-icons/fa';
import { PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import EmptySearch from "@/Components/EmptySearch.jsx";

const Program = ({ programs, search = '', page = 1 }) => {

    const imageUrl = '/storage/';
    const [searchTerm, setSearchTerm] = useState('');

    // Generate initials avatar
    const stringAvatar = (name) => {
        const parts = name.split(' ');
        const initials = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : `${parts[0][0]}`;
        return {
            sx: { bgcolor: '#01DA9F' },
            children: initials.toUpperCase(),
        };
    };

    useEffect(() => {
        if (search) setSearchTerm(search);
    }, [search]);

    // Debounced search
    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        const delayed = debounce(() => {
            router.get('/programs', { page, search: value }, {
                preserveState: true,
                replace: true,
            });
        }, 500);
        delayed();
        return () => delayed.cancel();
    };


    return (
        <AuthenticatedLayout>
            <div className="p-4 bg-white min-h-[calc(100vh-128px)] rounded-lg shadow">
                {/* Breadcrumb */}

                {/* Search + Add Program */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 items-center">
                    <div className="flex flex-col-reverse lg:flex-row gap-4 justify-center w-full md:w-1/3  ">
                        <h1 className="text-2xl text-center font-semibold text-gray-600">Programs</h1>
                        <div className="relative w-full">
                            <input
                                value={searchTerm}
                                onChange={(e) => handleSearchTermChange(e.target.value)}
                                type="text"
                                name="search"
                                placeholder="Search programs..."
                                className="border border-gray-300 rounded-md h-10 px-4 pl-10 text-sm text-gray-800 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                        </div>
                    </div>

                    <Link href="/programs/create">
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow">
                            <PlusIcon className="h-5 w-5" /> Add New Program
                        </button>
                    </Link>
                </div>

                {/* Programs List */}
                <div className="overflow-hidden bg-white ring-1 ring-black/10 rounded-lg mt-4">
                    <div className="min-w-full py-4 px-4 sm:px-6 lg:px-8">
                        {programs.data.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {programs.data.map((program) => (
                                    <li key={program.id} className="flex flex-col lg:flex-row justify-between items-center py-4">
                                        {/* Program Info */}
                                        <div className="min-w-0 w-full lg:w-3/4">
                                            <div className="flex items-center gap-3">
                                                <p className="text-sm font-semibold text-gray-900">{program.title}</p>
                                            </div>
                                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                                <p>
                                                    Starts on{' '}
                                                    <span className="text-gray-600">
                                                        {new Date(program.start_date).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                </p>
                                                <span className="text-gray-300">•</span>
                                                <p>
                                                    Created at{' '}
                                                    <span className="text-gray-600">
                                                        {new Date(program.created_at).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right-side Actions */}
                                        <div className="flex items-center gap-4 mt-4 lg:mt-0">
                                            {/* Sponsors */}
                                            {program.sponsors.length === 0 ? (
                                                <p className="text-sm text-gray-500">No sponsor</p>
                                            ) : (
                                                <div className="flex -space-x-2">
                                                    {program.sponsors.map((sponsor) => (
                                                        <Tooltip key={sponsor.id} title={sponsor.name} arrow>
                                                            {sponsor.profile_photo_url ? (
                                                                <img
                                                                    src={imageUrl + sponsor.profile_photo_url}
                                                                    alt={sponsor.name}
                                                                    className="w-10 h-10 rounded-full ring-2 ring-white"
                                                                />
                                                            ) : (
                                                                <Avatar
                                                                    {...stringAvatar(sponsor.name)}
                                                                    sx={{ width: 48, height: 48 }}
                                                                    className="w-10 h-10 rounded-full ring-2 ring-white"
                                                                />
                                                            )}
                                                        </Tooltip>
                                                    ))}
                                                </div>
                                            )}

                                            {/* View Button */}
                                            <Link
                                                href={`/programs/${program.id}`}
                                                className="inline-flex items-center gap-1 border border-green-500 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700 font-medium text-sm px-3 py-1.5 rounded-md transition-colors duration-150"
                                            >
                                                View
                                            </Link>

                                            {/* Menu */}
                                            <Menu as="div" className="relative">
                                                <MenuButton className="p-2.5 text-gray-500 hover:text-gray-900">
                                                    <EllipsisVerticalIcon className="h-5 w-5" />
                                                </MenuButton>
                                                <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                                                    <MenuItem>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleEdit(program.id)}
                                                                className={`block w-full text-left px-4 py-2 text-sm ${
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                }`}
                                                            >
                                                                Edit
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleMove(program.id)}
                                                                className={`block w-full text-left px-4 py-2 text-sm ${
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                }`}
                                                            >
                                                                Move
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleDelete(program.id)}
                                                                className={`block w-full text-left px-4 py-2 text-sm ${
                                                                    active ? 'bg-red-50 text-red-700' : 'text-red-600'
                                                                }`}
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                </MenuItems>
                                            </Menu>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <EmptySearch estate="No available results."/>
                        )}  


                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-end items-end gap-2 p-2 mt-4">
                    {programs.links.map((link, i) =>
                        link.url ? (
                            <Link
                                key={i}
                                href={link.url}
                                className={`px-4 py-2 text-sm font-medium rounded-md border  transition-all ${
                                    link.active
                                        ? 'bg-green-600 text-white font-bold'
                                        : 'bg-white text-gray-700 hover:bg-green-50'
                                }`}
                                dangerouslySetInnerHTML={{__html: link.label}}
                            />
                        ) : (
                            <span
                                key={i}
                                className="px-4 py-2 text-sm font-medium text-slate-400 bg-white border border-gray-300 rounded-md cursor-not-allowed"
                                dangerouslySetInnerHTML={{__html: link.label}}
                            />
                        )
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Program;
