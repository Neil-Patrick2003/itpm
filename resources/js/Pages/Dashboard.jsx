import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { UserGroupIcon } from "@heroicons/react/16/solid";
import BmiTrendsChart from "@/Components/Graph/BmiTrendsChart.jsx";
import { Container } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import BmiCategoryChart from "@/Components/Graph/BmiCategoryChart.jsx";

export default function Dashboard({
                                      user,
                                      recordCount,
                                      underweightCount,
                                      normalCount,
                                      overweight_andObeseCount,
                                      trends,
                                      top_sponsors,
                                      total_sponsors,
                                      total_programs,
                                      total_donations,
                                      total_beneficiaries,
                                  }) {
    const imageUrl = "/storage/";

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(" ");
        const initials =
            nameSplit.length > 1
                ? `${nameSplit[0][0]}${nameSplit[1][0]}`
                : `${nameSplit[0][0]}`;
        return {
            sx: { bgcolor: "#4CAF50" },
            children: initials.toUpperCase(),
        };
    };

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col gap-4 w-full min-h-screen  ">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Welcome back, {user.name}!
                </h2>

                {/* Top Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard title="Total Programs" count={total_programs} />
                    <StatCard title="Total Beneficiary" count={total_beneficiaries} />
                    <StatCard title="Total Sponsors" count={total_sponsors} />
                    <StatCard title="Total Donations" count={total_donations} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* BMI Chart */}
                    <div className="md:col-span-3 bg-white rounded-xl p-6 border border-gray-200">
                        <Container maxWidth={false} disableGutters sx={{ p: 0, width: '100%', height: '400px' }}>
                            <BmiTrendsChart trends={trends} />
                        </Container>
                    </div>

                    {/* Top Sponsors */}
                    <div className="md:col-span-1 bg-white rounded-xl p-6 border border-gray-200 overflow-y-auto">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">Top Sponsors</h2>
                        <ul className="space-y-1 divide-y divide-gray-200">
                            {top_sponsors?.length > 0 ? (
                                top_sponsors.map((sponsor) => (
                                    <li key={sponsor.id} className="flex items-center gap-4 pt-4">
                                        {sponsor.photo_url ? (
                                            <motion.img
                                                initial={{ scale: 0.9 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.3, type: 'spring' }}
                                                src={`${imageUrl}${sponsor.photo_url}`}
                                                alt={sponsor.name}
                                                className="w-14 h-14 rounded-full object-cover"
                                            />
                                        ) : (
                                            <Avatar {...stringAvatar(sponsor.name)} sx={{ width: 56, height: 56 }} />
                                        )}
                                        <div>
                                            <p className="text-md font-medium text-gray-800">{sponsor.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {sponsor.donations_count} donation{(sponsor.donations_count !== 1) && 's'}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <EmptyCard />
                            )}
                        </ul>
                    </div>

                    {/* BMI Category Chart */}
                    <div className="md:col-span-1 bg-white rounded-xl p-6 border border-gray-200">
                        <BmiCategoryChart
                            sx={{ p: 0, width: '100%', height: '50px' }}
                            underweight={underweightCount}
                            normal={normalCount}
                            overweight_andObese={overweight_andObeseCount}
                        />
                    </div>

                    {/* Announcements */}
                    <div className="md:col-span-3 bg-white rounded-xl p-6 border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Recent Announcement</h2>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Track new records, latest check-ins, and recent updates. Use this section for admin actions or quick overviews.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, count }) {
    return (
        <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-white border border-gray-200">
            <div>
                <p className="text-gray-600 text-sm font-medium">{title}</p>
                <h1 className="text-2xl font-bold text-gray-800 mt-2">{count}</h1>
            </div>
            <div className="bg-gray-200 p-2 rounded-full">
                <UserGroupIcon className="h-6 w-6 text-gray-600" />
            </div>
        </div>
    );
}

function EmptyCard() {
    return (
        <div className="rounded-lg bg-gray-50 border border-dashed border-gray-300 p-6 text-sm text-gray-400 flex items-center justify-center h-32">
            No sponsors found.
        </div>
    );
}
