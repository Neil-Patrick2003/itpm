import React from 'react'
import WorkerLayout from "@/Layouts/WorkerLayout.jsx"
import { usePage } from "@inertiajs/react"
import AutoImageSlider from "@/Components/AutoImageSlider.jsx"
import healthWorkerImg from '../../../assets/image/health_worker.png'

const Dashboard = ({ programs, user }) => {
    const auth = usePage().props

    return (
        <WorkerLayout title="Dashboard">
            {/* Header Section */}
            <section className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-xl shadow">
                {/* Left: Text Block */}
                <div className="flex flex-col justify-center w-full md:w-2/3">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Supporting Healthy Futures
                    </h2>
                    <p className="text-gray-600 text-base">
                        Empowering barangay health workers to monitor and improve child nutrition, one community at a time.
                    </p>
                </div>

                {/* Right: Image Block */}
                <div className="w-full md:w-1/3 flex items-center justify-center">
                    <img
                        src={healthWorkerImg}
                        alt="Health Worker"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
            </section>

            {/* Static Detail Section */}
            <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                    <h4 className="text-lg font-semibold text-gray-700">Total Children Monitored</h4>
                    <p className="text-2xl font-bold text-green-600 mt-2">1,234</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                    <h4 className="text-lg font-semibold text-gray-700">Assign Barangay</h4>
                    <p className="text-2xl font-bold text-green-600 mt-2">{user.assign_address}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                    <h4 className="text-lg font-semibold text-gray-700">Avg. Weight (kg)</h4>
                    <p className="text-2xl font-bold text-green-600 mt-2">18.6</p>
                </div>
            </section>

            {/* Slider for Programs */}
            {programs?.length > 0 && (
                <section className="mt-12">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Ongoing Nutrition Programs</h3>
                    <AutoImageSlider programs={programs} autoSlideInterval={3000} />
                </section>
            )}
        </WorkerLayout>
    )
}

export default Dashboard
