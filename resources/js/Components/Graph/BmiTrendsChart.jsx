// resources/js/Components/BMITrendsChart.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const BmiTrendsChart = ({ trends }) => {
    const labels = trends.map(item => item.date);

    const datasets = [
        {
            label: 'Underweight',
            data: trends.map(item => item.underweight),
            borderColor: '#42a5f5',
            tension: 0.3,
        },
        {
            label: 'Normal',
            data: trends.map(item => item.normal),
            borderColor: '#66bb6a',
            tension: 0.3,
        },
        {
            label: 'Overweight',
            data: trends.map(item => item.overweight),
            borderColor: '#ffa726',
            tension: 0.3,
        },
        {
            label: 'Obese',
            data: trends.map(item => item.obese),
            borderColor: '#ef5350',
            tension: 0.3,
        },
        {
            label: 'Overweight + Obese',
            data: trends.map(item => item.overweight_and_obese),
            borderColor: '#8e24aa',
            borderDash: [6, 3],
            tension: 0.3,
        },
    ];

    const chartData = { labels, datasets };

    return (
        <Card elevation={0} sx={{ boxShadow: 'none', borderRadius: 2, m: 0 }}>
            <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    BMI Trends Over Time
                </Typography>
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 1 },
                            },
                        },
                        layout: {
                            padding: 0, // remove internal padding if any
                        },
                    }}
                    height={120} // even smaller chart height
                />
            </CardContent>
        </Card>
    );
};

BmiTrendsChart.propTypes = {
    trends: PropTypes.array.isRequired,
};

export default BmiTrendsChart;
