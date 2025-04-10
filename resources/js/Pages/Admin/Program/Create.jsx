import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { useState, useEffect } from "react";
import { TextField } from '@mui/material';
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/20/solid/index.js";

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

    const [selectedSponsorIds, setSelectedSponsorIds] = useState([]);

    useEffect(() => {
        setData('sponsor_ids', selectedSponsorIds);
    }, [selectedSponsorIds]);

    const handleFileChange = (e) => {
        setData('cover_photo', e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setData('cover_photo', file);
        }
    };

    const handleSponsorToggle = (id) => {
        setSelectedSponsorIds(prev =>
            prev.includes(id)
                ? prev.filter(sId => sId !== id)
                : [...prev, id]
        );
    };

    const submitProgram = (e) => {
        e.preventDefault();
        post('/programs/create', {
            onFinish: () => reset()
        });
    };

    const pages = [
        { name: 'Programs', href: '/programs', current: false },
        { name: 'Create', href: '/programs/create', current: false },
    ];

    return (
        <AuthenticatedLayout>
            <div className='h-screen py-4 px-2'>
                <div className="flex flex-col h-full">
                    {/* Breadcrumb navigation */}
                    <nav aria-label="Breadcrumb" className="flex">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon className="size-5 shrink-0" />
                                    <span className="sr-only">Home</span>
                                </a>
                            </li>
                            {pages.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="size-5 text-gray-400" />
                                        <a href={page.href} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                            {page.name}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    {/* Layout: Grid with Sidebar + Main Content */}
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-x-4 p-4 bg-white mt-0 md:mt-12 rounded-xl shadow-lg w-full'>

                        {/* Sidebar: Sponsor Selection */}
                        <div className="md:col-span-1 mb-4">
                            <div className='flex flex-col gap-3'>
                                <div className='bg-[#01DA9F] p-4 text-white rounded-lg'>Create</div>

                                <div className="border border-slate-300 px-4 py-4 rounded-lg">
                                    <h1 className="text-lg font-semibold mb-4 text-green-600">Select Sponsors</h1>
                                    <p className='text-sm text-gray-600 mb-4'>Selected sponsors: {selectedSponsorIds.length}</p>

                                    {/* Sponsor List */}
                                    {sponsors.map((sponsor) => {
                                        const isSelected = selectedSponsorIds.includes(sponsor.id);
                                        return (
                                            <div key={sponsor.id} className="flex items-center justify-between border-b py-3">
                                                <div className="flex items-center gap-x-4">
                                                    <img
                                                        src={sponsor.profile_photo_url || ''}
                                                        alt={sponsor.name}
                                                        className="w-12 h-12 rounded-full bg-gray-100 object-cover"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{sponsor.name}</p>
                                                        <p className="text-xs text-gray-500">{sponsor.email}</p>
                                                    </div>
                                                </div>

                                                {/* Toggle Button */}
                                                <button
                                                    onClick={() => handleSponsorToggle(sponsor.id)}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium transition border
                                                        ${isSelected
                                                            ? "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                                                            : "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"}
                                                    `}
                                                >
                                                    {isSelected ? "Remove" : "+ Add"}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Main Content: Program Form */}
                        <div className='md:col-span-3'>
                            <form onSubmit={submitProgram}>
                                <div className='flex flex-col'>

                                    {/* Title */}
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />

                                    {/* Description */}
                                    <div className='flex flex-col my-2'>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            className="mt-1 block w-full h-80 border-slate-300 rounded-lg"
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                            placeholder='Description'
                                        ></textarea>
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    {/* Date, Duration, Beneficiaries */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 text-gray-500 text-sm gap-4 mt-2">
                                        {/* Start Date */}
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
                                            {errors.start_date && <div className='text-red-600'>{errors.start_date}</div>}
                                        </div>

                                        {/* Duration */}
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
                                            {errors.duration && <div className='text-red-600'>{errors.duration}</div>}
                                        </div>

                                        {/* Beneficiaries */}
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
                                            {errors.total_beneficiaries && <div className='text-red-600'>{errors.total_beneficiaries}</div>}
                                        </div>
                                    </div>

                                    {/* Image Upload */}
                                    <p className="text-gray-600 mt-8 text-sm">Upload Cover Photo</p>
                                    <div className="w-full">
                                        <div
                                            className="flex items-center justify-center w-full mt-4"
                                            onDrop={handleDrop}
                                            onDragOver={(e) => e.preventDefault()}
                                        >
                                            <label
                                                htmlFor="dropzone-file"
                                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.2 5.02C"
                                                        />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            
                                        </div>
                                        {errors.cover_photo && <div className='text-red-600'>{errors.cover_photo}</div>}
                                    </div>

                                    {/* Submit Button */}
                                    <div className='mt-8'>
                                        <button
                                            type="submit"
                                            className='bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow'
                                            disabled={processing}
                                        >
                                            Submit Program
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
