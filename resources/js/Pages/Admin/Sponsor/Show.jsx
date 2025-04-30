import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion';

const SponsorShow = ({ sponsor }) => {
    const imageUrl = '/storage/';

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
            <Head title={sponsor.name} />

            <div className="min-h-screen">
                <div className="space-y-8">
                    <Link href="/sponsorships" className="text-sm text-blue-600 hover:underline">
                        ← Back to Sponsors
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl p-8 flex flex-col items-center text-center"
                    >
                        {sponsor.photo_url ? (
                            <motion.img
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: 'spring' }}
                                src={`${imageUrl}${sponsor.photo_url}`}
                                alt={sponsor.name}
                                className="size-32 rounded-full object-cover border-4 border-white "
                            />
                        ) : (
                            <Avatar {...stringAvatar(sponsor.name)} sx={{ width: 128, height: 128 }} />
                        )}

                        <h2 className="mt-4 text-2xl font-bold text-gray-800">{sponsor.name}</h2>
                        <p className="text-gray-500">{sponsor.email}</p>
                        <p className="text-gray-500">{sponsor.phone_number}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white  rounded-2xl p-6"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Donations</h3>

                        {sponsor.donations.length === 0 ? (
                            <p className="text-gray-500 text-sm">No donations recorded.</p>
                        ) : (
                            <div className="space-y-6">
                                {sponsor.donations.map((donation, index) => (
                                    <motion.div
                                        key={donation.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm font-medium text-gray-700">
                                                Date: {new Date(donation.created_at).toLocaleDateString()}
                                            </p>
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                                {donation.type || 'N/A'}
                                            </span>
                                        </div>

                                        <div className="ml-2">
                                            {donation.type === 'cash' ? (
                                                <>
                                                    <p className="text-sm font-semibold mb-1 text-gray-700">Amount:</p>
                                                    <p className="text-green-700 font-medium text-sm">₱ {donation.amount}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm font-semibold mb-1 text-gray-700">Items:</p>
                                                    {donation.donation_items.length === 0 ? (
                                                        <p className="text-gray-400 text-sm">No items listed.</p>
                                                    ) : (
                                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                                            {donation.donation_items.map((item) => (
                                                                <li key={item.id}>
                                                                    {item.description} — Qty: {item.quantity}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default SponsorShow;
