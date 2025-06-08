import React from 'react';
import { Company } from '../models/companies';
import { Pie } from 'react-chartjs-2';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { Portfolio, PortfolioViewProps, HoldingData } from '../types/portfolio';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioView: React.FC<PortfolioViewProps> = ({ portfolio, companies, setPortfolio }) => {
  const sellStock = (holding: HoldingData) => {
    const shares = Number(prompt(`How many shares of ${holding.company.name} do you want to sell?`));
    if (isNaN(shares) || shares <= 0 || shares > holding.shares) {
      alert('Invalid number of shares!');
      return;
    }

    setPortfolio(prev => {
      const newHoldings = prev.holdings
        .map(h => 
          h.company.name === holding.company.name
            ? { ...h, shares: h.shares - shares }
            : h
        )
        .filter(h => h.shares > 0);

      return {
        cash: prev.cash + (holding.company.price * shares),
        holdings: newHoldings
      };
    });
  };

  const totalValue = portfolio.cash + 
    portfolio.holdings.reduce((sum, h) => sum + (h.company.price * h.shares), 0);

  // Prepare data for stock allocation pie chart
  const stockAllocation = portfolio.holdings.reduce((acc, holding) => {
    const value = holding.company.price * holding.shares;
    acc[holding.company.name] = value;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = {
    labels: Object.keys(stockAllocation),
    datasets: [
      {
        data: Object.values(stockAllocation),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#00D8B6', '#FF8A80', '#B388FF', '#8C9EFF'
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Portfolio</h2>
      <div className="portfolio-summary">
        <p>Cash: ${portfolio.cash.toFixed(2)}</p>
        <p>Total Portfolio Value: ${totalValue.toFixed(2)}</p>

        {portfolio.holdings.length > 0 && (
          <div className="portfolio-chart">
            <h3>Stock Allocation</h3>
            <div className="chart-wrapper">
              <Pie 
                data={pieChartData} 
                options={{
                  plugins: {
                    legend: {
                      position: 'right' as const,
                    },
                    title: {
                      display: true,
                      text: 'Portfolio Distribution by Stock'
                    },
                  },
                }} 
              />
            </div>
          </div>
        )}
      </div>
      
      <h3>Holdings</h3>
      {portfolio.holdings.length === 0 ? (
        <p>No stocks in portfolio. Visit the Market to start investing!</p>
      ) : (
        <table>
          <thead>              <tr>
                <th>Company</th>
                <th>Shares</th>
                <th>Avg. Buy Price</th>
                <th>Current Price</th>
                <th>Total Value</th>
                <th>Gain/Loss</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map(holding => {
                const avgBuyPrice = holding.avgBuyPrice || holding.company.price;
                const gainLoss = ((holding.company.price - avgBuyPrice) / avgBuyPrice) * 100;
                return (
                  <tr key={holding.company.name}>
                    <td>{holding.company.name}</td>
                    <td>{holding.shares}</td>
                    <td>${avgBuyPrice.toFixed(2)}</td>
                    <td>${holding.company.price.toFixed(2)}</td>
                    <td>${(holding.shares * holding.company.price).toFixed(2)}</td>
                    <td className={`${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                      <span className="flex items-center gap-1">
                        {gainLoss >= 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                        {gainLoss.toFixed(2)}%
                      </span>
                    </td>
                    <td>
                      <button onClick={() => sellStock(holding)} className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors duration-200">
                        Sell
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PortfolioView;
