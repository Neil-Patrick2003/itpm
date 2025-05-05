import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PlusCircleIcon, UserGroupIcon } from '@heroicons/react/16/solid';
import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import DynamicEmptyEstate from '@/Components/DynamicEmptyEstate.jsx';
import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Dashboard({
                                      user,
                                      in_progress_program,
                                      incoming_program,
                                      childrens,
                                      top_sponsors,
                                      total_sponsors,
                                      total_programs,
                                      total_donations,
                                      total_beneficiaries,
                                  }) {
    const imageUrl = '/storage/';

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(' ');
        const initials =
            nameSplit.length > 1 ? `${nameSplit[0][0]}${nameSplit[1][0]}` : `${nameSplit[0][0]}`;
        return {
            sx: { bgcolor: '#4CAF50' },
            children: initials.toUpperCase(),
        };
    };

    console.log(incoming_program.length);

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col gap-4 px-4 w-full ">
                <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h2>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard title="Total Programs" count={total_programs} />
                    <StatCard title="Total Beneficiaries" count={total_beneficiaries} />
                    <StatCard title="Total Sponsors" count={total_sponsors} />
                    <StatCard title="Total Donations" count={total_donations} />
                </div>

                {/* Dashboard Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow">
                    {/* Recent Children Record Table */}
                    <div className="lg:col-span-3 bg-white shadow rounded-xl p-4">
                        <h3 className="flex justify-between text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Recent Children Record
                            <span>
                                <Link href="/childrens/create">
                                <PlusCircleIcon className="h-6 w-6 text-gray-500" />
                            </Link>
                        </span>
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Gender</TableHead>
                                    <TableHead>Height</TableHead>
                                    <TableHead>Weight</TableHead>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                {childrens.length > 0 ? (
                                    childrens.map((expense) => (
                                        <tr key={expense.id} className="hover:bg-gray-50">
                                            <TableData>{expense.id}</TableData>
                                            <TableData>{expense.purpose}</TableData>
                                            <TableData>{/* formatCurrency(expense.amount) */}</TableData>
                                            <TableData>{new Date(expense.date_spent).toLocaleDateString()}</TableData>
                                            <TableData>{expense.notes || '—'}</TableData>
                                            <TableData className="text-right">
                                                <button
                                                    onClick={() => openEditModal(expense)}
                                                    className="text-indigo-600 hover:text-indigo-900 transition"
                                                >
                                                    Edit
                                                </button>
                                            </TableData>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-8">
                                            <DynamicEmptyEstate
                                                title="No expenses yet"
                                                description="Add a new expense and track your spending."
                                                actionLabel="Add New Expense"
                                                onActionClick={openAddModal}
                                            />
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top Sponsors */}
                    <div className="bg-white shadow rounded-xl p-2 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Top Sponsors</h3>
                        <ul className="space-y-4 overflow-y-auto max-h-[320px] pr-2">
                            {top_sponsors?.length > 0 ? (
                                top_sponsors.map((sponsor) => (
                                    <li key={sponsor.id} className="flex items-center gap-4">
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

                    {/* BMI Chart */}
                    <div className="lg:col-span-2 bg-white shadow rounded-xl p-6">
                        {
                            in_progress_program.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">On going Program</h3>

                                    <p className="text-base text-gray-600 leading-relaxed">
                                        {in_progress_program[0].Title}
                                    </p>
                                    <p className="text-base text-gray-600 leading-relaxed">
                                        {in_progress_program[0].description.length > 100
                                            ? `${in_progress_program[0].description.slice(0, 100)}...`
                                            : in_progress_program[0].description}
                                    </p>
                                    <p className="text-base text-gray-600 leading-relaxed">
                                        {in_progress_program[0].start_date}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Upcoming Program</h3>

                                        <p className="text-base text-xl text-gray-600 leading-relaxed">
                                            {incoming_program[0].title}
                                        </p>
                                        <p className="text-base text-gray-600 leading-relaxed">
                                            {incoming_program[0].description.length > 100
                                                ? `${incoming_program[0].description.slice(0, 100)}...`
                                                : incoming_program[0].description}
                                        </p>
                                        <p className="text-base text-gray-600 leading-relaxed">
                                            {incoming_program[0].start_date}
                                        </p>
                                    </div>
                                </div>

                            )
                        }

                        {
                            !in_progress_program && !next_program ? (
                                <div className="flex flex-col gap-4">Incoming Program</div>
                            ) : null
                        }
                    </div>

                    {/* Announcements */}
                    <div className="lg:col-span-2 bg-white shadow rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Recent Announcements</h3>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Track new records, latest check-ins, and recent updates. Use this section for admin actions or quick overviews.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// ==================== COMPONENTS ====================

const StatCard = ({ title, count }) => (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded-xl">
        <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h2 className="text-2xl font-bold text-gray-800">{count}</h2>
        </div>
        <div className="bg-green-200 p-2 rounded-full">
            <UserGroupIcon className="h-6 w-6 text-gray-700" />
        </div>
    </div>
);

const TableHead = ({ children, className = '' }) => (
    <th className={`px-4 py-3 text-sm font-semibold text-gray-700 ${className}`}>{children}</th>
);

const TableData = ({ children, className = '' }) => (
    <td className={`px-4 py-4 text-sm text-gray-600 ${className}`}>{children}</td>
);

const EmptyCard = () => (
    <div className="rounded-lg bg-gray-50 border border-dashed border-gray-300 p-6 text-sm text-gray-400 flex items-center justify-center h-32">
        No sponsors found.
    </div>
);
