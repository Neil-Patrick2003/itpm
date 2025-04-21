import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from "react";

export default function UpdateProfileInformation({
                                                     mustVerifyEmail,
                                                     status,
                                                     className = '',
                                                 }) {
    const user = usePage().props.auth.user;

    const [avatar, setAvatar] = useState(user.profile_photo_url || '/default-avatar.png');

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        address: user.address,
        assign_address: user.assign_address,
        phone: user.phone,
        profile_photo_url: null, // actual file to be sent
    });

    // Form submission handler
    const submit = (e) => {
        e.preventDefault();
        console.log(data); // Log form data for debugging
        patch(route('profile.update'));
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result); // Update avatar preview
            reader.readAsDataURL(file);
            setData('profile_photo_url', file); // Update form data with the selected file
            console.log(data);
        }
    };

    const barangays = [
        "Acle", "Bayudbud", "Bolboc", "Burgos (Poblacion)", "Dalima", "Dao", "Guinhawa",
        "Lumbangan", "Luna (Poblacion)", "Luntal", "Magahis", "Malibu", "Mataywanac",
        "Palincaro", "Putol", "Rillo (Poblacion)", "Rizal (Poblacion)", "Sabang",
        "San Jose", "Talon", "Toong", "Tuyon-tuyon"
    ];

    useEffect(() => {
        if (recentlySuccessful) {
            setData({
                ...data,
                profile_photo_url: null,  // Reset profile photo URL after successful save
            });
        }
    }, [recentlySuccessful]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex justify-center mb-6">
                    <label htmlFor="profile_photo_url" className="cursor-pointer relative">
                        <img
                            src={avatar}
                            alt="Avatar Preview"
                            className="w-32 h-32 object-cover rounded-full border-4 border-green-700"
                        />
                        <input
                            id="profile_photo_url"
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                        />
                    </label>
                    <InputError className="mt-2 text-center" message={errors.profile_photo_url} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Address" />
                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="assign_address" value="Assign Address" />
                    <select
                        id="assign_address"
                        className="w-full mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={data.assign_address}
                        onChange={(e) => setData('assign_address', e.target.value)}
                        required
                    >
                        <option value="">Select Barangay</option>
                        {barangays.map((barangay, index) => (
                            <option key={index} value={barangay}>
                                {barangay}
                            </option>
                        ))}
                    </select>
                    <InputError className="mt-2" message={errors.assign_address} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone Number" />
                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.phone} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
