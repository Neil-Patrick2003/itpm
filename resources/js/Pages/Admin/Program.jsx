import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
const Program = ( { programs } ) => {
    const [ isAddProgramOpen, setIsAddProgramOpen ] = useState(false);
    const openAddProgram = () => setIsAddProgramOpen(true);
    const closeAddProgram = () => setIsAddProgramOpen(false);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        duration: '',
        total_beneficiaries: '',
    });

    function submitProgram(e){
        e.preventDefault();
        post('/programs',);
        setIsAddProgramOpen(false);
        setData( { title: '',
            description: '',
            start_date: '',
            duration: '',
            total_beneficiaries: ''
        } );
    }

    return (
        <AuthenticatedLayout>
            <div className='flex w-full gap-2 h-screen sm:p-4 md:p-6'>
                <div className="overflow-hidden w-3/4 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        All Program
                        {programs.map((program) => (
                            <li key={program.id}>
                                <h3>{program.title}</h3>
                            </li>
                        ))}
                        <div className='flex justify-end'>
                            <button onClick={openAddProgram}>Create Program</button>
                        </div>
                        <Modal show={isAddProgramOpen} onClose={closeAddProgram} maxWidth="2xl" closable={true}>
                            <div className='flex flex-col w-full p-4'>
                                <h1 className='text-center'>Add Program</h1>
                                <form onSubmit={submitProgram}>
                                    <div className='flex flex-col mb-2'>
                                        <InputLabel htmlFor="title" value="Title" />
                                        <TextInput
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                    <div className='flex flex-col mb-2'>
                                        <InputLabel htmlFor="description" value="Description" />
                                        <TextInput
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                        />
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
                                    <button type='submit' disabled={processing}>Create</button>
                                </form>
                                <button onClick={closeAddProgram}>Cancel</button>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className="overflow-hidden w-1/4 bg-white border shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        Incoming Program
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Program;
