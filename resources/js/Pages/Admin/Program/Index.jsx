import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useEffect, useState } from 'react'
import { Link, router } from '@inertiajs/react';
import { debounce } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import {IoPersonAddSharp} from "react-icons/io5";
import { HomeIcon } from '@heroicons/react/20/solid'



const Program = ({ programs, search = '', page = 1 }) => {

    function stringAvatar(name) {
        const nameSplit = name.split(' ');
        const initials = nameSplit.length > 1 ? `${nameSplit[0][0]}${nameSplit[1][0]}` : `${nameSplit[0][0]}`;

        return {
            sx: {
                bgcolor: '#4CAF50', // Green background (your primary theme)
            },
            children: initials.toUpperCase(),
        };
    }

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (search) {
            setSearchTerm(search);
        }
    }, []);

    const handleSearchTermChange = (value) => {
        setSearchTerm(value)

        const debouncedSearchTerm = debounce(() => {
            const query = { page, search: value };

            router.get('/programs', query, {
                preserveState: true,
                replace: true
            })
        }, 500);

        debouncedSearchTerm();

        return () => debouncedSearchTerm.cancel()
    }

    const pages = [
        { name: 'Programs', href: '/programs', current: false },

    ]

    return (
        <AuthenticatedLayout>

                <div className="flex flex-col w-full h-screen px-2 py-4">
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
                    <div className="w-full mb-6">
                        <div className="overflow-hidden h-28 bg-white shadow-sm dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">

                                <div className='flex justify-between'>
                                    <h1>All Programs</h1>

                                    <a href="/programs/create" className="text-green-600 hover:underline">
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
                    <div className="flex  justify-between gap-4 items-center py-4">

                        <div className="relative w-full max-w-xl">
                            <input
                                value={searchTerm}
                                type="text" name="Search"
                                onChange={(e) => handleSearchTermChange(e.target.value)}
                                className="border-2 border-green-500 rounded-full h-10 px-4 pl-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 w-full"
                                placeholder="Search..."
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                        </div>
                    </div>
                    <div className="h-screen overflow-y-auto bg-white shadow-sm dark:bg-gray-800">
                        <ul role="list" className="divide-y divide-gray-200">
                            {programs.data.map(program => (
                                <div key={program.id} className="hover:bg-green-100 dark:hover:bg-green-900 transition-colors duration-200">
                                    {/* Link wrapping the whole program item */}
                                    <Link href={`/programs/${program.id}`} className="w-full">
                                        <div className="flex items-center justify-between py-5 px-4 bg-white shadow-sm rounded-md mb-4 hover:shadow-lg transition-all duration-300">
                                            <div className="min-w-0">
                                                <div className="flex items-start gap-x-3">
                                                    <p className="text-lg font-semibold text-gray-900">{program.title}</p>
                                                </div>
                                                <div className="mt-1 flex items-center gap-x-2 text-xs text-gray-500">
                                                    <p className="whitespace-nowrap">
                                                        Start On {""}
                                                        <span className="text-gray-600">
                                                            {new Date(program.start_date).toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex -space-x-2 overflow-hidden">
                                                {program.sponsors.map(sponsor => (
                                                    <li key={sponsor.id} className="flex items-center gap-x-2">
                                                        <div>
                                                            <div className="flex -space-x-2 overflow-hidden">
                                                                {sponsor.photo_url ? (
                                                                    <img
                                                                        src={imageUrl + sponsor.profile_photo_url}
                                                                        alt="Uploaded Image"
                                                                        className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                                                                        title={sponsor.name} // Tooltip for the image
                                                                    />
                                                                ) : (
                                                                    <Avatar
                                                                        {...stringAvatar(sponsor.name)}
                                                                        className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                                                                        title={sponsor.name} // Tooltip for the avatar
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </ul>


                    </div>
                    <div>
                        <div className="flex gap-2 justify-end p-2 mb-4 items-center">
                            {programs.links.map((link) => (
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

        </AuthenticatedLayout>
    );
};

export default Program;
