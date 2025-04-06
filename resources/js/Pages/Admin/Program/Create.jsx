    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
    import React, { useState } from 'react'
    import Modal from '@/Components/Modal';

    import { useForm } from '@inertiajs/react'
    import InputError from '@/Components/InputError';
    import InputLabel from '@/Components/InputLabel';
    import TextInput from '@/Components/TextInput';

    const Create = ({ sponsors }) => {
        const { data, setData, post, processing, reset, errors } = useForm({
            title: '',
            description: '',
            start_date: '',
            duration: '',
            total_beneficiaries: '',
            sponsor_ids: []
        });

        const onChangeItem = (e) => {
            const { id, checked } = e.target;
            if (checked) {
                setData('sponsor_ids', [...data.sponsor_ids, id])
            } else {
                setData('sponsor_ids', data.sponsor_ids.filter(item => item!== id));
            }
        }

        function submitProgram(e){
            e.preventDefault();

            console.log(data)

            post('/programs/create', {
                onFinish: () => reset()
            });
        }

        return (
            <AuthenticatedLayout>
                <div className='p-4 h-screen bg-blue-50'>
                    <div className='bg-white h-full p-4'>
                        <h1>Add Programs</h1>

                        <div className='flex flex-col w-full p-4'>
                            <form onSubmit={submitProgram}>
                                <div className="flex flex-col h-80 w-full p-4 border mb-4 rounded-xl">
                                    <h1>Select Sponsors</h1>
                                    <div className='flex justify-end w-full gap-3 mb-4'>
                                        <input type="text" name="" id="" className='border h-8 w-80 rounded-full' />
                                        <button className='bg-green-600 px-4 py-2 rounded-full text-white'>Search</button>
                                    </div>

                                    <div className="flex items-center gap-6 overflow-y-auto max-h-96">
                                        <div className='w-full'>
                                            {sponsors.map((sponsor) => (
                                                <div key={sponsor.id}>
                                                    <li className="flex items-center justify-between gap-x-6 py-5">
                                                        <div className="flex min-w-0 gap-x-4">
                                                            <img alt="" className="size-12 flex-none rounded-full bg-gray-50" />
                                                            <div className="min-w-0 flex-auto">
                                                                <label htmlFor={sponsor.id} className="cursor-pointer">
                                                                    <p className="text-sm/6 font-semibold text-gray-900">{sponsor.name}</p>
                                                                    <p className="mt-1 truncate text-xs/5 text-gray-500">{sponsor.email}</p>
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input
                                                                    id={sponsor.id}
                                                                    value={sponsor.id}
                                                                    type='checkbox'
                                                                    className='border'
                                                                    onChange={onChangeItem}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p>Program Details</p>
                                <div className='border bg-slate-200 p-4 rounded-xl mt-4'>
                                    <div className='flex flex-col mb-2'>
                                        <InputLabel htmlFor="title" value="Title" />
                                        <TextInput
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full"

                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div className='flex flex-col mb-2'>
                                        <InputLabel htmlFor="description" value="Description" />
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            className="mt-1 block w-full rounded-lg"

                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                        ></textarea>
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 text-slate-600 text-sm gap-4 mt-2">
                                        <div className='flex flex-col'>
                                            <label htmlFor="start_date" className='font-bold'>Start Date</label>
                                            <input
                                                type="date"
                                                id="start_date"
                                                name="start_date"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                                className='rounded-lg border border-slate-300 shadow-sm'
                                            />
                                            {errors.start_date && <div>{errors.start_date}</div>}
                                        </div>

                                        <div className="flex flex-col">
                                            <label htmlFor="duration" className='font-bold'>Duration (days)</label>
                                            <input
                                                type="number"
                                                id="duration"
                                                name="duration"
                                                value={data.duration}
                                                onChange={(e) => setData('duration', e.target.value)}
                                                className='rounded-lg border border-slate-300 shadow-sm'
                                            />
                                            {errors.duration && <div>{errors.duration}</div>}
                                        </div>

                                        <div className="flex flex-col">
                                            <label htmlFor="total_beneficiaries" className='font-bold'>Total Beneficiaries</label>
                                            <input
                                                type="number"
                                                id="total_beneficiaries"
                                                name="total_beneficiaries"
                                                value={data.total_beneficiaries}
                                                onChange={(e) => setData('total_beneficiaries', e.target.value)}
                                                className='rounded-lg border border-slate-300 shadow-sm'
                                            />
                                            {errors.total_beneficiaries && <div>{errors.total_beneficiaries}</div>}
                                        </div>
                                    </div>

                                </div>

                                <div className='flex justify-end mt-4'>
                                    <button type='submit' disabled={processing} className='border text-white bg-green-600 rounded-full px-12 py-2'>
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    export default Create;
