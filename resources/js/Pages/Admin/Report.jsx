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
import Modal from "@/Components/Modal.jsx";
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

        closeModal();
    };


    const [ isOpenMOdal, setOpenModal ] = useState(false);

    const openModal = () => {
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    }






    return (
        <AuthenticatedLayout>
            <Head title="Analytics Dashboard" />
            <Modal show={isOpenMOdal} onClose={closeModal} maxWidth="lg">
                <div className="p-8 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">📄 Generate Report</h2>
                    <form onSubmit={handleDownload}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    id="start_date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                                <input
                                    type="date"
                                    id="end_date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Generate Report
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <div className="min-h-screen bg-green-50 p-6 flex flex-col space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-green-700 text-center">
                    📊 Admin Analytics Dashboard
                </h1>

                {/* Top stats */}



                <button
                    onClick={openModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg shadow hover:bg-indigo-700 transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>

                    Generate Report
                </button>


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
