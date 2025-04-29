import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

const AddBeneficiaries = ({ program, records }) => {
    console.log(records);
    const { data, setData, post, reset } = useForm({ record_ids: [] });
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
            setFilteredRecords(records.filter(record =>
                selectedAddress.includes(record.address)
            ));
        } else {
            setFilteredRecords(records);
        }
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

    const selectAllFiltered = () => {
        const newSelection = [
            ...new Set([
                ...data.record_ids,
                ...filteredRecords.map(r => r.id.toString())
            ]),
        ];
        setData('record_ids', newSelection);
    };

    const unselectAllFiltered = () => {
        const filteredIds = filteredRecords.map(r => r.id.toString());
        const newSelection = data.record_ids.filter(id => !filteredIds.includes(id));
        setData('record_ids', newSelection);
    };

    const submit = (e) => {
        e.preventDefault();
        post(`/programs/${program.id}/add_beneficiaries`, { onFinish: () => reset() });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Full Name', width: 500 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'gender', headerName: 'Gender', width: 200 },
        { field: 'address', headerName: 'Address', width: 400 },
        { field: 'status', headerName: 'Status', width: 140 },
        {
            field: 'action',
            headerName: 'Action',
            width: 140,
            sortable: false,
            renderCell: (params) => {
                const isSelected = data.record_ids.includes(params.row.id.toString());
                return (
                    <button
                        type="button"
                        onClick={() => toggleSelection(params.row.id)}
                        className={`flex items-center mt-3 gap-2 px-4 py-1 rounded-full text-sm font-medium ${
                            isSelected ? "bg-red-500 text-white" : "bg-green-500 text-white"
                        }`}
                    >
                        {isSelected ? <><AiOutlineCheck /> Remove</> : <><AiOutlinePlus /> Add</>}
                    </button>
                );
            }
        }
    ];

    const rows = filteredRecords.map((record) => {
        let status = 'Unknown';
        if (record.bmi !== null && record.bmi !== undefined) {
            if (record.bmi < 18.5) status = 'Underweight';
            else if (record.bmi < 24.9) status = 'Normal';
            else if (record.bmi < 29.9) status = 'Overweight';
            else status = 'Obese';
        }

        return {
            id: record.id,
            name: record.name,
            age: record.age,
            gender: record.gender,
            address: record.address,
            status: status,
        };
    });

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

    return (
        <AuthenticatedLayout>
            <Head title="Add Beneficiaries" />

            <div className="pace-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Add Beneficiaries to Program: <span className="text-blue-600">{program.name}</span>
                    </h1>
                </div>

                {/* Address Filter */}
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-gray-700">Filter by Address</h2>

                        <div className="flex gap-2">
                            <button
                                onClick={selectAllFiltered}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 text-sm rounded-md font-medium"
                            >
                                Select All Filtered
                            </button>
                            <button
                                onClick={unselectAllFiltered}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 text-sm rounded-md font-medium"
                            >
                                Unselect All Filtered
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {predefinedAddresses.map(address => (
                            <button
                                key={address}
                                onClick={() => handleCategorySelection(address)}
                                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                                    selectedAddress.includes(address)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                {address}
                                {countSelectedPerCategory(address) > 0 && (
                                    <span className="ml-1 inline-block text-xs bg-white text-blue-600 rounded-full px-2">
                                        {countSelectedPerCategory(address)}
                                    </span>
                                )}
                            </button>
                        ))}
                        {selectedAddress.length > 0 && (
                            <button
                                onClick={resetCategoryFilter}
                                className="px-3 py-1 bg-red-500 text-white text-sm rounded-full"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg p-4">
                    <Paper sx={{ height: 500, width: '100%' }} elevation={0}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[5, 10, 25]}
                            checkboxSelection={false}
                        />
                    </Paper>
                </div>

                {/* Submit Button */}
                <form onSubmit={submit} className="text-right">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 mt-4 text-white font-semibold py-2 px-6 rounded-lg"
                    >
                        Submit {data.record_ids.length} Beneficiaries
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default AddBeneficiaries;
