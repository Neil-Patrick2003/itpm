import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ data, labels, height, width }) => {
    const COLORS = ['#60a5fa', '#34d399', '#f87171'];  // Colors for each section in the pie chart

    // Data structure needs to be compatible with the Pie chart. If it's not, make sure to map it correctly.
    const pieData = labels.map((label, index) => ({
        name: label,
        value: data[index],
        fill: COLORS[index % COLORS.length],  // This ensures the colors cycle if you have more than 3 data points
    }));

    return (
        <ResponsiveContainer width={width} height={height}>
            <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;
