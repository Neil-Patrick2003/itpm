import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";

const CreateChildren = () => {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        birth_date: '',
        gender: '',
        parent_name: '',
        email: '',
        address: '',
        parent_age: ''
    });

    function submit(e){
        e.preventDefault();

        post('/childrens/create', {
            onFinish: () => reset()
        });
    }

        return (

    <AuthenticatedLayout

        >
            <Head title="Users" />

            <div className="p-4 h-screen p-4 overflow-y-auto">
                <div className="flex flex-col h-full gap-4">
                    <div className="bg-white h-28 rounded-lg p-4">
                        <h1>Create Childrens Record</h1>
                    </div>
                    <div className="flex justify-between p-4">
                        back
                        <Link href="/childrens/create">Create</Link>
                    </div>
                    <div className="bg-white  rounded-lg p-4">
                        <div>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <h1>Personal Details</h1>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={data.email || ""}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Surname, First Name Middle, Initial."
                                            className="mt-1 block w-full px-4 py-3  bg-gray-200 border-white  focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                                        <input
                                            type="date"
                                            value={data.birth_date || ""}
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            placeholder="Surname, First Name Middle, Initial."
                                            className="mt-1 block w-full px-4 py-3  bg-gray-200 border-white  focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                                        <select name="name" onChange={(e) => setData('gender', e.target.value)} className="w-full mt-1 bg-gray-200 border-white"        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Parents Name</label>
                                        <input
                                            type="text"
                                            value={data.parent_name || ""}
                                            onChange={(e) => setData('parent_name', e.target.value)}
                                            placeholder="Surname, First Name Middle, Initial."
                                            className="mt-1 block w-full px-4 py-3  bg-gray-200 border-white  focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Parents Age</label>
                                        <input
                                            type="text"
                                            value={data.parent_name || ""}
                                            onChange={(e) => setData('parent_name', e.target.value)}
                                            placeholder="Surname, First Name Middle, Initial."
                                            className="mt-1 block w-full px-4 py-3  bg-gray-200 border-white  focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                        />
                                    </div><div>
                                    <label className="block text-sm font-medium text-gray-700">Parents Email</label>
                                    <input
                                        type="text"
                                        value={data.parent_name || ""}
                                        onChange={(e) => setData('parent_name', e.target.value)}
                                        placeholder="Surname, First Name Middle, Initial."
                                        className="mt-1 block w-full px-4 py-3  bg-gray-200 border-white  focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all sm:text-sm"
                                    />
                                </div>
                                </div>


                            </form>
                        </div>

                    </div>
                </div>


            </div>
        </AuthenticatedLayout>

    )
}

export default CreateChildren
