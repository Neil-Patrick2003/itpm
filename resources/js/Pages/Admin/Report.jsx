import React, { useState } from 'react';
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
    ArcElement,
} from 'chart.js';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SponsorshipStats from "@/Components/Graph/SponsorshipStats.jsx";
import PieChartComponent from "@/Components/Graph/PieChartComponent.jsx";
import Modal from "@/Components/Modal.jsx";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
);

const AdminDashboard = ({
                            averageWeights,
                            sponsorshipStats,
                            beneficiaryMonthlyStats,
                            programStatusCounts,
                            underweightCount,
                            normalCount,
                            overweightCount,
                            obeseCount
                        }) => {
    const programStatusLabels = ['Completed', 'In Progress', 'Incoming'];
    const programStatusData = [
        Number(programStatusCounts?.completed || 0),
        Number(programStatusCounts?.in_progress || 0),
        Number(programStatusCounts?.incoming || 0),
    ];

    const healthLabels = ['Underweight', 'Normal', 'Overweight', 'Obese'];
    const healthData = [
        Number(underweightCount || 0),
        Number(normalCount || 0),
        Number(overweightCount || 0),
        Number(obeseCount || 0),
    ];

    const monthly_beneficiary = beneficiaryMonthlyStats.map(item => item.beneficiaries_count);
    const sponsorLabels = sponsorshipStats.map(item => item.month);
    const barData = sponsorshipStats.map(item => item.total_money);
    const lineData = sponsorshipStats.map(item => item.goods_count);

    const labels = averageWeights.map(item => item.month);
    const dataPoints = averageWeights.map(item => Number(item.avg_weight));
    const first = dataPoints[0]?.toFixed(1);
    const last = dataPoints[dataPoints.length - 1]?.toFixed(1);

    const weightData = {
        labels,
        datasets: [{
            label: 'Avg. Weight (kg)',
            data: dataPoints,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#22c55e',
            pointBorderColor: '#15803d',
        }],
    };

    const weightOptions = {
        responsive: true,
        plugins: {
            legend: { labels: { color: '#15803d', font: { weight: 'bold' } } },
            title: { display: false },
        },
        scales: {
            y: {
                title: { display: true, text: 'Weight (kg)', color: '#15803d', font: { weight: 'bold' } },
                ticks: { color: '#166534' },
                beginAtZero: true,
            },
            x: {
                title: { display: true, text: 'Month', color: '#15803d', font: { weight: 'bold' } },
                ticks: { color: '#166534' },
            }
        }
    };

    const { setData } = useForm({ start_date: '', end_date: '' });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isOpenModal, setOpenModal] = useState(false);

    const openModal = () => setOpenModal(true);
    const closeModal = () => setOpenModal(false);

    const handleDownload = (e) => {
        e.preventDefault();
        const url = route('reports.export', {
            start: startDate,
            end: endDate,
        });
        window.open(url, '_blank');
        closeModal();
    };

    return (
        <AuthenticatedLayout>
            <Head title="Analytics Dashboard" />
            <Modal show={isOpenModal} onClose={closeModal} maxWidth="lg">
                <div className="p-8 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-6">📄 Generate Report</h2>
                    <form onSubmit={handleDownload}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                                <input type="date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border rounded-lg px-4 py-2 shadow-sm" required />
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                                <input type="date" id="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border rounded-lg px-4 py-2 shadow-sm" required />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button type="submit" className="px-6 py-2 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition">
                                Generate Report
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <div className=" px-4 flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-green-700 text-center">📊 Admin Analytics Dashboard</h1>

                    <button onClick={openModal} className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-400 text-white font-medium text-sm rounded-lg shadow hover:bg-green-500 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10.5v6m3-3H9" />
                        </svg>
                        Generate Report
                    </button>
                </div>


                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-300 p-6 rounded-xl text-center">
                        <p className="text-sm text-gray-500">Avg. Weight</p>
                        <h2 className="text-2xl font-bold text-green-600">{last} kg</h2>
                    </div>
                    <div className="bg-green-50 border border-green-300 p-6 rounded-xl  text-center">
                        <p className="text-sm text-gray-500">Total Beneficiaries</p>
                        <h2 className="text-2xl font-bold text-green-600">{monthly_beneficiary.reduce((a, b) => a + b, 0)}</h2>
                    </div>
                    <div className="bg-green-50 border border-green-300 p-6 rounded-xl text-center">
                        <p className="text-sm text-gray-500">Total Sponsorship</p>
                        <h2 className="text-2xl font-bold text-green-600">₱{barData.reduce((a, b) => a + b, 0).toLocaleString()}</h2>
                    </div>
                </div>

                {/* Graphs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-300 rounded-xl  p-6">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Nutrition Trend</h3>
                        <Line data={weightData} options={weightOptions} />
                        {first && last && (
                            <p className="mt-4 ">
                                Average weight increased from <strong>{first}kg</strong> to <strong>{last}kg</strong> over {labels.length} months.
                            </p>
                        )}
                    </div>

                    <div className="bg-green-50 border border-green-300 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Sponsorship Overview</h3>
                        <SponsorshipStats
                            labels={sponsorLabels}
                            barLabel="₱ Donations"
                            barData={barData}
                            lineLabel="Goods"
                            lineData={lineData}
                            barColor="#3AAE3E"
                            lineColor="#16a34a"
                        />
                    </div>

                    {/* Pie Chart 1 */}


                    {/* Pie Chart 2 */}
                    <div className="">
                        <div className="bg-green-50 border border-green-300 mb-6 rounded-xl p-6">
                            <PieChartComponent
                                title="Children's Health Status"
                                labels={healthLabels}
                                data={healthData}
                                height={200}
                            />
                        </div>

                        <div className="bg-green-50 border border-green-300 gap-4 rounded-xl p-6">
                            <PieChartComponent
                                title="Program Status Distribution"
                                labels={programStatusLabels}
                                data={programStatusData}
                                height={200}
                            />
                        </div>
                    </div>



                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
