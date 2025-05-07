import React from 'react';
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
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
                reset();
            },
            onError: () => {
                // Optionally handle errors here
            },
        });
    }

    return (
        <WorkerLayout>
            <Head title="Add Record" />
            <div>
                <Link href="/health_workers/records" className="flex items-center text-green-600 hover:underline mb-6">
                    <FaArrowLeft className="mr-2" />
                    Back
                </Link>
                <h2 className="text-center text-3xl font-semibold mb-8 text-gray-800">New Record</h2>
            </div>



            <form onSubmit={submit} className="bg-white shadow-none md:shadow-lg rounded-lg p-2 md:p-8 max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Children Name */}
                    <div>
                        <InputLabel htmlFor="children_name" value="Children Name" />
                        <TextInput
                            id="children_name"
                            type="text"
                            name="children_name"
                            value={data.children_name}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            onChange={(e) => setData('children_name', e.target.value)}
                            required
                            icon={FaUser}
                        />
                        <InputError message={errors.children_name} className="mt-2" />
                    </div>

                    {/* Birth Date */}
                    <div>
                        <InputLabel htmlFor="birth_date" value="Birth Date" />
                        <TextInput
                            id="birth_date"
                            type="date"
                            name="birth_date"
                            value={data.birth_date}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            onChange={(e) => setData('birth_date', e.target.value)}
                            required
                            icon={FaBirthdayCake}
                        />
                        <InputError message={errors.birth_date} className="mt-2" />
                    </div>

                    {/* Weight */}
                    <div>
                        <InputLabel htmlFor="weight" value="Weight (kg)" />
                        <TextInput
                            id="weight"
                            type="number"
                            name="weight"
                            value={data.weight}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            onChange={(e) => setData('weight', e.target.value)}
                            required
                            icon={FaWeight}
                        />
                        <InputError message={errors.weight} className="mt-2" />
                    </div>

                    {/* Height */}
                    <div>
                        <InputLabel htmlFor="height" value="Height (cm)" />
                        <TextInput
                            id="height"
                            type="number"
                            name="height"
                            value={data.height}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            onChange={(e) => setData('height', e.target.value)}
                            required
                            icon={FaRuler}
                        />
                        <InputError message={errors.height} className="mt-2" />
                    </div>

                    {/* Gender */}
                    <div>
                        <InputLabel htmlFor="gender" value="Gender" />
                        <select
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                            <option value="">-- Select --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <InputError message={errors.gender} className="mt-2" />
                    </div>

                    {/* Guardian Name */}
                    <div>
                        <InputLabel htmlFor="parent_name" value="Guardian Name" />
                        <TextInput
                            id="parent_name"
                            type="text"
                            name="parent_name"
                            value={data.parent_name}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            onChange={(e) => setData('parent_name', e.target.value)}
                            required
                            icon={FaUser}
                        />
                        <InputError message={errors.parent_name} className="mt-2" />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <InputLabel htmlFor="phone_number" value="Phone Number" />
                        <TextInput
                            id="phone_number"
                            type="text"
                            name="phone_number"
                            value={data.phone_number}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            onChange={(e) => setData('phone_number', e.target.value)}
                            required
                            icon={FaPhoneAlt}
                        />
                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <InputLabel htmlFor="address" value="Address" />
                        <TextInput
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            onChange={(e) => setData('address', e.target.value)}
                            required
                            icon={FaHome}
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            icon={FaEnvelope}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 transition-colors w-full md:w-1/4 py-3 rounded-lg text-white font-semibold shadow-lg"
                    >
                        {processing ? "Saving..." : "Submit"}
                    </button>
                </div>
            </form>
        </WorkerLayout>
    );
};

export default CreateRecord;
