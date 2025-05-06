import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SponsorshipStats = ({ labels, barLabel, barData, lineLabel, lineData, barColor, lineColor }) => {
    const barChartData = {
        labels: labels,
        datasets: [{
            label: barLabel,
            data: barData,
            backgroundColor: barColor || '#4ade80', // Default to green-400
            borderColor: barColor || '#34d399', // Default to green-300
            borderWidth: 1,
            height: 12
        }]
    };

    const lineChartData = {
        labels: labels,
        datasets: [{
            label: lineLabel,
            data: lineData,
            borderColor: lineColor || '#16a34a', // Default to green-600
            backgroundColor: 'rgba(22, 163, 74, 0.2)', // Light green-600
            fill: true,
            tension: 0.4,
            pointBackgroundColor: lineColor || '#16a34a',
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: '#15803d' }, // Green-700 for text
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                    color: '#15803d',
                    font: { weight: 'bold' },
                },
                ticks: { color: '#15803d' },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount/Count',
                    color: '#15803d',
                    font: { weight: 'bold' },
                },
                ticks: { color: '#15803d' },
            }
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <Bar data={barChartData} options={chartOptions} height={200} width={400} />
            <Line data={lineChartData} options={chartOptions} height={420} width={600}   />
        </div>
    );
};

export default SponsorshipStats;
