import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useEffect, useState } from 'react'
import { Link, router } from '@inertiajs/react';
import { debounce } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import {IoPersonAddSharp} from "react-icons/io5";
import { HomeIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Tooltip from '@mui/material/Tooltip';




const Program = ({ programs, search = '', page = 1 }) => {

    //function to create avatar if the program doesatn hav bg photo it will show progarm initial letter
    function stringAvatar(name) {
        const nameSplit = name.split(' ');
        const initials = nameSplit.length > 1 ? `${nameSplit[0][0]}${nameSplit[1][0]}` : `${nameSplit[0][0]}`;

        return {
            sx: {
                bgcolor: '#01DA9F', // Green background (your primary theme)
            },
            children: initials.toUpperCase(),
        };
    }

    //variable declaration for search input
    const [searchTerm, setSearchTerm] = useState('');


    //handing change in the search input like listnre in every letter or character type
    useEffect(() => {
        if (search) {
            setSearchTerm(search);
        }
    }, []);


    // function that handle search 
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

    //declaratioj of pages it use for the nav in top showring the page
    const pages = [
        { name: 'Programs', href: '/programs', current: false },

    ]

    return (
        <AuthenticatedLayout>

                <div className="flex flex-col w-full p-2">
                    <nav aria-label="Breadcrumb" className="flex">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <div>
                                    <a href="#" className="text-gray-400 hover:text-gray-500">
                                        <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                                        <span className="sr-only">Home</span>
                                    </a>
                                </div>
                            </li>
                            {pages.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                                        <a
                                            href={page.href}
                                            aria-current={page.current ? 'page' : undefined}
                                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            {page.name}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    <div className="flex flex-row justify-between mt-20">
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
                        <Link href='/programs/create'>
                        <button className="flex gap-2 bg-[#01DAA2] rounded-full px-4 py-2 text-white hover:bg-green-400">
                            <span>
                                <PlusIcon className="h-6 w-6 text-" />
                            </span>
                            Add new Program
                        </button>
                        </Link>
                        
                    </div>
                    
                    
                    <div className="overflow-hidden bg-white mt-4 h-full ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <ul role="list" className="divide-y divide-gray-100">
                                {programs.data.map((program) => (
                                    <li key={program.id} className="flex items-center justify-between gap-x-6 py-5">
                                    <div className="min-w-0">
                                        <div className="flex items-start gap-x-3">
                                        <p className="text-sm/6 font-semibold text-gray-900">{program.title}</p>
                                        {/* <p
                                            className={classNames(
                                            statuses[project.status],
                                            'mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
                                            )}
                                        >
                                            {project.status}
                                        </p> */}
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
                                        <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                                            <circle r={1} cx={1} cy={1} />
                                        </svg>
                                        <p className="truncate">Created by {program.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {program.sponsors.map(sponsor => (
                                                <li key={sponsor.id} className="flex items-center gap-x-2">
                                                    <div>
                                                        <Tooltip title={sponsor.name} arrow>
                                                            <div className="flex -space-x-2 overflow-hidden">
                                                                {sponsor.photo_url ? (
                                                                    <img
                                                                        src={imageUrl + sponsor.profile_photo_url}
                                                                        alt="Uploaded Image"
                                                                        className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                                                                        title={sponsor.name} 
                                                                    />
                                                                ) : (
                                                                    <Avatar
                                                                        {...stringAvatar(sponsor.name)}
                                                                        className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                                                                        title={sponsor.name} 
                                                                    />
                                                                )}
                                                            </div>
                                                        </Tooltip>
                                                        
                                                    </div>
                                                </li>
                                            ))}
                                        </div>
                                        <Link
                                        href={`/programs/${program.id}`}
                                        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-600 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
                                        >
                                            View Program<span className="sr-only">, {program.title}</span>
                                        </Link>
                                        <Menu as="div" className="relative flex-none">
                                            <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                                <span className="sr-only">Open options</span>
                                                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                                            </MenuButton>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                            >
                                                <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                                >
                                                    Edit<span className="sr-only">, {program.title}</span>
                                                </a>
                                                </MenuItem>
                                                <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                                >
                                                    Move<span className="sr-only">, {program.title}</span>
                                                </a>
                                                </MenuItem>
                                                <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                                >
                                                    Delete<span className="sr-only">, {program.title}</span>
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
