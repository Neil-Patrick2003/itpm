import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ title, labels, data, height = 200 }) => {
    const chartData = {
        labels,
        datasets: [{
            label: title,
            data,
            backgroundColor: ['#8DD690', '#66CA6A', '#5EBB62', '#57AB5A'],
            borderWidth: 0, // Border removed
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#166534',
                    font: {
                        weight: 'bold',
                    }
                }
            },
            title: {
                display: true,
                text: title,
                color: '#15803d',
                font: {
                    size: 16,
                    weight: 'bold',
                }
            }
        }
    };

    return (
        <div className="h-[240px]">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChartComponent;
