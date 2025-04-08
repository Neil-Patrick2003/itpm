import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import React, {useState} from "react";


const AddBeneficiaries = ({program, records}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        record_ids: [],
    });

    // Track checkbox changes
    const onChangeItem = (e) => {
        const { id, checked } = e.target;
        if (checked) {
            setData('record_ids', [...data.record_ids, id]);
        } else {
            setData('record_ids', data.record_ids.filter(item => item !== id));
        }
    };



    const predefinedAddresses = [
        'Eos quis sint nihil',
        'Address 2',
        'Address 3',
        'Address 4',
        'Address 5',
    ];

    const [selectedAddress, setSelectedAddress] = useState('');
    const [filteredRecords, setFilteredRecords] = useState(records);
    const [categoryCounts, setCategoryCounts] = useState({});

    const handleAddressChange = (address) => {
        setSelectedAddress(address);

        if (address === '') {
            setFilteredRecords(records);
        } else {
            const filtered = records.filter((record) => record.address === address);
            setFilteredRecords(filtered);
        }

        updateCategoryCounts(address);
    };

    const updateCategoryCounts = (address) => {
        const counts = {};
        records.forEach((record) => {
            if (!counts[record.address]) {
                counts[record.address] = 0;
            }
            counts[record.address]++;
        });
        setCategoryCounts(counts);
    };


    function submit(e){
        e.preventDefault();

        console.log(data)

        post(`/programs/${program.id}/add_beneficiaries`, {
            onFinish: () => reset()
        });
    }

    const roundToTwoDecimals = (num) => {
        if (num) {
            return num.toFixed(2);
        }
        return 'N/A';
    };

    // Filter out the selected records
    const selectedRecords = records.filter(record => data.record_ids.includes(record.id.toString()));

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Programs</title>
            </Head>

            <div className="flex flex-col gap-y-4  h-screen py-4 pr-4 pl-2 overflow-hidden">


                {/* Main Content Section */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-x-2 w-full overflow-y-auto">
                    {/* Left Section: Selected Records */}
                    <div className="col-span-2 bg-white overflow-y-auto max-h-[calc(100vh-150px)]">
                        <div className="w-full mt-4">
                            <h2 className="text-lg font-bold">Selected Records</h2>
                            <ul className="mt-4">
                                {selectedRecords.map((record) => (
                                    <li key={record.id} className="border p-2 mb-2">
                                        <span><strong>{record.children_name}</strong></span>
                                        <div>
                                            <p>BMI: {roundToTwoDecimals(record.bmi)}</p>
                                            <p>Address: {record.address}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Section: All Records */}
                    <div className="bg-white p-4 overflow-y-auto max-h-[calc(100vh-150px)]">
                        <h1>All Children Record</h1>
                        Beneficiary: {data.record_ids.length} / {program.total_beneficiaries}

                        <div className="p-4">
                            {/* Button-like Dropdown for selecting an address */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                    onClick={() => {
                                        const menu = document.getElementById('dropdownMenu');
                                        menu.classList.toggle('hidden');
                                    }}
                                >
                                    Select Address
                                </button>
                                <div
                                    id="dropdownMenu"
                                    className="absolute hidden right-0 w-48 mt-2 bg-white border border-gray-200 shadow-lg rounded-md"
                                >
                                    <ul className="py-1">
                                        <li
                                            onClick={() => handleAddressChange('')}
                                            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                        >
                                            All Addresses
                                        </li>
                                        {predefinedAddresses.map((address, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleAddressChange(address)}
                                                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                            >
                                                {address}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Category Count */}
                            <div className="mb-4">
                                {selectedAddress && (
                                    <p>
                                        <strong>Category Count for {selectedAddress}:</strong> {categoryCounts[selectedAddress] || 0}
                                    </p>
                                )}
                            </div>

                            {/* List of filtered records */}
                            <form onSubmit={submit}>
                                <ul>
                                    {filteredRecords.map((record) => (
                                        <li key={record.id} className="border p-2 mb-2">
                                            <div className="flex items-center">
                                                {/* Checkbox for each record */}
                                                <input
                                                    type="checkbox"
                                                    id={record.id}
                                                    name={`record-${record.id}`}
                                                    value={record.id}
                                                    className="mr-2"
                                                    onChange={onChangeItem}
                                                />
                                                <span>
                                                <strong>{record.children_name}</strong>
                                            </span>
                                            </div>
                                            <div>
                                                <p>BMI: {roundToTwoDecimals(record.bmi)}</p>
                                                <p>Address: {record.address}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default AddBeneficiaries;
