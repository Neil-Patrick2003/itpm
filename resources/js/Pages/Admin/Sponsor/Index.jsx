import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Avatar from '@mui/material/Avatar';
import { EnvelopeIcon, PhoneIcon, PlusIcon } from '@heroicons/react/20/solid';

const AdminDashboard = ({ sponsors }) => {
    const imageUrl = '/storage/';

    console.log(sponsors);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone_number: '',
        photo_url: '',
    });

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

            <div className="p-4">
                <div className=" space-y-6">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">All Sponsors</h2>
                        <Link href="/sponsorships/create">
                            <button className="flex items-center gap-2 bg-[#01DAA2] hover:bg-green-500 text-white px-4 py-2 rounded-md transition">
                                <PlusIcon className="h-5 w-5" />
                                Add New Sponsor
                            </button>
                        </Link>
                    </div>

                    {/* Sponsor Cards */}
                    <div className="rounded-md mb-12">
                        {sponsors.data.length === 0 ? (
                            <p className="text-gray-500 text-sm">No sponsors found.</p>
                        ) : (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {sponsors.data.map((sponsor) => (
                                    <li key={sponsor.id}
                                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm hover:shadow-md transition"
                                    >
                                        <Link href={`/sponsorships/${sponsor.id}`}>
                                            <div className="flex flex-1 flex-col p-8">
                                                {sponsor.profile_photo_url ? (
                                                    <img
                                                        alt={sponsor.name}
                                                        src={`${imageUrl}${sponsor.profile_photo_url}`}
                                                        className="mx-auto size-32 shrink-0 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <Avatar {...stringAvatar(sponsor.name)} sx={{ width: 128, height: 128, mx: 'auto' }} />
                                                )}

                                                <h3 className="mt-6 text-sm font-medium text-gray-900">{sponsor.name}</h3>
                                                <dl className="mt-1 flex grow flex-col justify-between">
                                                    <dd className="text-sm text-gray-500">{sponsor.title || 'Sponsor'}</dd>
                                                    {sponsor.role && (
                                                        <dd className="mt-3">
                                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                                            {sponsor.role}
                                                        </span>
                                                        </dd>
                                                    )}
                                                </dl>
                                            </div>
                                            <div>
                                                <div className="-mt-px flex divide-x divide-gray-200">
                                                    <div className="flex w-0 flex-1">
                                                        <a
                                                            href={`mailto:${sponsor.email}`}
                                                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                        >
                                                            <EnvelopeIcon aria-hidden="true" className="size-5 text-gray-400" />
                                                            Email
                                                        </a>
                                                    </div>
                                                    <div className="-ml-px flex w-0 flex-1">
                                                        <a
                                                            href={`tel:${sponsor.phone_number}`}
                                                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                        >
                                                            <PhoneIcon aria-hidden="true" className="size-5 text-gray-400" />
                                                            Call
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
