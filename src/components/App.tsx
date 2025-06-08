import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Company } from '../models/companies';
import { companies } from '../models/companies';
import { newsDatabase } from '../newsDatabase';
import { PriceEngine } from '../models/priceEngine';
import { Portfolio, HoldingData } from '../types/portfolio';
import MarketView from './MarketView';
import NewsView from './NewsView';
import PortfolioView from './PortfolioView';
import ReturnsView from './ReturnsView';
import HowToPlay from './HowToPlay';
import Screener from './Screener';
import CompanyDetail from './CompanyDetail';
import QuarterlyReportModal from './QuarterlyReportModal';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { BiLogOut, BiTrendingUp, BiNews, BiWallet, BiLineChart, BiRightArrowAlt, BiInfoCircle, BiFilter } from 'react-icons/bi';


type TabType = 'howto' | 'market' | 'news' | 'portfolio' | 'returns' | 'screener';

interface ViewState {
  view: 'screener' | 'detail';
  selectedCompany: Company | null;
}

const App: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('howto');
  const [week, setWeek] = useState(1);
  const [newsHistory, setNewsHistory] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 10000,
    holdings: []
  });
  const [weeklyReturns, setWeeklyReturns] = useState<{ week: number; value: number }[]>([
    { week: 0, value: 10000 }
  ]);
  const [viewState, setViewState] = useState<ViewState>({ 
    view: 'screener', 
    selectedCompany: null 
  });
  const [quarterStartValue, setQuarterStartValue] = useState(10000);
  const [showQuarterlyReport, setShowQuarterlyReport] = useState(false);
  const [lastReportWeek, setLastReportWeek] = useState(0);
  
  const [priceEngine] = useState(() => new PriceEngine(0.02)); // 2% base volatility

  const advanceWeek = () => {
    // Get random news event
    const news = newsDatabase[Math.floor(Math.random() * newsDatabase.length)];
    
    // Apply price updates with news impact
    priceEngine.applyNewsImpact(companies, news.impact);
    
    setNewsHistory(prev => [...prev, news.headline]);
    setWeek(prev => prev + 1);

    // Calculate and update portfolio value
    const totalValue = portfolio.cash +
      portfolio.holdings.reduce((sum, h) => sum + (h.company.price * h.shares), 0);
    setWeeklyReturns(prev => [...prev, { week: week, value: totalValue }]);
  };

  // Calculate average buy prices for quarterly report
  const getHoldingsWithAvgPrice = (): HoldingData[] => {
    return portfolio.holdings.map(holding => ({
      ...holding,
      avgBuyPrice: holding.avgBuyPrice || holding.company.price
    }));
  };

  useEffect(() => {
    const currentQuarter = Math.floor(week / 12);
    const previousQuarter = Math.floor(lastReportWeek / 12);
    
    if (currentQuarter > previousQuarter && week > 0) {
      const totalValue = portfolio.cash + 
        portfolio.holdings.reduce((sum, h) => sum + (h.company.price * h.shares), 0);
      setShowQuarterlyReport(true);
      setLastReportWeek(week);
    }
  }, [week, lastReportWeek]);

  // Effect to update quarter start value
  useEffect(() => {
    if (week % 12 === 0) {
      const totalValue = portfolio.cash + 
        portfolio.holdings.reduce((sum, h) => sum + (h.company.price * h.shares), 0);
      setQuarterStartValue(totalValue);
    }
  }, [week, portfolio]);

  return (
    <ProtectedRoute>
      <div className="container">
        <header>
          <div className="header-content">
            <h1>Simvestor</h1>
            <div className="user-info">
              <span>{user?.email}</span>
              <button onClick={logout} className="logout-button">
                <BiLogOut />
                Logout
              </button>
            </div>
          </div>
          <nav>
            <button 
              onClick={() => setActiveTab('howto')} 
              className={activeTab === 'howto' ? 'active' : ''}
            >
              <BiInfoCircle /> How to Play
            </button>
            <button 
              onClick={() => setActiveTab('market')} 
              className={activeTab === 'market' ? 'active' : ''}
            >
              <BiTrendingUp /> Market
            </button>
            <button 
              onClick={() => setActiveTab('screener')} 
              className={activeTab === 'screener' ? 'active' : ''}
            >
              <BiFilter /> Screener
            </button>
            <button 
              onClick={() => setActiveTab('news')} 
              className={activeTab === 'news' ? 'active' : ''}
            >
              <BiNews /> News
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')} 
              className={activeTab === 'portfolio' ? 'active' : ''}
            >
              <BiWallet /> Portfolio
            </button>
            <button 
              onClick={() => setActiveTab('returns')} 
              className={activeTab === 'returns' ? 'active' : ''}
            >
              <BiLineChart /> Returns
            </button>
            <button onClick={advanceWeek} className="advance-week">
              Advance Week ({week}) <BiRightArrowAlt />
            </button>
          </nav>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {activeTab === 'howto' && (
              <motion.div
                key="howto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <HowToPlay isOpen={true} onClose={() => setActiveTab('market')} />
              </motion.div>
            )}
            {activeTab === 'market' && (
              <motion.div
                key="market"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <MarketView 
                  companies={companies}
                  portfolio={portfolio}
                  setPortfolio={setPortfolio}
                />
              </motion.div>
            )}
            {activeTab === 'screener' && (
              <motion.div
                key="screener"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {viewState.view === 'screener' ? (
                  <Screener
                    companies={companies}
                    portfolio={portfolio}
                    setPortfolio={setPortfolio}
                    onCompanySelect={(company: Company) => 
                      setViewState({ view: 'detail', selectedCompany: company })}
                  />
                ) : (
                  <CompanyDetail
                    company={viewState.selectedCompany!}
                    onBack={() => setViewState({ view: 'screener', selectedCompany: null })}
                    onBuy={(company) => {
                      setActiveTab('market');
                      // You might want to trigger the buy dialog in MarketView here
                    }}
                  />
                )}
              </motion.div>
            )}
            {activeTab === 'news' && (
              <motion.div
                key="news"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <NewsView 
                  newsHistory={newsHistory}
                  week={week}
                />
              </motion.div>
            )}
            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <PortfolioView 
                  portfolio={portfolio}
                  companies={companies}
                  setPortfolio={setPortfolio}
                />
              </motion.div>
            )}
            {activeTab === 'returns' && (
              <motion.div
                key="returns"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ReturnsView
                  portfolio={portfolio}
                  weeklyReturns={weeklyReturns}
                  companies={companies}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <QuarterlyReportModal
          isOpen={showQuarterlyReport}
          onClose={() => setShowQuarterlyReport(false)}
          weekNumber={week}
          portfolioValueStart={quarterStartValue}
          portfolioValueEnd={
            portfolio.cash + 
            portfolio.holdings.reduce((sum, h) => sum + (h.company.price * h.shares), 0)
          }
          holdings={getHoldingsWithAvgPrice()}
        />
      </div>
    </ProtectedRoute>
  );
};

export default App;
