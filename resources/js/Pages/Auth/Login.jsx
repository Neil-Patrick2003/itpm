import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from 'react-scroll';
import {MdEmail} from "react-icons/md";
import {FaLock} from "react-icons/fa";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className='flex flex-col justify-center  h-full w-full'>
                <div>
                    <h1 className='mb-4 md:mb-8 lg:mb-12 font-bold text-xl text-[#66CA6A] text-center md:text-2xl lg:text-3xl'>Login</h1>
                    <InputLabel htmlFor="email" value="Email" className=" text-[#66CA6A]"/>
                    <div className="relative flex items-center w-full">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full py-2 pl-2 pr-10 text-[#66CA6A] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-400 focus:border-[#66CA6A] focus:outline-none focus:ring-0"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <MdEmail className="absolute top-2 right-2 text-[#66CA6A]" />
                    </div>


                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password"  className=" text-[#67c4c1]"/>
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full py-2 pl-2 pr-10 text-[#67c4c1] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-400 focus:border-[#66CA6A] focus:outline-none focus:ring-0"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <FaLock className="absolute top-2 right-2 text-[#66CA6A]" />
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <div className='flex justify-between'>
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>


                </div>


                <div className="mt-4 gap-2 md:gap-4 flex flex-col items-center justify-end">


                    <button type='submit'
                            className="w-full mt-4 bg-[#66CA6A] hover:bg-green-400 transition text-white py-2 rounded-full"
                            disabled={processing}>
                        Log in
                    </button>

                    <p>Don't have an account? <Link href='/register' className='text-green-600 hover:text-green-800'>Signup</Link></p>
                </div>
            </form>
        </GuestLayout>
    );
}


