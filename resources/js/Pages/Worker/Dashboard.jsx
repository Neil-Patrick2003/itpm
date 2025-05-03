import React from 'react';
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { usePage } from "@inertiajs/react";
import AutoImageSlider from "@/Components/AutoImageSlider.jsx";
import healthWorkerImg from '../../../assets/image/health_worker.png';
import Avatar from "@mui/material/Avatar";
import { motion } from 'framer-motion';

const Dashboard = ({ programs, user }) => {
    const auth = usePage().props;

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(' ');
        const initials = nameSplit.length > 1
            ? `${nameSplit[0][0]}${nameSplit[1][0]}`
            : `${nameSplit[0][0]}`;
        return {
            sx: { bgcolor: '#4CAF50' },
            children: initials.toUpperCase(),
        };
    };

    return (
        <WorkerLayout title="Dashboard">
            <div className="px-4">

                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=" mb-8"
                >
                    {programs?.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Ongoing Nutrition Programs</h3>
                            <AutoImageSlider programs={programs} autoSlideInterval={3000} />
                        </motion.section>
                    )}
                    {/*<div className="flex items-center gap-4">*/}
                    {/*    {auth.user.profile_photo_url ? (*/}
                    {/*        <img*/}
                    {/*            src={auth.user.profile_photo_url}*/}
                    {/*            alt={auth.user.name}*/}
                    {/*            className="rounded-full w-14 h-14 object-cover border-2 border-green-500"*/}
                    {/*        />*/}
                    {/*    ) : (*/}
                    {/*        <Avatar {...stringAvatar(auth.user.name)} sx={{ width: 56, height: 56 }} />*/}
                    {/*    )}*/}
                    {/*    <div>*/}
                    {/*        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">*/}
                    {/*            {auth.user.name}*/}
                    {/*        </h1>*/}
                    {/*        <p className="text-sm text-gray-500">Assigned: {auth.user.assign_address}</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </motion.div>

                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden mb-10"
                >
                    <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-green-700 mb-2">
                            Supporting Healthy Futures
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Empowering barangay health workers to monitor and improve child nutrition — one community at a time.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 flex items-center justify-center p-4 bg-gray-50">
                        <img
                            src={healthWorkerImg}
                            alt="Health Worker"
                            className="rounded-lg shadow-lg w-full h-60 object-cover"
                        />
                    </div>
                </motion.section>

                {/* Stats Cards */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 },
                        },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
                >
                    {[
                        { title: 'Total Children Monitored', value: '1,234' },
                        { title: 'Assigned Barangay', value: user.assign_address },
                        { title: 'Avg. Weight (kg)', value: '18.6' },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-6 border rounded-lg shadow text-center hover:shadow-lg transition duration-200"
                        >
                            <h4 className="text-lg font-medium text-gray-700">{stat.title}</h4>
                            <p className="text-3xl font-bold text-green-600 mt-2">{stat.value}</p>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Slider Section */}

            </div>
        </WorkerLayout>
    );
};

export default Dashboard;
