import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { UserGroupIcon } from "@heroicons/react/16/solid";
import BmiTrendsChart from "@/Components/Graph/BmiTrendsChart.jsx";
import { Container } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";

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
            <div className="flex flex-col gap-4 w-full px-2 sm:px-4 md:px-0">
                <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                        Welcome back, {user.name}!
                    </h2>

                    {/* Top Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard title="Total Programs" count={total_programs} color="from-red-300 to-red-400" />
                        <StatCard title="Total Beneficiary" count={total_beneficiaries} color="from-green-300 to-green-400" />
                        <StatCard title="Total Sponsors" count={total_sponsors} color="from-blue-300 to-blue-400" />
                        <StatCard title="Total Donations" count={total_donations} color="from-violet-300 to-violet-400" />
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        {/* BMI Chart */}
                        <div className="md:col-span-3 bg-white rounded-xl p-4 shadow">
                            <Container maxWidth={false} disableGutters sx={{ p: 0, width: '100%', height: '430px' }}>
                                <BmiTrendsChart trends={trends} />
                            </Container>
                        </div>

                        {/* Top Sponsors */}
                        <div className="md:col-span-1 bg-white rounded-xl p-4 shadow h-full overflow-y-auto">
                            <h2 className="text-base font-semibold text-gray-800 mb-4">Top Sponsors</h2>
                            <ul className="space-y-3">
                                {top_sponsors?.length > 0 ? (
                                    top_sponsors.map((sponsor) => (
                                        <li key={sponsor.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            {sponsor.photo_url ? (
                                                <motion.img
                                                    initial={{ scale: 0.9 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.3, type: 'spring' }}
                                                    src={`${imageUrl}${sponsor.photo_url}`}
                                                    alt={sponsor.name}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white"
                                                />
                                            ) : (
                                                <Avatar {...stringAvatar(sponsor.name)} sx={{ width: 48, height: 48 }} />
                                            )}
                                            <div className="flex-1 ml-3">
                                                <p className="text-sm font-medium text-gray-800">{sponsor.name}</p>
                                                <p className="text-xs text-gray-500">
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

                        {/* Insights Card */}
                        <div className="md:col-span-1 bg-white rounded-xl p-4 shadow">
                            <h2 className="text-base font-semibold text-gray-800 mb-2">Insights & Analysis</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Review performance metrics, prediction results, and user engagement. This space can include summaries of recent trends or recommendations.
                            </p>
                        </div>

                        {/* Activities */}
                        <div className="md:col-span-3 bg-white rounded-xl p-4 shadow">
                            <h2 className="text-base font-semibold text-gray-800 mb-2">Latest Activities</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Track new records, latest check-ins, and recent updates. Use this section for admin actions or quick overviews.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, count, color }) {
    return (
        <div className={`flex justify-between items-center p-4 rounded-xl bg-gradient-to-br ${color} shadow`}>
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
        <div className="rounded-lg bg-gray-50 border border-dashed border-gray-300 p-4 text-xs text-gray-400 flex items-center justify-center h-20">
            No sponsors found.
        </div>
    );
}
