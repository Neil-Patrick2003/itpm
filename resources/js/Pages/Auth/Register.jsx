import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Head, useForm } from '@inertiajs/react';
import { FaUser, FaPhone, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="w-full h-full text-[#66CA6A] overflow-auto">
                <h2 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-6">Register</h2>

                <form onSubmit={submit} className="space-y-5">
                    {/* Reusable Input Fields */}
                    {[
                        { id: 'name', type: 'text', icon: FaUser, label: 'Name', autoComplete: 'name' },
                        { id: 'email', type: 'email', icon: MdEmail, label: 'Email', autoComplete: 'email' },
                        { id: 'phone', type: 'text', icon: FaPhone, label: 'Phone', autoComplete: 'tel' },
                        { id: 'password', type: 'password', icon: FaLock, label: 'Password', autoComplete: 'new-password' },
                        { id: 'password_confirmation', type: 'password', icon: FaLock, label: 'Confirm Password', autoComplete: 'new-password' },
                    ].map(({ id, type, icon: Icon, label, autoComplete }) => (
                        <div key={id}>
                            <InputLabel htmlFor={id} value={label} className="text-[#66CA6A]" />

                            <div className="relative">
                                <input
                                    id={id}
                                    name={id}
                                    type={type}
                                    value={data[id]}
                                    onChange={(e) => setData(id, e.target.value)}
                                    autoComplete={autoComplete}
                                    required
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                    className="w-full py-2 pl-2 pr-10 text-[#66CA6A] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-400 focus:border-[#66CA6A] focus:outline-none focus:ring-0 text-sm sm:text-base md:text-lg"
                                />
                                <Icon className="absolute right-2 top-1/2 -translate-y-1/2 text-[#66CA6A]" />
                            </div>
                            {errors[id] && <p className="text-sm text-red-500 mt-1">{errors[id]}</p>}
                        </div>
                    ))}

                    {/* Role Dropdown */}
                    <div>
                        <label htmlFor="role" className="block text-sm md:text-md lg:text-lg font-medium mb-1 text-gray-400">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="w-full py-2 pl-3 bg-white border-0 border-b-2 border-gray-300 text-gray-400 focus:border-[#66CA6A] focus:outline-none focus:ring-0 text-sm sm:text-base md:text-lg"
                        >
                            <option value="">Select your role</option>
                            <option value="health_worker">Health Worker</option>
                            <option value="parent">Parent</option>
                            <option value="sponsor">Sponsor</option>
                        </select>
                        {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
                    </div>

                    {/* Terms and Register Button */}
                    <div className="text-center text-sm sm:text-xs md:text-sm lg:text-base text-[#67c4c1] mt-4">
                        By signing up you agree to our{' '}
                        <a href="#" className="text-green-600 underline">Privacy Policy</a> and{' '}
                        <a href="#" className="text-green-600 underline">Terms</a>.
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full mt-4 bg-[#66CA6A] hover:bg-green-400 transition text-white py-2 rounded-full text-sm sm:text-base md:text-lg"
                    >
                        Register
                    </button>

                    <p className="text-center mt-4 text-sm sm:text-xs md:text-sm lg:text-base text-[#67c4c1]">
                        Already have an account?{' '}
                        <Link href="/login" className="text-green-600 underline">Sign in</Link>
                    </p>
                </form>
            </div>
        </GuestLayout>
    );
}
