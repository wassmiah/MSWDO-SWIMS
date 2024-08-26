import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './PieChart.css'; // Ensure this path is correct

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const data = {
    labels: ['Victim Survivors', 'Children in Conflict with the law', 'Person Who Uses Drugs', 'Special Cases'],
    datasets: [
        {
            data: [20, 30, 40, 10],
            backgroundColor: ['#4BC0C0', '#FFCE56', '#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#4BC0C0', '#FFCE56', '#FF6384', '#36A2EB'],
        },
    ],
};

const options = {
    plugins: {
        legend: {
            display: false,
        },
        datalabels: {
            color: 'white',
            formatter: (value, context) => {
                let sum = 0;
                const dataArr = context.chart.data.datasets[0].data;
                dataArr.forEach(data => {
                    sum += data;
                });
                const percentage = Math.round((value * 100) / sum) + "%";
                return percentage;
            },
        },
    },
};

const PieChart = () => {
    return (
        <div className="pie-chart-container">
            <h3>Case by Categories</h3>
            <div className="pie-chart">
                <Pie data={data} options={options} />
            </div>
            <div className="legend">
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#4BC0C0' }}></span> Victim Survivors
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#FFCE56' }}></span> Children in Conflict with the law
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#FF6384' }}></span> Person Who Uses Drugs
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#36A2EB' }}></span> Special Cases
                </div>
            </div>
        </div>
    );
};

export default PieChart;
