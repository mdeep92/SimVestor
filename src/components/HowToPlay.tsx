import React from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { BiDollar, BiNews, BiTrendingUp, BiWallet, BiLineChart, BiRightArrowAlt } from 'react-icons/bi';

interface HowToPlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlay: React.FC<HowToPlayProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-lg p-8 max-w-2xl w-full mx-4 shadow-xl"
        >
          <Dialog.Title className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BiDollar className="text-primary" />
            Welcome to Simvestor!
          </Dialog.Title>

          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <BiTrendingUp />
                Game Overview
              </h3>
              <p>
                Simvestor is a stock market simulation game where you can practice investing
                without risking real money. Start with $1,000 and build your portfolio
                by buying and selling stocks across different sectors.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <BiNews />
                Game Mechanics
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>The game progresses week by week</li>
                <li>Each week brings new market news that affects stock prices</li>
                <li>News can impact specific sectors or the entire market</li>
                <li>Stock prices change based on news and market volatility</li>
                <li>Track your portfolio's performance and returns over time</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <BiWallet />
                Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Market View <BiTrendingUp className="inline" /></h4>
                  <p>Browse and buy stocks from different sectors</p>
                </div>
                <div>
                  <h4 className="font-semibold">News Feed <BiNews className="inline" /></h4>
                  <p>Stay updated with market news and their impacts</p>
                </div>
                <div>
                  <h4 className="font-semibold">Portfolio <BiWallet className="inline" /></h4>
                  <p>Manage your holdings and track investments</p>
                </div>
                <div>
                  <h4 className="font-semibold">Returns <BiLineChart className="inline" /></h4>
                  <p>Analyze your performance with charts and metrics</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <BiRightArrowAlt />
                Getting Started
              </h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Visit the Market tab to view available stocks</li>
                <li>Use your initial $1,000 to buy your first stocks</li>
                <li>Monitor news events that might affect your investments</li>
                <li>Track your portfolio's performance in the Returns tab</li>
                <li>Buy low and sell high to maximize your returns!</li>
              </ol>
            </section>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
            >
              Let's Start Investing!
            </button>
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
};

export default HowToPlay;
