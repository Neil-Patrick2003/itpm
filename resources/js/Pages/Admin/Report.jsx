import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import {Head, Link, useForm} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SponsorshipStats from "@/Components/Graph/SponsorshipStats.jsx";
import PieChartComponent from "@/Components/Graph/PieChartComponent.jsx";
import {Inertia} from "@inertiajs/inertia";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AdminDashboard = ({ averageWeights, sponsorshipStats, beneficiaryMonthlyStats, programStatusCounts }) => {
    const programStatusLabels = ['Completed', 'In Progress', 'Incoming'];
    const programStatusData = [
        Number(programStatusCounts?.completed || 0),
        Number(programStatusCounts?.in_progress || 0),
        Number(programStatusCounts?.incoming || 0),
    ];




    const monthly_beneficiary = beneficiaryMonthlyStats.map(item => item.beneficiaries_count);

    const sponsorLabels = sponsorshipStats.map(item => item.month);
    const barData = sponsorshipStats.map(item => item.total_money);
    const lineData = sponsorshipStats.map(item => item.goods_count);

    const labels = averageWeights.map(item => item.month);
    const dataPoints = averageWeights.map(item => Number(item.avg_weight));
    const last = dataPoints[dataPoints.length - 1];

    const weightData = {
        labels,
        datasets: [{
            label: 'Avg. Weight (kg)',
            data: dataPoints,
            borderColor: '#22c55e', // Green-500
            backgroundColor: 'rgba(34, 197, 94, 0.2)', // Green-500 at 20% opacity
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#22c55e',
            pointBorderColor: '#15803d', // Green-700
        }],
    };

    const weightOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#15803d', // Green-700
                    font: { weight: 'bold' },
                }
            },
            title: { display: false },
        },
        scales: {
            y: {
                title: { display: true, text: 'Weight (kg)', color: '#15803d', font: { weight: 'bold' } },
                ticks: { color: '#166534' }, // Green-800
                beginAtZero: true,
            },
            x: {
                title: { display: true, text: 'Month', color: '#15803d', font: { weight: 'bold' } },
                ticks: { color: '#166534' }, // Green-800
            }
        }
    };

    const first = dataPoints[0]?.toFixed(1);
    const Last = dataPoints[dataPoints.length - 1]?.toFixed(1);


    const{ data, setData, post, processing, errors, reset } = useForm({
        start_date: '',
        end_date: '',
    })

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDownload = () => {
        const url = route('reports.export', {
            start: startDate,
            end: endDate,
        });
        window.open(url, '_blank');
    };




    return (
        <AuthenticatedLayout>
            <Head title="Analytics Dashboard" />
            <div className="min-h-screen bg-green-50 p-6 flex flex-col space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-green-700 text-center">
                    📊 Admin Analytics Dashboard
                </h1>

                {/* Top stats */}
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
                    <form onSubmit={handleDownload}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    id="start_date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    id="end_date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
                            >
                                Generate Report
                            </button>
                        </div>
                    </form>
                </div>

                {/*<button*/}
                {/*    onClick={() => {*/}
                {/*        const url = route('reports.export', {*/}
                {/*            start: startDate,*/}
                {/*            end: endDate,*/}
                {/*        });*/}
                {/*        window.open(url, '_blank');*/}
                {/*    }}*/}
                {/*    className="btn btn-primary"*/}
                {/*>*/}
                {/*    Download Filtered PDF*/}
                {/*</button>*/}

                {/*<a href={window.routes.downloadInvoice} className="btn btn-primary">*/}
                {/*    Download Invoice PDF*/}
                {/*</a>*/}


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <p className="text-sm text-gray-500">Avg. Weight</p>
                        <h2 className="text-2xl font-bold text-green-600">{last?.toFixed(1)} kg</h2>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <p className="text-sm text-gray-500">Total Beneficiaries</p>
                        <h2 className="text-2xl font-bold text-green-600">{monthly_beneficiary.reduce((a, b) => a + b, 0)}</h2>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <p className="text-sm text-gray-500">Total Sponsorship</p>
                        <h2 className="text-2xl font-bold text-green-600">₱{barData.reduce((a, b) => a + b, 0).toLocaleString()}</h2>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Nutrition Trend</h3>
                        <div className="flex-1">
                            <Line data={weightData} options={weightOptions}/>
                            {first && Last && (
                                <p className="mt-4 text-gray-700">
                                    Average weight increased
                                    from <strong>{first}kg</strong> to <strong>{last}kg</strong> over {labels.length} months.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Sponsorship Overview</h3>
                        <div className="flex-1">
                            <SponsorshipStats
                                title=""
                                labels={sponsorLabels}
                                barLabel="₱ Donations"
                                barData={barData}
                                lineLabel="Goods"
                                lineData={lineData}
                                barColor="#4ade80" // Green-400
                                lineColor="#16a34a" // Green-600
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Program Status</h3>
                        <PieChartComponent
                            data={programStatusData}
                            labels={programStatusLabels}
                            colors={['#16a34a', '#4ade80', '#bbf7d0']} // Dark to light green shades
                            height={250}
                            width={250}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
