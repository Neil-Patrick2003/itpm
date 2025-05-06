import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
import {ChevronRightIcon, HomeIcon} from "@heroicons/react/20/solid/index.js"; // Using Inertia's hooks

const CreateChildren = () => {
    // useForm hook to manage form state, handling POST request, and storing errors
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        birth_date: '',
        gender: '',
        parent_name: '',
        email: '',
        address: '',
        parent_age: '',
        phone_number: '',
        weight: '',
        height: '',
    });



    // Form submission handler
    function submit(e) {
        console.log(data)
        e.preventDefault();

        // Send form data to Laravel endpoint
        post('/childrens/create', {
            onFinish: () => reset(), // Reset the form on finish
        });
    }

    const pages = [
        { name: 'Childrens', href: '/childrens', current: false },
        { name: 'Create', href: '/childrens/create', current: false },

    ];


    return (
        <AuthenticatedLayout>
            <Head title="Create Children's Record" />

            <div className="">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <HomeIcon className="h-5 w-5" />
                                <span className="sr-only">Home</span>
                            </a>
                        </li>
                        {pages.map((page) => (
                            <li key={page.name}>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                                    <a
                                        href={page.href}
                                        className="ml-4 text-sm font-medium text-green-700 hover:text-green-900"
                                        aria-current={page.current ? 'page' : undefined}
                                    >
                                        {page.name}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>


                <div className="flex flex-col gap-4 mt-4">
                    <div className="bg-white rounded-lg border md:p-4">
                        {/* Form */}
                        <form onSubmit={submit}>
                            <h1>Personal Details</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={data.name || ""}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Surname, First Name Middle, Initial."
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                                </div>

                                {/* Birth Date Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                                    <input
                                        type="date"
                                        value={data.birth_date || ""}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                    {errors.birth_date && <div className="text-red-500">{errors.birth_date}</div>}
                                </div>

                                {/* Gender Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && <div className="text-red-500">{errors.gender}</div>}
                                </div>

                                {/* Weight Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={data.weight}
                                        onChange={(e) => setData('weight', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                    {errors.weight && <div className="text-red-500">{errors.weight}</div>}
                                </div>

                                {/* Height Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                                    <input
                                        type="number"
                                        value={data.height}
                                        onChange={(e) => setData('height', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                    {errors.height && <div className="text-red-500">{errors.height}</div>}
                                </div>

                                {/* Address Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        value={data.address || ""}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Address"
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                    {errors.address && <div className="text-red-500">{errors.address}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                {/* Parent Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Parent's Name</label>
                                    <input
                                        type="text"
                                        value={data.parent_name || ""}
                                        onChange={(e) => setData('parent_name', e.target.value)}
                                        placeholder="Parent's Full Name"
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                    {errors.parent_name && <div className="text-red-500">{errors.parent_name}</div>}
                                </div>

                                {/* Parent Age */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Parent's Age</label>
                                    <input
                                        type="number"
                                        value={data.parent_age || ""}
                                        onChange={(e) => setData('parent_age', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                    {errors.parent_age && <div className="text-red-500">{errors.parent_age}</div>}
                                </div>

                                {/* Parent Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Parent's Email</label>
                                    <input
                                        type="email"
                                        value={data.email || ""}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                    {errors.email && <div className="text-red-500">{errors.email}</div>}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={data.phone_number || ""}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                    {errors.phone_number && <div className="text-red-500">{errors.phone_number}</div>}
                                </div>

                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="m-4 bg-green-400  text-white px-20 py-2 rounded-lg"
                                >
                                    {processing ? "Submitting..." : "Submit"}
                                </button>
                            </div>



                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateChildren;
