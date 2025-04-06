import { useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import {HomeIcon} from "@heroicons/react/20/solid/index.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {useState} from "react";


const Create = ({ sponsors }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        duration: '',
        total_beneficiaries: '',
        sponsor_ids: [],
        cover_photo: null
    });


    const handleFileChange = (e) => {
        // Set the selected file into the form data
        setData('cover_photo', e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            // Set the selected file into the form data
            setData('cover_photo', file);
        }
    };

    const onChangeItem = (e) => {
        const { id, checked } = e.target;
        if (checked) {
            setData('sponsor_ids', [...data.sponsor_ids, id])
        } else {
            setData('sponsor_ids', data.sponsor_ids.filter(item => item!== id));
        }
    }

    function submitProgram(e){
        e.preventDefault();

        console.log(data)

        post('/programs/create', {
            onFinish: () => reset()
        });
    }

    const pages = [
        { name: 'Programs', href: '/programs', current: false },
        { name: 'Create', href: '/programs/create', current: false },

    ]


    return (
        <AuthenticatedLayout>
            <div className=' h-screen  py-4 pr-4 pl-2'>
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


                    <div className='flex flex-col w-full  h-full '>
                        <form onSubmit={submitProgram}>
                            <div className="flex flex-col md:flex-row gap-4 h-full">
                                <div className="w-2/3 h-full">
                                    <p>Program Details</p>


                                    <div className='border bg-slate-200 p-4 rounded-xl mt-4'>
                                        <div className='flex flex-col mb-2'>
                                            <InputLabel htmlFor="title" value="Title" />
                                            <TextInput
                                                id="title"
                                                name="title"
                                                value={data.title}
                                                className="mt-1 block w-full"

                                                onChange={(e) => setData('title', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.title} className="mt-2" />
                                        </div>

                                        <div className='flex flex-col mb-2'>
                                            <InputLabel htmlFor="description" value="Description" />
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={data.description}
                                                className="mt-1 block w-full rounded-lg"

                                                onChange={(e) => setData('description', e.target.value)}
                                                required
                                            ></textarea>
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
                                        <p className="text-gray-600 mt-8 text-sm">Please Select Photo for background upload</p>
                                        <div className="w-full ">

                                            <div
                                                className="flex items-center justify-center w-full mt-4"
                                                onDrop={handleDrop}
                                                onDragOver={(e) => e.preventDefault()}
                                            >
                                                <label
                                                    htmlFor="dropzone-file"
                                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg
                                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 20 16"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                            />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                        </p>
                                                    </div>
                                                    <input
                                                        id="dropzone-file"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>

                                            {errors.total_beneficiaries && <div>{errors.total_beneficiaries}</div>}


                                        </div>

                                    </div>
                                </div>
                                <div className="w-1/3 h-full border">
                                    <div className="flex flex-col bg-white h-80 w-full p-4 border mb-4 rounded-xl">
                                        <h1>Select Sponsors</h1>
                                        <div className='flex justify-end w-full gap-3 mb-4'>
                                            <input type="text" name="" id="" className='border h-8 w-80 rounded-full' />
                                            <button className='bg-green-600 px-4 py-2 rounded-full text-white'>Search</button>
                                        </div>

                                        <div className="flex items-center bg-gray-100 p-2 rounded-xl gap-6 overflow-y-auto max-h-96">
                                            <div className='w-full'>
                                                {sponsors.map((sponsor) => (
                                                    <div key={sponsor.id}>
                                                        <li className="flex items-center justify-between gap-x-6 py-5">
                                                            <div className="flex min-w-0 gap-x-4">
                                                                <img alt="" className="size-12 flex-none rounded-full bg-gray-50" />
                                                                <div className="min-w-0 flex-auto">
                                                                    <label htmlFor={sponsor.id} className="cursor-pointer">
                                                                        <p className="text-sm/6 font-semibold text-gray-900">{sponsor.name}</p>
                                                                        <p className="mt-1 truncate text-xs/5 text-gray-500">{sponsor.email}</p>
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        id={sponsor.id}
                                                                        value={sponsor.id}
                                                                        type='checkbox'
                                                                        className='border'
                                                                        onChange={onChangeItem}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div className='flex justify-end mt-4'>
                                <button type='submit' disabled={processing} className='border text-white bg-green-600 rounded-full px-12 py-2'>
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </AuthenticatedLayout>
    );
}

export default Create;
