import React, {useEffect, useState} from 'react'
import {Head, Link, router} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {debounce} from "@mui/material";
import { FaSearch } from 'react-icons/fa';  // Importing the search icon


const AdminDashboard = ({ childrens , search = '' , page = 1}) => {
    // Function to calculate age based on the birth date
    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        return today.getFullYear() - birthDate.getFullYear();
    };

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (search) {
            setSearchTerm(search);
        }
    }, []);

    const handleSearchTermChange = (value) => {
        setSearchTerm(value)

        const debouncedSearchTerm = debounce(() => {
            const query = { page, search: value };

            router.get('/childrens', query, {
                preserveState: true,
                replace: true
            })
        }, 500);

        debouncedSearchTerm();

        return () => debouncedSearchTerm.cancel()
    }



    return (

        <AuthenticatedLayout>
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
                                    <div className="flex gap-4 items-center mb-2">
                                        <div className="relative w-full max-w-xl"> {/* max-w-xl for a larger width */}
                                            <input
                                                value={searchTerm}
                                                type="text"
                                                name="Search"
                                                id="searchInput"
                                                className="border-2 border-green-500 rounded-full h-10 px-4 pl-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 w-full"
                                                onChange={(e) => handleSearchTermChange(e.target.value)}
                                                placeholder="Search..."
                                            />
                                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                                        </div>
                                    </div>

                                    <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-[#01DAA2]">
                                            <tr>
                                                <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-white sm:pl-6">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Age
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Gender
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Status
                                                </th>
                                                <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                            {childrens.data.map((children) => (
                                                <tr key={children.id}>
                                                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                        {children.name}
                                                    </td>
                                                    {/* Display calculated age */}
                                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {calculateAge(children.birth_date)} years
                                                    </td>
                                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {children.gender}
                                                    </td>
                                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {/* Optional status can be added here */}
                                                        N/A
                                                    </td>
                                                    <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            View<span className="sr-only">, {children.name}</span>
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
                        <div className="flex gap-2 justify-end mt-2 items-center">
                            {childrens.links.map((link) => (
                                link.url ? (
                                    <Link
                                        key={link.label}
                                        href={link.url}
                                        className={`p-2 px-4 text-sm font-medium rounded-md
                                    ${link.active ? "bg-green-600 text-white font-bold hover:bg-green-500"
                                            : "bg-white text-gray-700 hover:bg-green-50"}
                                    border border-gray-300 shadow-md transition-all duration-200`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={link.label}
                                        className="p-2 px-4 text-sm font-medium text-slate-400 cursor-not-allowed
                                    bg-white border border-gray-300 shadow-md rounded-md"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default AdminDashboard;
