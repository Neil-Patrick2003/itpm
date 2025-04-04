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




const AdminDashboard = ({ sponsors }) => {
    const [isAddSponsorOpen, setIsSponsorOpen] = useState(false);
    const openAddSponsor = () => setIsSponsorOpen(true);
    const closeAddSponsor = () => setIsSponsorOpen(false);
    const { flash } = usePage().props; 
    const imageUrl = '/storage/images/';

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

            <div className='flex flex-col  w-full h-screen gap-2 sm:p-4 md:p-6'>
                <div className='sm:p-2'>

                </div>
                <div className='flex flex-row justify-between h-28 sm:p-8 md:p-6 lg:p8 bg-white'>
                    <div>
                        <h1 className='sm:text-lg md:text-xl lg:text-2xl'>Sponsorship</h1>
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
                                                {sponsor.photo_url ? (
                                                    <img src={imageUrl + sponsor.photo_url} alt="Uploaded Image"  className='rounded-full' style={{ width: '48px', height: '48px' }}/>
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