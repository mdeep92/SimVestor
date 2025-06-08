import React from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
// Removed unused imports

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
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl">
          <Dialog.Title className="text-3xl font-bold mb-6">
            Welcome to Simvestor!
          </Dialog.Title>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Game Overview</h3>
            <p className="text-gray-600 mb-6">
              Simvestor is a stock market simulation game where you can practice investing
              without risking real money. Start with $10,000 and build your portfolio!
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Features:</h3>
              <ul className="space-y-3">
                <li className="text-blue-600">Market View: Browse and buy stocks from different sectors</li>
                <li className="text-blue-600">Stock Screener: Filter stocks by various metrics</li>
                <li className="text-blue-600">News Feed: Stay updated with market events</li>
                <li className="text-blue-600">Portfolio Management: Track your investments</li>
                <li className="text-blue-600">Returns Analysis: Monitor your performance</li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Getting Started:</h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                <li>Visit the Market tab to view available stocks</li>
                <li>Use your initial $10,000 to buy your first stocks</li>
                <li>Monitor news events that might affect your investments</li>
                <li>Track your portfolio's performance in the Returns tab</li>
                <li>Buy low and sell high to maximize your returns!</li>
              </ol>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <motion.button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Start Investing!
            </motion.button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HowToPlay;
