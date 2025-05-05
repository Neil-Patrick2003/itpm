import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

// The reusable pie chart component
const PieChart = ({
                               data,
                               labels,
                               height = 200,
                               width = 200,
                               valueFormatter = (value) => `${value}%`,
                               colors = ['#60a5fa', '#34d399', '#f87171'], // default colors for the pie slices
                           }) => {
    // Prepare data for PieChart component (if you don't have id's, create them)
    const chartData = data.map((value, index) => ({
        id: index,
        value: value,
        label: labels[index] || `Label ${index + 1}`,
    }));

    return (
        <PieChart
            series={[
                {
                    data: chartData,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    valueFormatter: valueFormatter,
                },
            ]}
            height={height}
            width={width}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    fill: '#333',
                },
            }}
        />
    );
};

export default PieChart;
