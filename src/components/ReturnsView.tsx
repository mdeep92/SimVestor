import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Company } from '../models/companies';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ReturnsViewProps {
  portfolio: {
    cash: number;
    holdings: { company: Company; shares: number }[];
  };
  weeklyReturns: { week: number; value: number }[];
}

const calculateXIRR = (cashflows: { amount: number; date: Date }[]): number => {
  // Simple XIRR approximation
  if (cashflows.length < 2) return 0;
  const initialValue = cashflows[0].amount;
  const finalValue = cashflows[cashflows.length - 1].amount;
  const years = (cashflows[cashflows.length - 1].date.getTime() - cashflows[0].date.getTime()) / (365 * 24 * 60 * 60 * 1000);
  return Math.pow(finalValue / Math.abs(initialValue), 1 / years) - 1;
};

const ReturnsView: React.FC<ReturnsViewProps> = ({ portfolio, weeklyReturns }) => {
  // Calculate total portfolio value
  const totalValue = portfolio.cash + 
    portfolio.holdings.reduce((sum, h) => sum + (h.company.price * h.shares), 0);

  // Prepare data for returns line chart
  const returnsChartData = {
    labels: weeklyReturns.map(wr => `Week ${wr.week}`),
    datasets: [
      {
        label: 'Portfolio Value',
        data: weeklyReturns.map(wr => wr.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Calculate sector allocation for pie chart
  const sectorAllocation = portfolio.holdings.reduce((acc, holding) => {
    const value = holding.company.price * holding.shares;
    acc[holding.company.sector] = (acc[holding.company.sector] || 0) + value;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = {
    labels: Object.keys(sectorAllocation),
    datasets: [
      {
        data: Object.values(sectorAllocation),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  // Calculate XIRR
  const xirr = weeklyReturns.length <= 1 ? 0 : calculateXIRR([
    { amount: -10000, date: new Date(2025, 0, 1) }, // Initial investment
    { amount: totalValue, date: new Date() },
  ]);

  return (
    <div className="returns-container">
      <div className="returns-summary">
        <h2>Portfolio Returns Analysis</h2>
        <div className="metrics">
          <div className="metric">
            <h3>Total Value</h3>
            <p>${totalValue.toFixed(2)}</p>
          </div>
          <div className="metric">
            <h3>XIRR</h3>
            <p>{(xirr * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-section">
          <h3>Portfolio Value Trend</h3>
          <div className="chart-wrapper">
            <Line data={returnsChartData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Portfolio Value Over Time'
                },
              },
            }} />
          </div>
        </div>

        <div className="chart-section">
          <h3>Sector Allocation</h3>
          <div className="chart-wrapper">
            <Pie data={pieChartData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right' as const,
                },
                title: {
                  display: true,
                  text: 'Portfolio Sector Distribution'
                },
              },
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsView;
