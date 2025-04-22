import React from 'react'
import WorkerLayout from "@/Layouts/WorkerLayout.jsx"
import { usePage } from "@inertiajs/react"
import AutoImageSlider from "@/Components/AutoImageSlider.jsx"
import healthWorkerImg from '../../../assets/image/health_worker.png'
import Avatar from "@mui/material/Avatar";

const Dashboard = ({ programs, user }) => {
    const auth = usePage().props

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(' ')
        const initials = nameSplit.length > 1
            ? `${nameSplit[0][0]}${nameSplit[1][0]}`
            : `${nameSplit[0][0]}`
        return {
            sx: { bgcolor: '#4CAF50' },
            children: initials.toUpperCase(),
        }
    }

    return (
        <WorkerLayout title="Dashboard">
            {/* Top Profile Bar */}
            <div className="px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        {auth.user.profile_photo_url ? (
                            <img
                                src={imageUrl + auth.user.profile_photo_url}
                                alt={auth.user.name}
                                className="rounded-full w-14 h-14 object-cover border-2 border-green-500"
                            />
                        ) : (
                            <Avatar {...stringAvatar(auth.user.name)} sx={{ width: 56, height: 56 }} />
                        )}
                        <h1 className="flex flex-col text-2xl md:text-3xl font-semibold text-gray-800">{auth.user.name}
                            <span className="text-sm font-medium">Assign: {auth.user.assign_address}</span>
                        </h1>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden mb-10">
                    <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-green-700 mb-2">
                            Supporting Healthy Futures
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Empowering barangay health workers to monitor and improve child nutrition — one community at a time.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 flex items-center justify-center p-4 bg-gray-100">
                        <img
                            src={healthWorkerImg}
                            alt="Health Worker"
                            className="rounded-lg shadow w-full h-60 object-cover"
                        />
                    </div>
                </section>

                {/* Stats Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 ">
                    <div className="bg-white p-6 border rounded-lg shadow-md text-center hover:shadow-lg transition duration-200">
                        <h4 className="text-lg font-medium text-gray-700">Total Children Monitored</h4>
                        <p className="text-3xl font-bold text-green-600 mt-2">1,234</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-md text-center hover:shadow-lg transition duration-200">
                        <h4 className="text-lg font-medium text-gray-700">Assigned Barangay</h4>
                        <p className="text-2xl font-bold text-green-600 mt-2">{user.assign_address}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-md text-center hover:shadow-lg transition duration-200">
                        <h4 className="text-lg font-medium text-gray-700">Avg. Weight (kg)</h4>
                        <p className="text-3xl font-bold text-green-600 mt-2">18.6</p>
                    </div>
                </section>

                {/* Slider */}
                {programs?.length > 0 && (
                    <section>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Ongoing Nutrition Programs</h3>
                        <AutoImageSlider programs={programs} autoSlideInterval={3000} />
                    </section>
                )}
            </div>

        </WorkerLayout>
    )
}

export default Dashboard
