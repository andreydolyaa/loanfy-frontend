

import React from 'react';
import './ChartLine.scss';
import { Bar } from 'react-chartjs-2';

export default function ChartLine({ totalLoan, totalInterest, totalLoanReturned }) {

    const chartData = () => {
        var data = {
            datasets: [{
                label:'Global Stats',
                data: [
                    totalLoan.toFixed(0),
                    totalInterest + totalLoan,
                    totalLoanReturned.toFixed(0)
                ],
                backgroundColor: ['#3273FF', '#5D32FF', '#64FF32']
            }],
            labels: ['Borrowed', 'Expc. Profit', 'Returned'],
        }
        return data;
    }


    return (
        <div className="chart-line">
            <Bar data={chartData} width={50} height={50} />
        </div>
    )
}
