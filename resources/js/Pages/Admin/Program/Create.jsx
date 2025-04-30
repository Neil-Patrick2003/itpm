import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const Create = ({ sponsors }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        duration: '',
        total_beneficiaries: '',
        sponsor_ids: [],
        cover_photo: null,
    });

    const [selectedSponsorIds, setSelectedSponsorIds] = useState([]);

    useEffect(() => {
        setData('sponsor_ids', selectedSponsorIds);
    }, [selectedSponsorIds]);

    const handleFileChange = (e) => setData('cover_photo', e.target.files[0]);
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) setData('cover_photo', file);
    };

    const handleSponsorToggle = (id) => {
        setSelectedSponsorIds((prev) =>
            prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
        );
    };

    const submitProgram = (e) => {
        e.preventDefault();
        post('/programs/create', {
            onFinish: () => reset(),
        });
    };


    return (
        <AuthenticatedLayout>
            <div className="min-h-screen">
                <div className="flex flex-col h-full w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg">
                        {/* Sponsor Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="flex flex-col gap-3">
                                <h2 className="bg-[#01DA9F] text-white p-3 rounded-lg font-semibold text-center text-xs sm:text-base">
                                    Create Program
                                </h2>

                                <div className="border border-slate-300 p-3 sm:p-4 rounded-lg">
                                    <h3 className="text-sm sm:text-lg font-semibold text-green-600 mb-2">Select Sponsors</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                                        Selected: {selectedSponsorIds.length}
                                    </p>

                                    <div className="space-y-3 sm:space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                                        {sponsors.map((sponsor) => {
                                            const isSelected = selectedSponsorIds.includes(sponsor.id);
                                            return (
                                                <div
                                                    key={sponsor.id}
                                                    className="flex items-center justify-between border-b pb-2"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={sponsor.profile_photo_url || ''}
                                                            alt={sponsor.name}
                                                            className="w-8 h-8 rounded-full bg-gray-100 object-cover"
                                                        />
                                                        <div>
                                                            <p className="text-xs sm:text-sm font-medium text-gray-900">{sponsor.name}</p>
                                                            <p className="text-xs text-gray-500">{sponsor.email}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSponsorToggle(sponsor.id)}
                                                        className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium border transition
                                                            ${isSelected
                                                            ? 'bg-red-100 text-red-600 border-red-300 hover:bg-red-200'
                                                            : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'}
                                                        `}
                                                    >
                                                        {isSelected ? 'Remove' : '+ Add'}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Form Section */}
                        <main className="lg:col-span-3">
                            <form onSubmit={submitProgram} className="space-y-4 sm:space-y-6">
                                <TextField
                                    label="Program Title"
                                    variant="outlined"
                                    fullWidth
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    className="text-xs sm:text-sm"
                                />
                                <InputError message={errors.title} />

                                <div>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full h-48 sm:h-60 p-3 sm:p-4 border border-slate-300 rounded-lg text-xs sm:text-sm"
                                        placeholder="Program Description"
                                        required
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                {/* Detail Inputs */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold mb-1">Start Date</label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-xs sm:text-sm"
                                        />
                                        <InputError message={errors.start_date} />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold mb-1">Duration (days)</label>
                                        <input
                                            type="number"
                                            value={data.duration}
                                            onChange={(e) => setData('duration', e.target.value)}
                                            className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-xs sm:text-sm"
                                        />
                                        <InputError message={errors.duration} />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold mb-1">Beneficiaries</label>
                                        <input
                                            type="number"
                                            value={data.total_beneficiaries}
                                            onChange={(e) => setData('total_beneficiaries', e.target.value)}
                                            className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-xs sm:text-sm"
                                        />
                                        <InputError message={errors.total_beneficiaries} />
                                    </div>
                                </div>

                                {/* File Upload */}
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Upload Cover Photo</p>
                                    <div
                                        className="flex items-center justify-center h-40 sm:h-52 mt-2 border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-lg"
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <label
                                            htmlFor="dropzone-file"
                                            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                                        >
                                            <svg className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 018 0m4 0a4 4 0 118 0m-8-6v6" />
                                            </svg>
                                            <p className="text-xs sm:text-sm text-gray-600">Click or drag to upload</p>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                    <InputError message={errors.cover_photo} />
                                </div>

                                {/* Submit */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 rounded-lg transition"
                                    >
                                        Submit Program
                                    </button>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
