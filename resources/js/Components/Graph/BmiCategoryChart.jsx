import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const BmiCategoryChart = ({ underweight, normal, overweight_andObese }) => {
    const data = [
        { name: 'Underweight', value: underweight, color: '#42a5f5' },
        { name: 'Normal', value: normal, color: '#66bb6a' },
        { name: 'Overweight + Obese', value: overweight_andObese, color: '#ef5350' },
    ];

    return (
        <Card elevation={0} sx={{ borderRadius: 2, p: 0}}>
            <CardContent sx={{ p: 0.5 }}>
                <Typography variant="subtitle1" sx={{ mb:0, fontSize: '16px', textAlign: 'left' }}>
                    BMI Categories
                </Typography>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80%',
                    height: '130px'
                }}>
                    <PieChart width={650} height={100}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="70%"   // Center horizontally
                            cy="50%"   // Center vertically
                            outerRadius={110} // Set outer radius to fit
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="left" align="left" layout="vertical" />
                    </PieChart>
                </div>
            </CardContent>
        </Card>
    );
};

BmiCategoryChart.propTypes = {
    underweight: PropTypes.number.isRequired,
    normal: PropTypes.number.isRequired,
    overweight_andObese: PropTypes.number.isRequired,
};

export default BmiCategoryChart;
