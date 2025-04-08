import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { IoPersonAddSharp } from "react-icons/io5";
import {Head, Link, useForm} from "@inertiajs/react";
import { HomeIcon } from "@heroicons/react/20/solid/index.js";

const Show = ({ program, records }) => {
    const pages = [
        { name: 'Programs', href: '/programs', current: false },
        { name: program.title, href: `/programs/${program.id}`, current: false },
    ];
    return (
        <AuthenticatedLayout>
            <nav aria-label="Breadcrumb" className="flex border-b mb-4 border-gray-200 bg-[#01DAA2] mb-2">
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
            </nav>

            <div className="w-full mb-2">
                <div className="overflow-hidden h-28 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                        <div className='flex flex-col'>
                            <h1 className='sm:text-md md:text-lg lg:text-xl font-bold'>
                                {program.title}
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the users in your account including their name, title, email, and role.
                            </p>
                        </div>
                        <div>
                            <Link href={`/programs/${program.id}/add_beneficiaries`}>
                                className="flex items-center justify-center bg-[#01DAA2] text-white rounded-full w-16 h-16 shadow-lg hover:bg-green-500 focus:outline-none transition-colors duration-300"
                                >
                                <IoPersonAddSharp className="text-white text-2xl" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;

