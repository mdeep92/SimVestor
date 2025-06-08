import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Pie } from 'react-chartjs-2';
import { BiTrendingUp, BiTrendingDown, BiX, BiMedal, BiBarChart, BiDollar, BiWallet } from 'react-icons/bi';
import { HoldingData, QuarterlyReportModalProps } from '../types/portfolio';

const calculatePerformanceData = (
  holdings: HoldingData[],
  portfolioValueStart: number,
  portfolioValueEnd: number
) => {
  // Calculate percentage gain
  const percentageGain = ((portfolioValueEnd - portfolioValueStart) / portfolioValueStart) * 100;

  // Calculate returns for each holding
  const holdingReturns = holdings.map(holding => {
    const currentValue = holding.company.price * holding.shares;
    const costBasis = holding.avgBuyPrice * holding.shares;
    const returnPercentage = ((currentValue - costBasis) / costBasis) * 100;
    const profitLoss = currentValue - costBasis;
    
    return {
      company: holding.company,
      returnPercentage,
      shares: holding.shares,
      profit: profitLoss
    };
  });

  // Sort by return percentage for gainers and losers
  const sortedReturns = [...holdingReturns].sort((a, b) => b.returnPercentage - a.returnPercentage);
  const topGainers = sortedReturns.filter(r => r.returnPercentage > 0).slice(0, 3);
  const topLosers = sortedReturns
    .filter(r => r.returnPercentage < 0)
    .reverse()
    .slice(0, 3)
    .map(({ profit, ...rest }) => ({ ...rest, loss: -profit }));

  // Calculate sector distribution
  const sectorDistribution = new Map<string, number>();
  holdings.forEach(holding => {
    const sectorValue = sectorDistribution.get(holding.company.sector) || 0;
    sectorDistribution.set(
      holding.company.sector,
      sectorValue + (holding.company.price * holding.shares)
    );
  });

  // Calculate total realized gain/loss
  const totalRealized = holdingReturns.reduce((sum, holding) => sum + holding.profit, 0);

  // Determine badges
  const badges = [];
  
  // Performance badges
  if (percentageGain > 15) {
    badges.push({
      title: "Outstanding Performance",
      description: "Portfolio gained over 15% this quarter!",
      icon: <BiTrendingUp className="text-green-600" />
    });
  } else if (percentageGain > 10) {
    badges.push({
      title: "Strong Performance",
      description: "Portfolio gained over 10% this quarter",
      icon: <BiTrendingUp className="text-green-500" />
    });
  } else if (percentageGain > 5) {
    badges.push({
      title: "Steady Growth",
      description: "Portfolio gained over 5% this quarter",
      icon: <BiTrendingUp className="text-green-400" />
    });
  }

  // Diversification badge
  if (sectorDistribution.size >= 3) {
    badges.push({
      title: "Diversification Master",
      description: "Portfolio diversified across 3+ sectors",
      icon: <BiWallet className="text-blue-500" />
    });
  }

  // Individual stock performance badge
  if (topGainers.length > 0 && topGainers[0].returnPercentage > 20) {
    badges.push({
      title: "Stock Picking Pro",
      description: `${topGainers[0].company.name} gained over 20%!`,
      icon: <BiMedal className="text-yellow-500" />
    });
  }

  return {
    percentageGain,
    topGainers,
    topLosers,
    sectorDistribution,
    badges,
    totalRealized
  };
};

const QuarterlyReportModal: React.FC<QuarterlyReportModalProps> = ({
  isOpen,
  onClose,
  weekNumber,
  portfolioValueStart,
  portfolioValueEnd,
  holdings
}) => {
  const performanceData = calculatePerformanceData(holdings, portfolioValueStart, portfolioValueEnd);

  // Prepare chart data
  const sectorChartData = {
    labels: Array.from(performanceData.sectorDistribution.keys()),
    datasets: [{
      data: Array.from(performanceData.sectorDistribution.values()),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#00D8B6', '#FF8A80', '#B388FF', '#8C9EFF'
      ]
    }]
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 text-center flex items-center justify-center">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-semibold">
                  Quarterly Performance Report - Week {weekNumber}
                </Dialog.Title>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <BiX size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Overall Performance */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                    <BiDollar className="text-primary" /> Overall Performance
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-white rounded hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600">Starting Value:</span>
                      <span className="font-mono text-lg">${portfolioValueStart.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600">Ending Value:</span>
                      <span className="font-mono text-lg">${portfolioValueEnd.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600">Quarter Return:</span>
                      <span className={`font-mono text-lg flex items-center gap-1 ${performanceData.percentageGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {performanceData.percentageGain >= 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                        {performanceData.percentageGain.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded hover:bg-gray-50 transition-colors duration-200">
                      <span className="text-gray-600">Total Realized:</span>
                      <span className={`font-mono text-lg flex items-center gap-1 ${performanceData.totalRealized >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {performanceData.totalRealized >= 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                        ${Math.abs(performanceData.totalRealized).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sector Distribution */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                    <BiBarChart className="text-primary" /> Sector Distribution
                  </h3>
                  <div className="w-full h-48 relative">
                    <Pie 
                      data={sectorChartData} 
                      options={{ 
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              usePointStyle: true,
                              padding: 15,
                              font: {
                                size: 11
                              }
                            }
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context: any) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${percentage}% ($${value.toFixed(2)})`;
                              }
                            }
                          }
                        }
                      }} 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Top Gainers */}
                <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg text-green-700">
                    <BiTrendingUp className="text-green-600" /> Top Gainers
                  </h3>
                  <div className="space-y-3">
                    {performanceData.topGainers.map((gainer, idx) => (
                      <div 
                        key={gainer.company.name} 
                        className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{gainer.company.name}</span>
                          <span className="text-sm text-gray-500">{gainer.shares} shares</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-green-600 font-semibold flex items-center gap-1">
                            <BiTrendingUp />
                            +{gainer.returnPercentage.toFixed(2)}%
                          </span>
                          <span className="text-sm text-green-500">+${gainer.profit.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Losers */}
                <div className="bg-gradient-to-br from-red-50 to-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg text-red-700">
                    <BiTrendingDown className="text-red-600" /> Top Losers
                  </h3>
                  <div className="space-y-3">
                    {performanceData.topLosers.map((loser, idx) => (
                      <div 
                        key={loser.company.name} 
                        className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{loser.company.name}</span>
                          <span className="text-sm text-gray-500">{loser.shares} shares</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-red-600 font-semibold flex items-center gap-1">
                            <BiTrendingDown />
                            {loser.returnPercentage.toFixed(2)}%
                          </span>
                          <span className="text-sm text-red-500">-${loser.loss.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievement Badges */}
              {performanceData.badges.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                    <BiMedal className="text-yellow-500" /> Achievements Unlocked
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {performanceData.badges.map((badge, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 border border-gray-100"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-gray-50 rounded-full">
                            {badge.icon}
                          </div>
                          <span className="font-semibold text-gray-800">{badge.title}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QuarterlyReportModal;
