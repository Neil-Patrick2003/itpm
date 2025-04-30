import React, { useState } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import Avatar from '@mui/material/Avatar';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { FaUser, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { ChevronRightIcon, HomeIcon, PlusIcon } from '@heroicons/react/20/solid';

const AdminDashboard = ({ sponsors }) => {
    const [isAddSponsorOpen, setIsSponsorOpen] = useState(false);
    const [avatar, setAvatar] = useState('');
    const { flash } = usePage().props;
    const imageUrl = '/storage/';

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone_number: '',
        photo_url: '',
    });

    const openAddSponsor = () => setIsSponsorOpen(true);
    const closeAddSponsor = () => setIsSponsorOpen(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
            setData('photo_url', file);
        }
    };

    const submitCreateUser = (e) => {
        e.preventDefault();
        post('/sponsorships/create', {
            onSuccess: () => {
                setIsSponsorOpen(false);
                setData({ name: '', email: '', phone_number: '', photo_url: '' });
                setAvatar('');
            },
        });
    };

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(' ');
        const initials = nameSplit.length > 1
            ? `${nameSplit[0][0]}${nameSplit[1][0]}`
            : `${nameSplit[0][0]}`;
        return {
            sx: { bgcolor: '#4CAF50' },
            children: initials.toUpperCase(),
        };
    };

    return (
        <AuthenticatedLayout>
            <Head title="Sponsors" />

            {/* Modal for Adding Sponsor */}
            <Modal show={isAddSponsorOpen} onClose={closeAddSponsor} closable>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">Add Sponsor</h2>
                    <form onSubmit={submitCreateUser}>
                        <div className="flex justify-center mb-6">
                            <label htmlFor="avatar" className="cursor-pointer relative">
                                <img
                                    src={avatar || '/default-avatar.png'}
                                    alt="Avatar Preview"
                                    className="w-32 h-32 object-cover rounded-full border-4 border-green-700"
                                />
                                <input
                                    id="avatar"
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                icon={FaUser}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                className="w-full"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                name="email"
                                icon={MdEmail}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                className="w-full"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="mb-6">
                            <InputLabel htmlFor="phone_number" value="Phone Number" />
                            <TextInput
                                id="phone_number"
                                name="phone_number"
                                icon={FaPhone}
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                required
                                className="w-full"
                            />
                            <InputError message={errors.phone_number} />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeAddSponsor}
                                className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                disabled={processing}
                            >
                                {processing ? 'Creating...' : 'Create'}
                            </button>
                        </div>

                    </form>
                </div>
            </Modal>

            {/* Breadcrumb */}
            <div className="flex flex-col w-full min-h-screen gap-6">
                <nav aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <HomeIcon className="h-5 w-5" />
                                <span className="sr-only">Home</span>
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                                <span className="ml-4 text-sm font-medium text-green-700">Sponsors</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Add Sponsor Button */}
                <div className="flex justify-end">
                    <Link href='/sponsorships/create'>
                        <button
                            className="flex items-center gap-2 bg-[#01DAA2] hover:bg-green-500 text-white px-4 py-2 rounded-full transition"
                            // onClick={openAddSponsor}
                        >
                            <PlusIcon className="h-5 w-5" /> Add New Sponsor
                        </button>
                    </Link>

                </div>

                {/* Sponsors List */}
                <div className="bg-white shadow rounded-md p-6">
                    <h2 className="text-xl font-semibold mb-4">All Sponsors</h2>

                    {sponsors.data.length === 0 ? (
                        <p className="text-gray-500 text-sm">No sponsors found.</p>
                    ) : (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {sponsors.data.map((sponsor) => (
                                <li key={sponsor.id}>
                                    <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition">
                                        <div className="shrink-0">
                                            {sponsor.profile_photo_url ? (
                                                <img
                                                    src={imageUrl + sponsor.profile_photo_url}
                                                    alt={sponsor.name}
                                                    className="rounded-full w-12 h-12 object-cover"
                                                />
                                            ) : (
                                                <Avatar {...stringAvatar(sponsor.name)} sx={{ width: 48, height: 48 }} />
                                            )}
                                        </div>
                                        <Link href={`/sponsorships/${sponsor.id}`} className="flex flex-col">
                                            <p className="font-semibold text-sm">{sponsor.name}</p>
                                            <span className="text-xs text-gray-500">
                                                {new Date(sponsor.created_at).toLocaleDateString('en-GB')}
                                            </span>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
