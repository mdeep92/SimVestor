import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiNews, BiTime } from 'react-icons/bi';

interface NewsViewProps {
  newsHistory: string[];
  week: number;
}

const NewsView: React.FC<NewsViewProps> = ({ newsHistory, week }) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="news-header"
      >
        <div className="news-title">
          <BiNews />
          <h2>News Feed</h2>
        </div>
        <div className="current-week">
          <BiTime />
          <span>Current Week: {week}</span>
        </div>
      </motion.div>

      <div className="news-container">
        <AnimatePresence>
          {newsHistory.map((news, index) => (
            <motion.div
              key={`${week - (newsHistory.length - index)}-${news}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="news-item"
            >
              <div className="news-item-header">
                <span className="news-week">
                  Week {week - (newsHistory.length - index)}
                </span>
                <div className="news-impact-indicator" />
              </div>
              <p className="news-headline">{news}</p>
            </motion.div>
          )).reverse()}
          
          {newsHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="news-item empty"
            >
              <BiNews size={48} className="empty-icon" />
              <p>No news yet. Advance the week to see market updates!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NewsView;
