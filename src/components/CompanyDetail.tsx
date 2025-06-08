import React from 'react';
import { Company } from '../models/companies';
import { Line } from 'react-chartjs-2';
import { BiBuilding, BiDollar, BiTrendingUp, BiGroup, BiPurchaseTag } from 'react-icons/bi';
import { motion } from 'framer-motion';

interface CompanyDetailProps {
  company: Company;
  onBack: () => void;
  onBuy: (company: Company) => void;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onBack, onBuy }) => {
  // Prepare historical data for charts
  const financialChartData = {
    labels: company.history.map(h => h.year.toString()).reverse(),
    datasets: [
      {
        label: 'Revenue',
        data: company.history.map(h => h.revenue / 1000000).reverse(),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Profit',
        data: company.history.map(h => h.profit / 1000000).reverse(),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Free Cash Flow',
        data: company.history.map(h => h.fcf).reverse(),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  const metricsChartData = {
    labels: company.history.map(h => h.year.toString()).reverse(),
    datasets: [
      {
        label: 'P/E Ratio',
        data: company.history.map(h => h.pe).reverse(),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
      {
        label: 'ROI',
        data: company.history.map(h => h.roi * 100).reverse(),
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1,
      },
      {
        label: 'ROCE',
        data: company.history.map(h => h.roce * 100).reverse(),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="company-detail">
      <motion.button
        className="back-button"
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Screener
      </motion.button>

      <div className="company-header">
        <div className="company-title">
          <h2>{company.name}</h2>
          <span className={`sector-tag ${company.sector}`}>{company.sector}</span>
        </div>
        <motion.button
          className="buy-button"
          onClick={() => onBuy(company)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BiPurchaseTag /> Buy Stock
        </motion.button>
      </div>

      <div className="company-grid">
        <div className="company-card">
          <h3><BiBuilding /> Company Background</h3>
          <p>{company.background.description}</p>
          <div className="company-info">
            <div>
              <strong>Founded:</strong> {company.background.founded}
            </div>
            <div>
              <strong>Headquarters:</strong> {company.background.headquarters}
            </div>
            <div>
              <strong>Employees:</strong> {company.background.employees.toLocaleString()}
            </div>
          </div>
          <div className="management-info">
            <h4>Management</h4>
            <div>CEO: {company.background.management.ceo}</div>
            <div>CFO: {company.background.management.cfo}</div>
          </div>
        </div>

        <div className="company-card metrics">
          <h3><BiDollar /> Key Metrics</h3>
          <div className="metrics-grid">
            <div>
              <label>Market Cap</label>
              <span>${(company.marketCap / 1000000000).toFixed(1)}B</span>
            </div>
            <div>
              <label>P/E Ratio</label>
              <span>{company.peRatio.toFixed(1)}</span>
            </div>
            <div>
              <label>ROE</label>
              <span>{(company.roe * 100).toFixed(1)}%</span>
            </div>
            <div>
              <label>ROCE</label>
              <span>{(company.roce * 100).toFixed(1)}%</span>
            </div>
            <div>
              <label>Debt/Equity</label>
              <span>{company.debtToEquity.toFixed(2)}</span>
            </div>
            <div>
              <label>Stock Price</label>
              <span>${company.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="company-card products">
          <h3><BiGroup /> Products & Competition</h3>
          <div className="products-section">
            <h4>Key Products</h4>
            <ul>
              {company.background.keyProducts.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          </div>
          <div className="competitors-section">
            <h4>Key Competitors</h4>
            <ul>
              {company.background.competitors.map((competitor, index) => (
                <li key={index}>{competitor}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="company-card chart">
          <h3><BiTrendingUp /> Financial History</h3>
          <Line 
            data={financialChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Revenue, Profit & FCF (Millions)'
                }
              }
            }}
          />
        </div>

        <div className="company-card chart">
          <h3><BiTrendingUp /> Financial Ratios</h3>
          <Line 
            data={metricsChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'P/E Ratio, ROI & ROCE'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
