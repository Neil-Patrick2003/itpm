import React from 'react';
import { usePage } from '@inertiajs/react';
import { Avatar } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import WorkerLayout from '@/Layouts/WorkerLayout';


ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ programs, incoming_programs, completed_programs, in_progress, recent_records, announcements, total_beneficiary_count, total_underweight_count, total_normal_count, total_overweight_count, total_obese_count }) => {
    const auth = usePage().props;

    function categorizeBmi(bmi) {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            return 'Overweight';
        } else if (bmi >= 30) {
            return 'Obese';
        } else {
            return 'Invalid BMI';
        }
    }
    const calculateAge = (birthdate) => {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(' ');
        const initials = nameSplit.length > 1 ? `${nameSplit[0][0]}${nameSplit[1][0]}` : `${nameSplit[0][0]}`;
        return {
            sx: { bgcolor: '#4CAF50' },
            children: initials.toUpperCase(),
        };
    };

    const stats = [
        { title: 'Total Programs', value: programs.length },
        { title: 'Total Beneficiaries', value: total_beneficiary_count },
        { title: 'Incoming', value: incoming_programs.length },
        { title: 'Completed', value: completed_programs.length },
        { title: 'In Progress', value: in_progress.length },
        { title: 'Avg. Duration (days)', value: Math.round(programs.reduce((sum, p) => sum + (p.duration || 0), 0) / programs.length) || 0 },
    ];

    const pieData = {
        labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
        datasets: [{
            data: [ total_underweight_count,  total_normal_count, total_overweight_count, total_obese_count],
            backgroundColor: ['#4CAF50', '#FFC107', '#03A9F4'],
            borderColor: '#fff',
            borderWidth: 1,
        }],
    };

    return (
        <WorkerLayout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="px-4"
            >
                <motion.div
                    className="flex border bg-gray-50 p-2 mb-6 items-center gap-2 rounded-2xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {auth.user.profile_photo_url ? (
                        <img
                            src={auth.user.profile_photo_url}
                            alt={auth.user.name}
                            className="rounded-full w-14 h-14 object-cover border-2 border-green-500"
                        />
                    ) : (
                        <Avatar {...stringAvatar(auth.user.name)} sx={{ width: 56, height: 56 }} />
                    )}
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">{auth.user.name}</h1>
                        <p className="text-sm text-gray-500">Assigned: {auth.user.assign_address}</p>
                    </div>
                </motion.div>

                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                    }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-2 border rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300"
                        >
                            <h4 className="text-md font-medium text-gray-700">{stat.title}</h4>
                            <p className="text-2xl font-bold text-green-600 mt-2">{stat.value}</p>
                        </motion.div>
                    ))}
                </motion.section>

                <div className="flex flex-col lg:flex-row gap-6 mb-10">
                    <motion.div className="w-full rounded-2xl shadow lg:w-2/3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                        <div className="bg-white p-4 rounded-2xl h-full overflow-auto">
                            <h3 className="text-lg font-semibold mb-4">Programs Overview</h3>
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th className="text-left text-sm font-semibold text-gray-900 py-2">Name</th>
                                    <th className="text-left text-sm font-semibold text-gray-900 py-2">Age</th>
                                    <th className="text-left text-sm font-semibold text-gray-900 py-2">Height</th>
                                    <th className="text-left text-sm font-semibold text-gray-900 py-2">Weight</th>
                                    <th className="text-left text-sm font-semibold text-gray-900 py-2">Status</th>

                                </tr>
                                </thead>
                                <tbody>
                                {recent_records.length > 0 ? recent_records.map((record) => (
                                    <tr key={record.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2 text-gray-900">{record.name}</td>
                                        <td className="py-2 text-gray-500">{calculateAge(record.birth_date)} years old</td>
                                        <td className="py-2 text-gray-500">{record.latest_record?.height} cm</td>
                                        <td className="py-2 text-gray-500">{record.latest_record?.weight} kg</td>
                                        <td className="py-2 text-gray-500">{categorizeBmi(record.latest_record?.bmi)}</td>

                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="py-4 text-center text-gray-500">No recent records available</td></tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    <motion.div className="w-full lg:w-1/3 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <div className="bg-white p-4 rounded-2xl shadow">
                            <h3 className="text-lg font-semibold mb-4">Announcements</h3>
                            <ul className="space-y-3 max-h-[300px] overflow-auto pr-2">
                                {announcements.length > 0 ? announcements.map((note, i) => (
                                    <li key={i} className="border-b pb-2">
                                        <p className="text-gray-800 font-medium">{note.title}</p>
                                        <p className="text-sm text-gray-600">{note.body?.slice(0, 80)}...</p>
                                        <span className="text-xs text-gray-400">{note.date}</span>
                                    </li>
                                )) : (
                                    <li className="text-gray-500">No announcements available</li>
                                )}
                            </ul>
                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow">
                            <h3 className="text-lg font-semibold mb-4">Program Distribution</h3>
                            <Pie data={pieData} />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </WorkerLayout>
    );
};

export default Dashboard;
