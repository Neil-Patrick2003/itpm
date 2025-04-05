import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { Link } from '@inertiajs/react';

import { useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'


const Program = ( { programs } ) => {
    

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        duration: '',
        total_beneficiaries: '',
    });
    

    

    return (
        <AuthenticatedLayout>
            <div>

                <div className="flex flex-col w-full h-screen sm:px-4 md:px-6 ">
                    <div className="w-full mb-2 pt-6 ">
                        <div className="overflow-hidden h-28 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                All Programs
                                <div className='flex justify-end '>

                                </div>
                                <a href="/programs/create">Add program</a>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden w-full bg-white p-8 shadow-sm sm:rounded-lg dark:bg-gray-800">                    
                        
                        <div className='P-2 rounded-lg mt-2'>

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
                                        {/* <a
                                        href={project.href}
                                        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
                                        >
                                        View project<span className="sr-only">, {program.title}</span>
                                        </a> */}
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
                                                <Link href={`/programs/${program.id}`} className="tblock px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden">
                                                    Edit<span className="sr-only">, {program.title}</span>
                                                </Link>
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
