import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Navigation = ({ className = '' }) => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'BarChart3' },
    { path: '/holdings', label: 'Holdings', icon: 'Briefcase' },
    { path: '/performance', label: 'Performance', icon: 'TrendingUp' },
    { path: '/transactions', label: 'Transactions', icon: 'ArrowLeftRight' }
  ];

  return (
    <nav className={className}>
      <div className="flex space-x-1">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                }`
              }
            >
              <ApperIcon name={item.icon} size={18} />
              <span className="hidden sm:block">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;