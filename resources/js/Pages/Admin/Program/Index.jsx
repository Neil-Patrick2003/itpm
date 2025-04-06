import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useEffect, useState } from 'react'
import { Link, router } from '@inertiajs/react';
import { debounce } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";

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

    return (
        <AuthenticatedLayout>
            <div>
                <div className="flex flex-col w-full h-screen px-2 py-4">
                    <div className="w-full mb-2">
                        <div className="overflow-hidden h-28 bg-white shadow-sm dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                All Programs
                                <div className='flex justify-end'>
                                    <a href="/programs/create" className="text-green-600 hover:underline">Add program</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-white gap-4 items-center p-4">
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
                    <div className="h-screen overflow-y-auto bg-white px-8 shadow-sm dark:bg-gray-800">
                        <div className='rounded-lg mt-2'>

                            <ul role="list" className="divide-y divide-gray-200">
                                {programs.data.map(program => (
                                    <div key={program.id} className=" hover:bg-green-100 dark:hover:bg-green-900 transition-colors duration-200">
                                        {/* Link wrapping the whole program item */}
                                        <Link href={`/programs/${program.id}`} className="w-full">
                                            <div className="flex items-center border justify-between py-5 px-2">
                                                <div className="min-w-0">
                                                    <div className="flex items-start gap-x-3">
                                                        <p className="text-sm/6 font-semibold text-gray-900">{program.title}</p>
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
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
                                                                            className="inline-block size-10 rounded-full ring-2 ring-white"
                                                                            title={sponsor.name} // Tooltip for the image
                                                                        />
                                                                    ) : (
                                                                        <Avatar
                                                                            {...stringAvatar(sponsor.name)}
                                                                            className="inline-block size-10 rounded-full ring-2 ring-white"
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
                    </div>
                    <div>
                        <div className="flex gap-2 justify-end p-2 bg-white mb-4 items-center">
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
            </div>
        </AuthenticatedLayout>
    );
};

export default Program;
