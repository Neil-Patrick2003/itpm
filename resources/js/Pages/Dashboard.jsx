import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import {HomeIcon} from "@heroicons/react/20/solid/index.js";


export default function Dashboard({user}) {
    const pages = [
        { name: 'Programs', href: '/programs', current: false },
        { name: 'Create', href: '/programs/create', current: false },

    ]

    // function logout(e){
    //     e.preventDefault();
    //
    //     post('/logout');
    // }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>

            }
        >
            <Head title="Dashboard" />

            <div className="h-screen py-4 pr-4 pl-2">
                <div className="flex flex-col h-full">
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
                </div>

            </div>

        </AuthenticatedLayout>
    );
}
