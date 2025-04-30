import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';

const Show = ({ sponsor, donations }) => {

    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="h-screen p-4">
                <div className="flex flex-col h-full gap-4">
                    <div className="bg-white border h-28 p-4 rounded-lg">show</div>
                    <div className="overflow-y-auto bg-white border h-full p-4 rounded-lg">
                        <div className="flex justify-between">
                            <Link href={`/sponsorships`} className="text-blue-500">Back</Link>
                            <div>
                                    <Link href={`/sponsorships/${sponsor.id}/donation`} className="border px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700">
                                    Add Donations
                                </Link>
                            </div>
                        </div>
                        <h1 className="text-center">
                            Sponsor by <span className="text-green-800 font-bold text-lg">{sponsor.name}</span>
                        </h1>

                        {sponsor.donations.map((donation) => (

                            donation.type === 'goods' ? (

                                <div key={donation.id} className="mt-4 shadow-md ">
                                    <p>Donated at {new Date(donation.created_at).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</p>
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Item
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Quantity
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {donation.donation_items.map((item) => (
                                            <tr key={`${donation.id}_donation.${item.id}`}>
                                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                    {item.description}
                                                </td>
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    {item.qty}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div key={donation.id} className="w-full border p-4 mt-4">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">Donation Type: {donation.type}</p>
                                        <div className="flex gap-2">
                                            <p className="font-medium">Amount:</p>
                                            <div className="border-2 border-green-600 px-4 py-1 rounded-lg">
                                                {donation.amount}.00
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
