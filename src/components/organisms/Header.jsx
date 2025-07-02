import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Navigation from '@/components/molecules/Navigation';

const Header = ({ portfolioValue = 0, dayChange = 0, dayChangePercent = 0 }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const getTrendColor = () => {
    return dayChange >= 0 ? 'text-success' : 'text-error';
  };

  const getTrendIcon = () => {
    return dayChange >= 0 ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-surface border-b border-secondary-200 shadow-card"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="p-2 bg-gradient-primary rounded-lg">
              <ApperIcon name="PieChart" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                WealthView
              </h1>
              <p className="text-sm text-secondary-600">Investment Portfolio</p>
            </div>
          </motion.div>

          {/* Portfolio Value */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center space-x-6"
          >
            <div className="text-right">
              <p className="text-sm text-secondary-600">Total Portfolio Value</p>
              <p className="text-2xl font-display font-bold gradient-text">
                {formatCurrency(portfolioValue)}
              </p>
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              <ApperIcon name={getTrendIcon()} size={20} />
              <div className="text-right">
                <p className="font-medium">
                  {formatCurrency(Math.abs(dayChange))}
                </p>
                <p className="text-sm">
                  ({Math.abs(dayChangePercent).toFixed(2)}%)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-2"
          >
            <button className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
              <ApperIcon name="Bell" size={20} />
            </button>
            <button className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
              <ApperIcon name="Settings" size={20} />
            </button>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="pb-4">
          <Navigation />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;