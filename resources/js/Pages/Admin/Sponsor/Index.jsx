import React, { useState } from 'react'
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import FlashMessage from '@/Components/FlashMessage';
import Avatar from '@mui/material/Avatar';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { FaUser } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {HomeIcon} from "@heroicons/react/20/solid/index.js";
import {IoPersonAddSharp} from "react-icons/io5";


const AdminDashboard = ({ sponsors }) => {
    const [isAddSponsorOpen, setIsSponsorOpen] = useState(false);
    const openAddSponsor = () => setIsSponsorOpen(true);
    const closeAddSponsor = () => setIsSponsorOpen(false);
    const { flash } = usePage().props;
    const imageUrl = '/storage/';

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone_number: '',
        photo_url: '',
    });


    function submitCreateUser(e) {
        e.preventDefault();
        post('/sponsorships/create');
        setIsSponsorOpen(false)
        setData({ name: '', email: '', phone_number: '', photo_url: ''});
    }

    const [avatar, setAvatar] = useState('');

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
      }
      setData('photo_url', e.target.files[0])
    };

    function stringAvatar(name) {
        const nameSplit = name.split(' ');
        const initials = nameSplit.length > 1 ? `${nameSplit[0][0]}${nameSplit[1][0]}` : `${nameSplit[0][0]}`;

        return {
          sx: {
            bgcolor: '#4CAF50', // Green background (your primary theme)
          },
          children: initials.toUpperCase(),
        };
      }

    const pages = [
        { name: 'Sponsors', href: '/users', current: false },

    ]


    return (
        <AuthenticatedLayout>
            <Head title="Sponsors" />

            <Modal show={isAddSponsorOpen} onClose={closeAddSponsor} closable={true}>

                    <div className='sm:p-2 md:p-4 lg:p-6'>
                        <h1 className='text-center'>Add Sponsor</h1>
                        <div>
                            <form action="" onSubmit={submitCreateUser} className='mb-4'>
                                <div className="flex justify-center items-center">
                                    <label htmlFor="avatar" className="cursor-pointer">
                                        <div className="relative">
                                        <img
                                            id="avatar-preview"
                                            src={avatar}
                                            alt=""
                                            className="w-32 h-32 rounded-full object-cover border-4 border-green-800"
                                        />
                                        <input
                                            type="file"
                                            id="avatar"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                        />
                                        <div className="absolute bottom-0 right-0 bg-gray-500 text-white rounded-full p-2">

                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 4h16v16H4z"
                                            />
                                            <circle cx="12" cy="12" r="3" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 3l1.5-1.5M16 3l-1.5-1.5"
                                            />
                                            </svg>
                                        </div>
                                        </div>
                                    </label>
                                </div>


                                <div className='mb-4'>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        icon={FaUser}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className='mb-4'>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        icon={MdEmail}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className='mb-4'>
                                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                                    <TextInput
                                        id="phone_number"
                                        name="phone_number"
                                        value={data.phone_number}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        required
                                        icon={FaPhone}
                                    />

                                    <InputError message={errors.phone_number} className="mt-2" />
                                </div>

                                <div className='flex flex-row justify-end items-center gap-2 mt-8'>
                                    <button  onClick={closeAddSponsor} className='w-1/4 border rounded-lg py-2'>Cancel</button>
                                    <button type='submit' className='border w-1/4 py-2 bg-green-700 rounded-lg text-white'>Create</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </Modal>

            <div className='flex flex-col  w-full h-screen gap-2 py-4 pl-2 pr-4'>
                <nav aria-label="Breadcrumb" className="flex border-b  mb-4 border-gray-200 bg-[#01DAA2] mb-2">
                    <ol role="list" className="mx-auto flex w-full space-x-4 px-4 sm:px-6 lg:px-8">
                        <li className="flex">
                            <div className="flex items-center">
                                <a href="#" className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                                    <span className="sr-only">Home</span>
                                </a>
                            </div>
                        </li>
                        {pages.map((page) => (
                            <li key={page.name} className="flex">
                                <div className="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 24 44"
                                        preserveAspectRatio="none"
                                        aria-hidden="true"
                                        className="h-full w-6 shrink-0 text-white"
                                    >
                                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                    </svg>
                                    <a
                                        href={page.href}
                                        aria-current={page.current ? 'page' : undefined}
                                        className="ml-4 text-sm font-medium text-white hover:text-green-600"
                                    >
                                        {page.name}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className=" flex justify-center items-center pr-6">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                            <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                            <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                        </svg>



                    </div>

                </nav>
                <div className="w-full mb-2">
                    <div className="overflow-hidden h-28 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                            <div className='flex flex-col'>
                                <h1 className='sm:text-md md:text-lg lg:text-xl font-bold'>
                                    All Sponsors
                                </h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the users in your account including their name, title, email, and role.
                                </p>
                            </div>

                                <button
                                    type="button"
                                    onClick={openAddSponsor}
                                    className="flex items-center justify-center bg-[#01DAA2] text-white rounded-full w-16 h-16 shadow-lg hover:bg-green-500 focus:outline-none transition-colors duration-300"
                                >
                                    <IoPersonAddSharp className="text-white text-2xl" />
                                </button>

                        </div>
                    </div>
                </div>
                <div className='overflow-x-auto sm:p-4 md:p-6 lg:p8 bg-white h-full'>
                    All sponsor
                    <FlashMessage/>
                    <ul>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {sponsors.data.map(sponsor => (
                                <li key={sponsor.id}>
                                    <div className='flex border h-24 p-2 gap-2 rounded-md'>
                                        <div className='border rounded-full size-12'>
                                            <div>
                                                {sponsor.profile_photo_url ? (
                                                    <img src={imageUrl + sponsor.profile_photo_url} alt="Uploaded Image"  className='rounded-full' style={{ width: '48px', height: '48px' }}/>
                                                ) : (
                                                    <Avatar {...stringAvatar(sponsor.name)} sx={{ width: 48, height: 48 }}  />

                                                )}
                                            </div>
                                        </div>
                                        <Link href={`/sponsorships/${sponsor.id}`}>
                                            <div className='flex flex-col'>
                                                <p className='font-bold text-lg'>{sponsor.name}</p>
                                                <span className='text-xs text-gray-600'>
                                                    {new Date(sponsor.created_at).toLocaleDateString('en-GB')}
                                                </span>
                                            </div>
                                        </Link>


                                    </div>
                                </li>
                            ))}
                        </div>

                    </ul>
                </div>
                <button onClick={openAddSponsor} onClose={closeAddSponsor}>Add Sponsor</button>

            </div>

        </AuthenticatedLayout>
    )
}

export default AdminDashboard
