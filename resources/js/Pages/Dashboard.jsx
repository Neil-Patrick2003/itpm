import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { UserGroupIcon } from "@heroicons/react/16/solid";
import BmiTrendsChart from "@/Components/Graph/BmiTrendsChart.jsx";
import { Container } from "@mui/material";
import React from "react";

export default function Dashboard({ user, recordCount, underweightCount, normalCount, overweight_andObeseCount, trends }) {
    return (
        <AuthenticatedLayout>
            <div className="flex flex-col gap-2 md:flex-row " style={{ height: 'calc(100vh - 124px)' }}>
                <div className="w-full md:w-2/3 border">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        <StatCard title="Total Records" count={recordCount} color="from-red-300 to-red-400" />
                        <StatCard title="Underweight" count={underweightCount} color="from-green-300 to-green-400" />
                        <StatCard title="Normal" count={normalCount} color="from-blue-300 to-blue-400" />
                        <StatCard title="Overweight & Obese" count={overweight_andObeseCount} color="from-violet-300 to-violet-400" />
                    </div>
                    <div className="mt-4 border">
                        <Container maxWidth={false} disableGutters sx={{ p: 0, width: '100%', height: '300px' }}>
                            <BmiTrendsChart trends={trends} />
                        </Container>
                    </div>
                </div>
                <div className="w-full md:w-1/3 border">1</div>
            </div>
            {/*<div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>*/}
            {/*    /!* Stat Cards *!/*/}
            {/*    <div className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">*/}
            {/*        <StatCard title="Total Records" count={recordCount} color="from-red-300 to-red-400" />*/}
            {/*        <StatCard title="Underweight" count={underweightCount} color="from-green-300 to-green-400" />*/}
            {/*        <StatCard title="Normal" count={normalCount} color="from-blue-300 to-blue-400" />*/}
            {/*        <StatCard title="Overweight & Obese" count={overweight_andObeseCount} color="from-violet-300 to-violet-400" />*/}
            {/*        <EmptyCard />*/}
            {/*        <EmptyCard />*/}
            {/*    </div>*/}

            {/*    /!* Chart and Side Panel *!/*/}
            {/*
            {/*</div>*/}
        </AuthenticatedLayout>
    );
}

function StatCard({ title, count, color }) {
    return (
        <div className={`flex justify-between items-center p-3 rounded-lg bg-gradient-to-br ${color} shadow-sm`}>
            <div>
                <p className="text-white text-xs font-medium">{title}</p>
                <h1 className="text-xl font-bold text-white mt-1">{count}</h1>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
                <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
        </div>
    );
}

function EmptyCard() {
    return (
        <div className="rounded-lg bg-gray-50 border border-dashed border-gray-300 p-3 text-xs text-gray-400 flex items-center justify-center">
            Empty
        </div>
    );
}
