import React from 'react'
import {Head, Link} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
const AdminDashboard = () => {
    return (
        <AuthenticatedLayout

        >
            <Head title="Users" />

            <div className="p-4 h-screen p-4">
                <div className="flex flex-col h-full gap-4">
                    <div className="bg-white h-28 rounded-lg p-4">
                        <h1>Childrens Record</h1>
                    </div>
                    <div className="flex justify-between p-4">
                        back
                        <Link href="/childrens/create">Add new Record</Link>
                    </div>
                    <div className="bg-white h-full rounded-lg p-4">
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Role
                                                </th>
                                                <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                            {people.map((person) => (
                                                <tr key={person.email}>
                                                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                        {person.name}
                                                    </td>
                                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.title}</td>
                                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.email}</td>
                                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.role}</td>
                                                    <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Edit<span className="sr-only">, {person.name}</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </AuthenticatedLayout>
    )
}

export default AdminDashboard
