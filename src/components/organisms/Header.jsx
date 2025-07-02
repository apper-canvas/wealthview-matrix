import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Navigation from '@/components/molecules/Navigation';

const Header = ({ portfolioValue = 0, dayChange = 0, dayChangePercent = 0 }) => {
  const navigate = useNavigate();
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

  const handleNotifications = () => {
    navigate('/notifications');
    toast.info('Opening notifications...');
  };

  const handleSettings = () => {
    navigate('/settings');
    toast.info('Opening settings...');
  };
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
className="bg-gradient-surface border-b border-secondary-200 shadow-premium sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4 min-w-0 flex-shrink-0"
          >
            <div className="p-3 bg-gradient-primary rounded-xl shadow-lg">
              <ApperIcon name="PieChart" size={28} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl font-display font-bold gradient-text leading-tight">
                WealthView
              </h1>
              <p className="text-sm text-secondary-600 font-medium">Investment Portfolio</p>
            </div>
          </motion.div>

          {/* Portfolio Value */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden sm:flex items-center space-x-8 flex-1 justify-center max-w-lg mx-8"
          >
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-secondary-100 shadow-card">
              <p className="text-sm text-secondary-600 font-medium mb-1">Total Portfolio Value</p>
              <p className="text-3xl font-display font-bold gradient-text leading-tight">
                {formatCurrency(portfolioValue)}
              </p>
            </div>
            <div className={`flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-secondary-100 shadow-card ${getTrendColor()}`}>
              <ApperIcon name={getTrendIcon()} size={24} />
              <div className="text-center">
                <p className="font-bold text-lg leading-tight">
                  {formatCurrency(Math.abs(dayChange))}
                </p>
                <p className="text-sm font-medium">
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
className="flex items-center space-x-3 flex-shrink-0"
          >
            <button 
              onClick={handleNotifications}
              className="p-3 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 shadow-card hover:shadow-card-hover border border-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Open notifications"
            >
              <ApperIcon name="Bell" size={22} />
            </button>
            <button 
              onClick={handleSettings}
              className="p-3 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 shadow-card hover:shadow-card-hover border border-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Open settings"
            >
              <ApperIcon name="Settings" size={22} />
            </button>
          </motion.div>
        </div>

        {/* Mobile Portfolio Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="sm:hidden pb-4 border-t border-secondary-100 pt-4"
        >
          <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-secondary-100 shadow-card">
            <div>
              <p className="text-xs text-secondary-600 font-medium">Portfolio Value</p>
              <p className="text-xl font-display font-bold gradient-text">
                {formatCurrency(portfolioValue)}
              </p>
            </div>
            <div className={`flex items-center space-x-2 ${getTrendColor()}`}>
              <ApperIcon name={getTrendIcon()} size={20} />
              <div className="text-right">
                <p className="font-bold text-sm">
                  {formatCurrency(Math.abs(dayChange))}
                </p>
                <p className="text-xs">
                  ({Math.abs(dayChangePercent).toFixed(2)}%)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="pb-6">
          <Navigation />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;