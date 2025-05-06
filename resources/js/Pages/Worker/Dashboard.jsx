import React from 'react';
import { usePage } from '@inertiajs/react';
import { Avatar } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import WorkerLayout from '@/Layouts/WorkerLayout';
import ProgramCalendar from '@/Components/ProgramCalendar.jsx';
// Import Material UI icons for stat cards
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SyncIcon from '@mui/icons-material/Sync';
import TimerIcon from '@mui/icons-material/Timer';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({
                       programs,
                       incoming_programs,
                       completed_programs,
                       in_progress,
                       announcements,
                       total_beneficiary_count,
                       total_underweight_count,
                       total_normal_count,
                       total_overweight_count,
                       total_obese_count,
                   }) => {
    const auth = usePage().props;

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(' ');
        const initials =
            nameSplit.length > 1
                ? `${nameSplit[0][0]}${nameSplit[1][0]}`
                : `${nameSplit[0][0]}`;
        return {
            sx: { bgcolor: '#388E3C', fontWeight: 700 },
            children: initials.toUpperCase(),
        };
    };

    const stats = [
        { title: 'Total Programs', value: programs.length, icon: <AssignmentIcon sx={{ fontSize: 36, color: '#388E3C' }} /> },
        { title: 'Total Beneficiaries', value: total_beneficiary_count, icon: <GroupIcon sx={{ fontSize: 36, color: '#388E3C' }} /> },
        { title: 'Incoming', value: incoming_programs.length, icon: <HourglassEmptyIcon sx={{ fontSize: 36, color: '#388E3C' }} /> },
        { title: 'Completed', value: completed_programs.length, icon: <CheckCircleIcon sx={{ fontSize: 36, color: '#388E3C' }} /> },
        { title: 'In Progress', value: in_progress.length, icon: <SyncIcon sx={{ fontSize: 36, color: '#388E3C' }} /> },
        {
            title: 'Avg. Duration (days)',
            value:
                Math.round(
                    programs.reduce((sum, p) => sum + (p.duration || 0), 0) / programs.length
                ) || 0,
            icon: <TimerIcon sx={{ fontSize: 36, color: '#388E3C' }} />,
        },
    ];

    const pieData = {
        labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
        datasets: [
            {
                data: [
                    total_underweight_count,
                    total_normal_count,
                    total_overweight_count,
                    total_obese_count,
                ],
                backgroundColor: ['#5ebf75', '#66ce7f', '#8dd99e', '#b4e3bd'],
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
    };

    const pieOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 12,
                        weight: 'normal',
                    },
                    color: '#4a5568', // Gray 700 for subtlety
                    padding: 16,
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#388E3C',
                titleFont: { weight: 'bold' },
                bodyFont: { size: 14 },
                cornerRadius: 6,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <WorkerLayout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="p-2  font-sans flex flex-col"
                style={{ fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif' }}
            >
                {/* Content and footer container */}
                <div className="flex flex-col flex-grow overflow-hidden">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6 md:gap-8 mb-6">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-row md:flex-col justify-between items-center hover:shadow-md transition-shadow duration-300 cursor-default"
                                aria-label={`${stat.title} is ${stat.value}`}
                                title={`${stat.title}: ${stat.value}`}
                            >
                                <div className="m-0 md:mb-3 ">{stat.icon}</div>
                                <h4 className="text-sm font:medium md:font-semibold mb-1">{stat.title}</h4>
                                <p className="text-2xl font-extrabold">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-6 flex-grow">
                        {/* Program Calendar */}
                        <section className="w-full lg:w-2/3 px-4 border border-green-200 bg-green-50 rounded-xl ">
                            <ProgramCalendar programs={programs} className="borde" />
                        </section>

                        {/* Right Panel */}
                        <aside className="w-full lg:w-1/3 space-y-6 flex-shrink-0 overflow-auto max-h-full">
                            {/* Announcements */}
                            <section className="bg-green-50 border-2 border-green-100 p-2 md:p-6 rounded-xl ">
                                <h3 className="text-2xl font-bold ">
                                    Latest Announcements
                                </h3>
                                <ul className="space-y-5">
                                    {announcements.length > 0 ? (
                                        announcements.map((note, i) => (
                                            <li
                                                key={i}
                                                className="border-b border-gray-200 pb-3 last:border-none last:pb-0"
                                            >
                                                <p className="font-semibold text-gray-800">
                                                    {note.title}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {note.body?.slice(0, 100)}
                                                    {note.body && note.body.length > 100 ? '...' : ''}
                                                </p>
                                                <time
                                                    className="text-xs text-gray-500"
                                                    dateTime={note.date}
                                                >
                                                    {note.date}
                                                </time>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500">No announcements available</li>
                                    )}
                                </ul>
                            </section>

                            {/* BMI Distribution Chart */}
                            <section className="bg-green-50 border-2 border-green-100 p-2 md:p-6 rounded-xl">
                                <h3 className="text-2xl font-bold ">
                                    BMI Category Distribution
                                </h3>
                                <div className="h-[260px]">
                                    <Pie data={pieData} options={pieOptions}  />
                                </div>
                            </section>
                        </aside>
                    </div>
                </div>
            </motion.div>
        </WorkerLayout>
    );
};

export default Dashboard;
