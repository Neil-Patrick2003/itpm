import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, {useEffect, useState} from 'react'
import {Link, router} from '@inertiajs/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import {debounce} from "@mui/material";
import {FaSearch} from "react-icons/fa";
import {IoPersonAddSharp} from "react-icons/io5";


const Program = ( { programs , search = '' , page = 1} ) => {

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

                <div className="flex flex-col w-full h-screen py-4 pl-2 pr-4">
                    <div className="w-full mb-2">
                        <div className="overflow-hidden h-28 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                                <div className='flex flex-col'>
                                    <h1 className='sm:text-md md:text-lg lg:text-xl font-bold'>
                                        Programs
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-700">
                                        A list of all the users in your account including their name, title, email, and role.
                                    </p>
                                </div>
                                <div>
                                    <Link
                                        href="/programs/create"
                                        className="flex items-center justify-center bg-green-600 text-white rounded-full w-16 h-16 shadow-lg hover:bg-green-500 focus:outline-none transition-colors duration-300"
                                    >
                                        <IoPersonAddSharp className="text-white text-2xl" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>

                    </div>

                    <div className="flex gap-4 items-center mb-2">
                        <div className="relative w-full max-w-xl">
                            <input
                                value={searchTerm}
                                type="text" name="Search"
                                id=""
                                onChange={(e) => handleSearchTermChange(e.target.value)}
                                className="border-2 border-green-500 rounded-full h-10 px-4 pl-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 w-full"
                                placeholder="Search..."
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                        </div>
                    </div>


                    <div className="overflow-y-auto w-full h-full bg-white p-8 shadow-sm sm:rounded-lg dark:bg-gray-800">

                        <div className='rounded-lg mt-2'>


                            <ul role="list" className="divide-y divide-gray-100">
                                {programs.data.map(program => (
                                    <li key={program.id} className="flex items-center justify-between gap-x-6 py-5">
                                    <div className="min-w-0">
                                        <div className="flex items-start gap-x-3">
                                        <p className="text-sm/6 font-semibold text-gray-900">{program.title}</p>
                                        {/* <p
                                            className={classNames(
                                            statuses[program.status],
                                            'mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
                                            )}
                                        >
                                            {project.status}
                                        </p> */}
                                        </div>
                                        <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                                        <p className="whitespace-nowrap">
                                            Start On {""}
                                            <span className=" text-gray-600">
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
                                        <p className="truncate">Created by {program.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">
                                        <Link href={`/programs/${program.id}`}>View</Link>

                                        
                                    </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-2 justify-end mt-2 items-center">
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


{/*

            <div className='flex w-full gap-2 h-screen sm:p-4 md:p-6'>
                <div className="overflow-hidden w-3/4 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        All Program
                        {programs.map((program) => (
                            <li key={program.id}>
                                <h3>{program.title}</h3>
                            </li>
                        ))}


                    </div>
                </div>
                <div className="overflow-hidden w-1/4 bg-white border shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        Incoming Program
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
};

export default Program;
