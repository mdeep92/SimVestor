import React, { useState } from 'react';
import { Company } from '../models/companies';
import { BiDollar, BiPurchaseTag, BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

interface MarketViewProps {
  companies: Company[];
  portfolio: {
    cash: number;
    holdings: { company: Company; shares: number }[];
  };
  setPortfolio: React.Dispatch<React.SetStateAction<{
    cash: number;
    holdings: { company: Company; shares: number }[];
  }>>;
}

interface ShareInputDialogProps {
  isOpen: boolean;
  company: Company | null;
  onClose: () => void;
  onConfirm: (shares: number) => void;
}

const ShareInputDialog: React.FC<ShareInputDialogProps> = ({ isOpen, company, onClose, onConfirm }) => {
  const [shares, setShares] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numShares = Number(shares);
    if (numShares > 0) {
      onConfirm(numShares);
      setShares('');
    }
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="share-input-overlay">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="share-input-dialog">
            <div className="share-input-content">
              <Dialog.Title>
                Buy {company?.name} Shares
              </Dialog.Title>
              <form onSubmit={handleSubmit} className="share-input-form">
                <input
                  type="number"
                  className="share-input"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  placeholder="Number of shares"
                  min="1"
                  autoFocus
                />
                <div className="action-buttons">
                  <button type="button" onClick={onClose}>Cancel</button>
                  <button type="submit" className="buy-button">Buy</button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

const MarketView: React.FC<MarketViewProps> = ({ companies, portfolio, setPortfolio }) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const buyStock = (shares: number) => {
    if (!selectedCompany) return;
    
    const cost = selectedCompany.price * shares;
    if (cost > portfolio.cash) {
      alert('Not enough cash!');
      return;
    }

    setPortfolio(prev => {
      const existingHolding = prev.holdings.find(h => h.company.name === selectedCompany.name);
      const newHoldings = existingHolding
        ? prev.holdings.map(h => 
            h.company.name === selectedCompany.name 
              ? { ...h, shares: h.shares + shares }
              : h
          )
        : [...prev.holdings, { company: selectedCompany, shares }];

      return {
        cash: prev.cash - cost,
        holdings: newHoldings
      };
    });
    setSelectedCompany(null);
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
                <td>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCompany(company)}
                    className="buy-button"
                  >
                    <BiPurchaseTag /> Buy
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareInputDialog
        isOpen={!!selectedCompany}
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onConfirm={buyStock}
      />
    </div>
  );
};

export default MarketView;
