import React, { useEffect, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { debounce } from 'lodash';
import { FaSearch } from 'react-icons/fa';
import { HomeIcon, ChevronRightIcon, PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const Program = ({ programs, search = '', page = 1 }) => {
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

    const pages = [{ name: 'Programs', href: '/programs', current: true }];

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
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

                {/* Search + Add Program */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mt-10">
                    <div className="relative w-full max-w-xl">
                        <input
                            value={searchTerm}
                            onChange={(e) => handleSearchTermChange(e.target.value)}
                            type="text"
                            name="search"
                            placeholder="Search programs..."
                            className="border-2 border-green-500 rounded-full h-10 px-4 pl-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    </div>
                    <Link href="/programs/create">
                        <button className="flex items-center gap-2 bg-[#01DAA2] hover:bg-green-500 text-white px-4 py-2 rounded-full transition-all">
                            <PlusIcon className="h-5 w-5" /> Add New Program
                        </button>
                    </Link>
                </div>

                {/* Programs List */}
                <div className="overflow-hidden bg-white ring-1 ring-black/5 rounded-lg shadow">
                    <div className="min-w-full py-4 px-4 sm:px-6 lg:px-8">
                        <ul className="divide-y divide-gray-100">
                            {programs.data.map((program) => (
                                <li key={program.id} className="flex justify-between items-center py-4">
                                    <div className="min-w-0">
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
                                            <p>Created at {program.created_at}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {program.sponsors.map((sponsor) => (
                                                <Tooltip key={sponsor.id} title={sponsor.name} arrow>
                                                    {sponsor.profile_photo_url ? (
                                                        <img
                                                            src={sponsor.profile_photo_url}
                                                            alt={sponsor.name}
                                                            className="w-10 h-10 rounded-full ring-2 ring-white"
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            {...stringAvatar(sponsor.name)}
                                                            className="w-10 h-10 rounded-full ring-2 ring-white"
                                                        />
                                                    )}
                                                </Tooltip>
                                            ))}
                                        </div>

                                        <Link
                                            href={`/programs/${program.id}`}
                                            className="hidden sm:inline-block bg-white text-sm text-gray-700 font-semibold px-3 py-1.5 rounded-md border ring-1 ring-gray-300 hover:bg-gray-50"
                                        >
                                            View
                                        </Link>

                                        {/* Actions Menu */}
                                        <Menu as="div" className="relative">
                                            <MenuButton className="p-2.5 text-gray-500 hover:text-gray-900">
                                                <EllipsisVerticalIcon className="h-5 w-5" />
                                            </MenuButton>
                                            <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                                                <MenuItem>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        Edit
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        Move
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                        Delete
                                                    </a>
                                                </MenuItem>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-end items-center gap-2 p-2">
                    {programs.links.map((link, i) =>
                        link.url ? (
                            <Link
                                key={i}
                                href={link.url}
                                className={`px-4 py-2 text-sm font-medium rounded-md border shadow-sm transition-all ${
                                    link.active
                                        ? 'bg-green-600 text-white font-bold'
                                        : 'bg-white text-gray-700 hover:bg-green-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                key={i}
                                className="px-4 py-2 text-sm font-medium text-slate-400 bg-white border border-gray-300 shadow-md rounded-md cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Program;
