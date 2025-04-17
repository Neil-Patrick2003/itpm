import React, {useEffect, useState} from 'react'
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import {debounce} from "@mui/material";
import {ToastContainer, toast} from "react-toastify";

const RecordIndex = ({ records, search = '', page = 1}) => {


    function calculateAge(birth_date) {
        const birthDateObj = new Date(birth_date); // Convert the birthDate string to a Date object
        const today = new Date(); // Get the current date

        // Calculate the age by comparing the years, months, and days
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDifference = today.getMonth() - birthDateObj.getMonth();

        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    }

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

            router.get('/health_workers/records', query, {
                preserveState: true,
                replace: true
            })
        }, 500);

        debouncedSearchTerm();

        return () => debouncedSearchTerm.cancel()
    }

    const pages = [
        { name: 'Records', href: '/health_workers/records', current: false },

    ]
    const [deletingUser, setDeletingUser] = useState(null);
    const {delete: deleteUser} = useForm();
    const handleDeleteUser = () => {

        deleteUser(`/users/${deletingUser.id}`, {
            onSuccess: () => {
                'message', 'success';
            },
            onError: (error) => {
                alert("Error deleting the user.");
            }
        });
    };

    const notify = () => toast("Wow so easy!");



    return (
        <WorkerLayout>
            <Head title="Records" />
            <div>
                <button onClick={notify}>Notify!</button>
                <ToastContainer />
            </div>
            <div className="sm:flex  sm:items-center border p-4 ">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">Records</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>

                <div className="w-full mt-2 md:mt-0 md:w-1/3">
                    <input
                        value={searchTerm}
                        type="text" name="Search"
                        onChange={(e) => handleSearchTermChange(e.target.value)}
                        className="border-2 border-green-500 rounded-full h-10 px-4 pl-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 w-full"
                        placeholder="Search..."
                    />
                </div>
                <div className="mt-4 sm:mt-0  ml-2 sm:flex-none">
                    <Link
                        href='/health_workers/records/create'
                        className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Record
                    </Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">


                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Date

                                    </th>
                                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Age
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Height <span className="text-gray-600">(cm)</span>
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Weight <span className="text-gray-600">(kg)</span>
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Address
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Guardian
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Contact Number
                                    </th>

                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {records.data.map((record) => (
                                    <tr key={record.email}>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {new Date(record.created_at).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-600 sm:pl-6">
                                            {record.children_name}
                                        </td>

                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{calculateAge(record.birth_date)}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{record.height}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{record.weight}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{record.gender}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{record.address}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{record.parent_name}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{record.phone_number}</td>

                                        <td className="relative  py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                                            <Link href={`/health_workers/records/${record.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                Edit<span className="sr-only">, {record.name}</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2 justify-end py-2 mb-4 items-center">
                        {records.links.map((link) => (
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

        </WorkerLayout>
    )
}

export default RecordIndex
