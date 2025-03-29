import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'


const Program = ( { programs } ) => {
    const [ isAddProgramOpen, setIsAddProgramOpen ] = useState(false);
    const openAddProgram = () => setIsAddProgramOpen(true);
    const closeAddProgram = () => setIsAddProgramOpen(false);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        duration: '',
        total_beneficiaries: '',
    });

    function submitProgram(e){
        e.preventDefault();
        post('/programs',);
        setIsAddProgramOpen(false);
        setData( { title: '',
            description: '',
            start_date: '',
            duration: '',
            total_beneficiaries: ''
        } );
    }

    return (
        <AuthenticatedLayout>
            <div>
                <div className="flex border w-full h-screen sm:p-4 md:p-6">
                    <div className="overflow-hidden w-full bg-white p-8  border shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className='p-8 border'>
                            <ul role="list" className="divide-y divide-gray-100">
                                {programs.map((program) => (
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
                                            Due on <time dateTime={program.start_date}>{program.duration}</time>
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
                            
                        <div className='flex justify-end'>
                            <button onClick={openAddProgram}>Create Program</button>
                        </div>
                        <Modal show={isAddProgramOpen} onClose={closeAddProgram} maxWidth="2xl" closable={true}>
                            <div className='flex flex-col w-full p-4'>
                                <h1 className='text-center'>Add Program</h1>
                                <form onSubmit={submitProgram}>
                                    <div className='flex flex-col mb-2'>
                                        <InputLabel htmlFor="title" value="Title" />
                                        <TextInput
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                    <div className='flex flex-col mb-2'>
                                        <InputLabel htmlFor="description" value="Description" />
                                        <TextInput
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 text-slate-600 text-sm gap-4 mt-2">
                                        <div className='flex flex-col'>
                                            <label htmlFor="start_date" className='font-bold'>Start Date</label>
                                            <input
                                                type="date"
                                                id="start_date"
                                                name="start_date"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                                className='rounded-lg border border-slate-300 shadow-sm'
                                            />
                                            {errors.start_date && <div>{errors.start_date}</div>}
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="duration" className='font-bold'>Duration (days)</label>
                                            <input
                                                type="number"
                                                id="duration"
                                                name="duration"
                                                value={data.duration}
                                                onChange={(e) => setData('duration', e.target.value)}
                                                className='rounded-lg border border-slate-300 shadow-sm'
                                            />
                                            {errors.duration && <div>{errors.duration}</div>}
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="total_beneficiaries" className='font-bold'>Total Beneficiaries</label>
                                            <input
                                                type="number"
                                                id="total_beneficiaries"
                                                name="total_beneficiaries"
                                                value={data.total_beneficiaries}
                                                onChange={(e) => setData('total_beneficiaries', e.target.value)}
                                                className='rounded-lg border border-slate-300 shadow-sm'
                                            />
                                            {errors.total_beneficiaries && <div>{errors.total_beneficiaries}</div>}
                                        </div>
                                    </div>
                                    <button type='submit' disabled={processing}>Create</button>
                                </form>
                                <button onClick={closeAddProgram}>Cancel</button>
                            </div>
                        </Modal>
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
