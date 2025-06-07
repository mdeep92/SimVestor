import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companies } from '../models/companies';
import { newsDatabase } from '../newsDatabase';
import { PriceEngine } from '../models/priceEngine';
import MarketView from './MarketView';
import NewsView from './NewsView';
import PortfolioView from './PortfolioView';
import ReturnsView from './ReturnsView';
import HowToPlay from './HowToPlay';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { BiLogOut, BiTrendingUp, BiNews, BiWallet, BiLineChart, BiRightArrowAlt, BiInfoCircle } from 'react-icons/bi';

type TabType = 'howto' | 'market' | 'news' | 'portfolio' | 'returns';

const App: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('howto');
  const [week, setWeek] = useState(1);
  const [newsHistory, setNewsHistory] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState({
    cash: 1000,
    holdings: [] as { company: typeof companies[0], shares: number }[]
  });
  const [weeklyReturns, setWeeklyReturns] = useState<{ week: number; value: number }[]>([
    { week: 0, value: 1000 } // Initial investment
  ]);
  
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
                className="how-to-play-tab"
              >
                <div className="card">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <BiInfoCircle className="text-primary" />
                    How to Play Simvestor
                  </h2>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-xl font-semibold mb-2">Game Overview</h3>
                      <p>
                        Simvestor is a stock market simulation game where you can practice investing
                        without risking real money. Start with $1,000 and build your portfolio
                        by buying and selling stocks across different sectors.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold mb-2">Game Mechanics</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>The game progresses week by week</li>
                        <li>Each week brings new market news that affects stock prices</li>
                        <li>News can impact specific sectors or the entire market</li>
                        <li>Stock prices change based on news and market volatility</li>
                        <li>Track your portfolio's performance and returns over time</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold mb-2">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="feature-card">
                          <h4><BiTrendingUp /> Market View</h4>
                          <p>Browse and buy stocks from different sectors</p>
                        </div>
                        <div className="feature-card">
                          <h4><BiNews /> News Feed</h4>
                          <p>Stay updated with market news and their impacts</p>
                        </div>
                        <div className="feature-card">
                          <h4><BiWallet /> Portfolio</h4>
                          <p>Manage your holdings and track investments</p>
                        </div>
                        <div className="feature-card">
                          <h4><BiLineChart /> Returns</h4>
                          <p>Analyze your performance with charts and metrics</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Click on the Market tab to view available stocks</li>
                        <li>Use your initial $1,000 to buy your first stocks</li>
                        <li>Monitor news events that might affect your investments</li>
                        <li>Track your portfolio's performance in the Returns tab</li>
                        <li>Buy low and sell high to maximize your returns!</li>
                      </ol>
                    </section>

                    <div className="mt-6">
                      <button
                        onClick={() => setActiveTab('market')}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
                      >
                        Let's Start Investing!
                      </button>
                    </div>
                  </div>
                </div>
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
      </div>
    </ProtectedRoute>
  );
};

export default App;
