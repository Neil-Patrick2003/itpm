import React, { useState } from 'react';
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { FaUser, FaBirthdayCake, FaPhoneAlt, FaHome, FaWeight, FaRuler, FaEnvelope, FaArrowLeft } from "react-icons/fa";

const CreateRecord = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        children_name: '',
        birth_date: '',
        parent_name: '',
        address: '',
        phone_number: '',
        email: '',
        weight: '',
        height: '',
        gender: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/health_workers/records/general/new_record', {
            onSuccess: () => {
                reset(); // Clear the form data on success
                // Optionally add success notification or redirect
            },
            onError: () => {
                // Optionally handle error state or display a message
            },
        });
    }

    return (
        <WorkerLayout>
            <Head title="Add Record" />

            <Link href="/health_workers/records">
                <FaArrowLeft />
            </Link>

            <h2 className="text-center">New Record</h2>
            <form onSubmit={submit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-4">
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

                    {/* Height */}
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

                    {/* Gender */}
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

                    {/* Guardian Name */}
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

                    {/* Phone Number */}
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

                    {/* Address */}
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

                    {/* Email */}
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

                {/* Submit Button */}
                <div className="flex w-full justify-center p-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-200 w-full md:w-1/3 py-2 rounded-full shadow drop-shadow-xl/25"
                    >
                        {processing ? "Saving..." : "Submit"}
                    </button>
                </div>
            </form>
        </WorkerLayout>
    );
}

export default CreateRecord;
