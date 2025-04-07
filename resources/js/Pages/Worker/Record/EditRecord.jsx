import React, { useEffect, useState } from 'react';
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import Tooltip from '@mui/material/Tooltip';
import { FaUser, FaBirthdayCake, FaPhoneAlt, FaHome, FaWeight, FaRuler, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import { router } from '@inertiajs/react';

const EditRecord = () => {
    const { message, record } = usePage().props;

    useEffect(() => {
        if (message) {
            alert(message);
        }
    }, [message]);

    // Use the 'useForm' hook to manage form data state
    const { data, setData, post, processing, errors, reset } = useForm({
        children_name: record.children_name || '',
        birth_date: record.birth_date || '',
        parent_name: record.parent_name || '',
        address: record.address || '',
        phone_number: record.phone_number || '',
        email: record.email || '',
        weight: record.weight || '',
        height: record.height || '',
        gender: record.gender || '',
    });

    // Submit handler
    function submit(e) {
        e.preventDefault();

        // Submit the form data via Inertia's POST method
        post(`/health_workers/records/${record.id}`, {
            data: {
                children_name: data.children_name,
                birth_date: data.birth_date,
                parent_name: data.parent_name,
                address: data.address,
                phone_number: data.phone_number,
                email: data.email,
                weight: data.weight,
                height: data.height,
                gender: data.gender,
            },
            onSuccess: (response) => {
                setData({
                    children_name: response.record.children_name,
                    birth_date: response.record.birth_date,
                    parent_name: response.record.parent_name,
                    address: response.record.address,
                    phone_number: response.record.phone_number,
                    email: response.record.email,
                    weight: response.record.weight,
                    height: response.record.height,
                    gender: response.record.gender,
                });
                reset();
            },
            onError: () => {},
        });
    }

    // Delete Record
    function deleteRecord() {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            confirmButtonColor: '#7BDCA2',
            cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/health_workers/records/${record.id}`)
            }
        });
    }

    return (
        <WorkerLayout>
            <Head title="Edit Record" />
            <div className="flex justify-between">
                <Tooltip title="Back" arrow>
                    <Link href="/health_workers/records">
                        <FaArrowLeft />
                    </Link>
                </Tooltip>
                <Tooltip title="Delete" arrow>
                    <button onClick={deleteRecord} className="text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </Tooltip>
            </div>
            <h2 className="text-center">Edit Record</h2>
            <form onSubmit={submit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {/* Children Name */}
                    <div className="col-span-3 md:col-span-2 ">
                        <div className="w-full mt-4">
                            <InputLabel htmlFor="children_name" value="Children Name" />
                            <TextInput
                                id="children_name"
                                type="text"
                                name="children_name"
                                value={data.children_name}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('children_name', e.target.value)}
                                required
                                icon={FaUser}
                            />
                            <InputError message={errors.children_name} className="mt-2" />
                        </div>
                    </div>

                    {/* Birth Date */}
                    <div className="cols-span-3 md:col-span-1">
                        <div className="w-full mt-4">
                            <InputLabel htmlFor="birth_date" value="Birth Date" />
                            <TextInput
                                id="birth_date"
                                type="date"
                                name="birth_date"
                                value={data.birth_date}
                                className="mt-1 block w-full text-gray-400"
                                onChange={(e) => setData('birth_date', e.target.value)}
                                required
                                icon={FaBirthdayCake}
                            />
                            <InputError message={errors.birth_date} className="mt-2" />
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="col-span-3 md:col-span-1">
                        <div className="w-full mt-4">
                            <InputLabel htmlFor="weight" value="Weight (kg)" />
                            <TextInput
                                id="weight"
                                type="number"
                                name="weight"
                                value={data.weight}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('weight', e.target.value)}
                                required
                                icon={FaWeight}
                            />
                            <InputError message={errors.weight} className="mt-2" />
                        </div>
                    </div>

                    <div className="col-span-3 md:col-span-1">
                        <div className="w-full mt-4">
                            <InputLabel htmlFor="height" value="Height (cm)" />
                            <TextInput
                                id="height"
                                type="number"
                                name="height"
                                value={data.height}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('height', e.target.value)}
                                required
                                icon={FaRuler}
                            />
                            <InputError message={errors.height} className="mt-2" />
                        </div>
                    </div>

                    <div className="col-span-3 md:col-span-1">
                        <div className="w-full mt-4">
                            <InputLabel htmlFor="gender" value="Gender" />
                            <select
                                className="mt-1 block border-gray-300 rounded-md w-full text-gray-400"
                                name="gender"
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                            >
                                <option>--Select--</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <InputError message={errors.gender} className="mt-2" />
                        </div>
                    </div>

                    <div className="col-span-3 md:col-span-2">
                        <div className="w-full mt-4">
                            <InputLabel htmlFor="parent_name" value="Guardian Name" />
                            <TextInput
                                id="parent_name"
                                type="text"
                                name="parent_name"
                                value={data.parent_name}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('parent_name', e.target.value)}
                                required
                                icon={FaUser}
                            />
                            <InputError message={errors.parent_name} className="mt-2" />
                        </div>
                    </div>

                    <div className="col-span-3 md:col-span-1">
                        <div className="w-full mt-4">
                            <InputLabel htmlFor="phone_number" value="Phone Number" />
                            <TextInput
                                id="phone_number"
                                type="text"
                                name="phone_number"
                                value={data.phone_number}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('phone_number', e.target.value)}
                                required
                                icon={FaPhoneAlt}
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>
                    </div>

                    <div className="col-span-3 md:col-span-2">
                        <div className="w-full mt-4">
                            <InputLabel htmlFor="address" value="Address" />
                            <TextInput
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('address', e.target.value)}
                                required
                                icon={FaHome}
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                    </div>

                    <div className="col-span-3 md:col-span-1">
                        <div className="w-full mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                icon={FaEnvelope}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-center p-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-200 w-full md:w-48 text-white font-medium rounded-md py-2 px-4 hover:bg-green-300 disabled:opacity-50"
                    >
                        Save
                    </button>
                </div>
            </form>
        </WorkerLayout>
    );
};

export default EditRecord;
