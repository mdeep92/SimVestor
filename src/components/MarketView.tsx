import React, { useState } from 'react';
import { Company } from '../models/companies';
import { BiDollar, BiPurchaseTag, BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { MarketViewProps } from '../types/portfolio';

const MarketView: React.FC<MarketViewProps> = ({ companies, portfolio, setPortfolio }) => {
  const [shareInputs, setShareInputs] = useState<Record<string, string>>({});

  const handleShareInputChange = (company: Company, value: string) => {
    setShareInputs(prev => ({
      ...prev,
      [company.name]: value
    }));
  };

  const buyStock = (company: Company) => {
    const shares = Number(shareInputs[company.name]);
    if (isNaN(shares) || shares <= 0) {
      alert('Please enter a valid number of shares.');
      return;
    }
    
    const cost = company.price * shares;
    if (cost > portfolio.cash) {
      alert('Not enough cash!');
      return;
    }

    setPortfolio(prev => {
      const existingHolding = prev.holdings.find(h => h.company.name === company.name);
      const newHoldings = existingHolding
        ? prev.holdings.map(h => {
            if (h.company.name === company.name) {
              const totalShares = h.shares + shares;
              const totalCost = (h.avgBuyPrice * h.shares) + (company.price * shares);
              return {
                ...h,
                shares: totalShares,
                avgBuyPrice: totalCost / totalShares
              };
            }
            return h;
          })
        : [...prev.holdings, { 
            company, 
            shares,
            avgBuyPrice: company.price 
          }];

      return {
        cash: prev.cash - cost,
        holdings: newHoldings
      };
    });

    // Clear the input after purchase
    setShareInputs(prev => ({
      ...prev,
      [company.name]: ''
    }));
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="market-header"
      >
        <h2>Market</h2>
        <div className="cash-display">
          <BiDollar />
          <span>Available Cash: ${portfolio.cash.toFixed(2)}</span>
        </div>
      </motion.div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Price</th>
              <th>ROE</th>
              <th>FCF</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <motion.tr
                key={company.name}
                variants={tableRowVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <td>
                  <span className="company-name">{company.name}</span>
                  <span className={`sector-tag ${company.sector}`}>{company.sector}</span>
                </td>
                <td>
                  <div className="price-cell">
                    ${company.price.toFixed(2)}
                    {company.priceChange && (
                      <span className={`price-change ${company.priceChange >= 0 ? 'positive' : 'negative'}`}>
                        {company.priceChange >= 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                        {Math.abs(company.priceChange).toFixed(2)}%
                      </span>
                    )}
                  </div>
                </td>
                <td>{(company.roe * 100).toFixed(1)}%</td>
                <td>${company.fcf.toLocaleString()}</td>
                <td className="buy-cell">
                  <div className="buy-control">
                    <input
                      type="number"
                      min="1"
                      className="share-input"
                      value={shareInputs[company.name] || ''}
                      onChange={(e) => handleShareInputChange(company, e.target.value)}
                      placeholder="Shares"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => buyStock(company)}
                      className="buy-button"
                      disabled={!shareInputs[company.name]}
                    >
                      <BiPurchaseTag /> Buy
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketView;
