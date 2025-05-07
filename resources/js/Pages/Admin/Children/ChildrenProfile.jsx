import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {
    ChevronRightIcon,
    HomeIcon,
    UsersIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon
} from "@heroicons/react/20/solid";
import boy1 from '../../../../assets/image/Avatar/boys/boy1.png';
import { LineChart } from '@mui/x-charts/LineChart';
import React from "react";

const ChildrenProfile = ({ child, recent_record, growthData }) => {

    // 🧭 Breadcrumb navigation links
    const pages = [
        { name: 'Childrens', href: '/childrens', current: false },
        { name: 'Profiles', href: '/childrens/profile', current: false },
        { name: child.name, href: `/childrens/profile/${child.id}`, current: true },
    ];

    // 📊 Prepare chart data arrays for MUI LineChart
    const xLabels = growthData.map(item => item.date);         // Dates for X-axis
    const heightData = growthData.map(item => item.height);    // Heights for Y-axis
    const weightData = growthData.map(item => item.weight);    // Weights for Y-axis

    return (
        <AuthenticatedLayout>
            {/* 🌐 Breadcrumb Navigation */}
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                    <li>
                        <a href="/" className="text-gray-400 hover:text-green-600">
                            <HomeIcon className="h-5 w-5" />
                            <span className="sr-only">Home</span>
                        </a>
                    </li>
                    {pages.map((page) => (
                        <li key={page.name}>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                                <a
                                    href={page.href}
                                    className={`ml-4 text-sm font-medium ${page.current ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
                                    aria-current={page.current ? 'page' : undefined}
                                >
                                    {page.name}
                                </a>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>

            {/* 📦 Main Content Layout */}
            <div className="grid grid-cols-1 mt-4 md:grid-cols-4 gap-4">

                {/* 👤 Child Profile Card */}
                <div className="col-span-3 bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex gap-4 items-center">

                        {/* 🧒 Avatar */}
                        <img
                            src={boy1}
                            alt="Avatar"
                            className="h-32 w-32 object-cover rounded-full border border-green-200"
                        />

                        {/* 📄 Child Info */}
                        <div className="flex flex-col w-full gap-y-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-gray-600">{child.name}</h1>
                                <span className="text-sm text-gray-400">#{child.id}</span>
                            </div>
                            <p className="text-xs text-gray-400">Created at: {child.created_at}</p>
                            <div className="flex gap-4">
                                <span className="bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-medium">
                                    {child.gender}
                                </span>
                                <span className="bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-medium">
                                    BMI: {recent_record ? parseFloat(recent_record.bmi).toFixed(2) : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    {/* 👪 Parent Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex gap-2">
                            <UsersIcon className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-gray-400">Parent</p>
                                <p className="text-green-600 text-lg font-semibold">{child.parent.name}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <MapPinIcon className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-gray-400">Address</p>
                                <p className="text-green-600 text-lg font-semibold">{child.parent.address}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <PhoneIcon className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-gray-400">Phone</p>
                                <p className="text-green-600 text-lg font-semibold">{child.parent.phone}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <EnvelopeIcon className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-gray-400">Email</p>
                                <p className="text-green-600 text-lg font-semibold">{child.parent.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🧩 Child Programs */}
                <div className="border rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-green-600 mb-2">Child Programs</h2>
                    {child.program?.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            {child.program.map((item) => (
                                <li key={item.id}>{item.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-sm">No programs assigned.</p>
                    )}
                </div>
                <div className="border rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-green-600 mb-4">Latest Health Record</h2>
                    {recent_record ? (
                        <div className="space-y-2 text-gray-700 text-sm">
                            <p><span className="font-medium">Height:</span> {recent_record.height} cm</p>
                            <p><span className="font-medium">Weight:</span> {recent_record.weight} kg</p>
                            <p><span className="font-medium">BMI:</span> {parseFloat(recent_record.bmi).toFixed(2)}</p>
                            <p><span className="font-medium">Recorded On:</span> {recent_record.created_at}</p>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">No health record available.</p>
                    )}
                </div>


                {/* 📈 Growth Chart */}
                <div className="col-span-3 bg-white border rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-green-600 mb-4">Growth Chart</h2>
                    <LineChart
                        width={1100}
                        height={300}
                        xAxis={[{ scaleType: 'band', data: xLabels }]} // 📅 X-axis: dates
                        series={[
                            { data: heightData, label: 'Height (cm)', color: '#10B981' },
                            { data: weightData, label: 'Weight (kg)', color: '#34D399' }
                        ]}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ChildrenProfile;
