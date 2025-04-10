import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const AddBeneficiaries = ({ program, records }) => {
    const { data, setData, post, reset } = useForm({
        record_ids: [],
    });

    const predefinedAddresses = [
        'Acle', 'Bayudbud', 'Bolboc', 'Burgos (Poblacion)', 'Dalima', 'Dao', 'Guinhawa',
        'Lumbangan', 'Luna (Poblacion)', 'Luntal', 'Magahis', 'Malibu', 'Mataywanac',
        'Palincaro', 'Putol', 'Rillo (Poblacion)', 'Rizal (Poblacion)', 'Sabang',
        'San Jose', 'Talon', 'Toong', 'Tuyon-Tuyon'
    ];

    const [selectedAddress, setSelectedAddress] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState(records);

    useEffect(() => {
        handleCategoryFilter();
    }, [selectedAddress]);

    const toggleSelection = (id) => {
        const newSelection = [...data.record_ids];
        const index = newSelection.indexOf(id.toString());
        if (index > -1) newSelection.splice(index, 1);
        else newSelection.push(id.toString());
        setData('record_ids', newSelection);
    };

    const handleCategoryFilter = () => {
        if (selectedAddress.length > 0) {
            const updated = records.filter(record =>
                selectedAddress.includes(record.address)
            );
            setFilteredRecords(updated);
        } else {
            setFilteredRecords(records);
        }
    };

    const roundToTwoDecimals = (num) => (num ? num.toFixed(2) : 'N/A');

    const submit = (e) => {
        e.preventDefault();
        post(`/programs/${program.id}/add_beneficiaries`, {
            onFinish: () => reset(),
        });
    };

    const handleCategorySelection = (address) => {
        setSelectedAddress((prev) =>
            prev.includes(address)
                ? prev.filter(item => item !== address)
                : [...prev, address]
        );
    };

    const resetCategoryFilter = () => {
        setSelectedAddress([]);
        setFilteredRecords(records);
    };

    const countSelectedPerCategory = (address) => {
        return records.filter(
            (record) => record.address === address && data.record_ids.includes(record.id.toString())
        ).length;
    };

    const breadcrumbs = [
        { name: 'Programs', href: '/programs' },
        { name: 'Add Beneficiary', href: '#' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Programs" />

            <div className="flex flex-col gap-y-6 bg-gray-50">

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-4">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <a href="/" className="text-gray-400 hover:text-gray-500">
                                <HomeIcon className="size-5" aria-hidden="true" />
                                <span className="sr-only">Home</span>
                            </a>
                        </li>
                        {[
                            { name: 'Programs', href: '/programs' },
                            { name: 'Add Beneficiary', href: '#' },
                        ].map((page, idx) => (
                            <li key={idx} className="flex items-center">
                                <ChevronRightIcon className="size-5 text-gray-400" />
                                <a href={page.href} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    {page.name}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <form onSubmit={submit} className="flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">

                        {/* LEFT: Records (no vertical scroll, grows naturally) */}
                        <div className="col-span-3 flex flex-col bg-white shadow-lg rounded-xl">
                            <div className="p-6 border-b">
                                <h1 className="font-semibold text-2xl text-gray-800">All Children Records</h1>
                                <p className="text-lg text-gray-600 mt-2">
                                    Beneficiaries: <span className="text-green-600 font-bold">{data.record_ids.length}</span> / {program.total_beneficiaries}
                                </p>
                            </div>

                            {/* Full growing list */}
                            <div className="p-6">
                                <ul className="space-y-4">
                                    {filteredRecords.map((record) => {
                                        const isSelected = data.record_ids.includes(record.id.toString());

                                        return (
                                            <li key={record.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-semibold text-lg text-gray-800">{record.children_name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleSelection(record.id)}
                                                        className={`${
                                                            isSelected ? "bg-red-500" : "bg-green-500"
                                                        } text-white py-2 px-4 rounded-md flex items-center gap-2`}
                                                    >
                                                        {isSelected ? <><AiOutlineCheck /> Remove</> : <><AiOutlinePlus /> Add</>}
                                                    </button>
                                                </div>
                                                <div className="text-sm text-gray-700">
                                                    <p><strong>BMI:</strong> {roundToTwoDecimals(record.bmi)}</p>
                                                    <p><strong>Address:</strong> {record.address}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT: Sticky Filter Panel */}
                        <div className="bg-white shadow-lg p-6 rounded-xl h-fit sticky top-24 self-start">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Address Categories</h2>

                            <div className="space-y-2">
                                {predefinedAddresses.map((address, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleCategorySelection(address)}
                                        className={`${
                                            selectedAddress.includes(address) ? "bg-green-600 text-white" : "bg-white"
                                        } border border-slate-300 py-2 px-4 rounded-md w-full text-left hover:bg-green-500 hover:text-white`}
                                    >
                                        {address} ({countSelectedPerCategory(address)})
                                    </button>
                                ))}
                            </div>

                            {selectedAddress.length > 0 && (
                                <button
                                    type="button"
                                    onClick={resetCategoryFilter}
                                    className="mt-6 text-red-500 hover:text-red-600"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
                        >
                            Submit Selected Beneficiaries
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default AddBeneficiaries;
