import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';

const MetricCard = ({
  title,
  value,
  change,
  changePercent,
  icon,
  trend = 'neutral',
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-secondary-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const formatValue = (val) => {
    if (typeof val === 'number') {
      return val.toLocaleString('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      });
    }
    return val;
  };

  return (
    <Card className={`border border-gray-100 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600 mb-1">{title}</p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex items-baseline space-x-1"
          >
            <span className="text-3xl font-display font-bold gradient-text">
              {prefix}{formatValue(value)}{suffix}
            </span>
          </motion.div>
          
          {(change !== undefined || changePercent !== undefined) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex items-center space-x-1 mt-2 ${getTrendColor()}`}
            >
              <ApperIcon name={getTrendIcon()} size={16} />
              <span className="text-sm font-medium">
                {change && `${prefix}${formatValue(Math.abs(change))}${suffix}`}
                {changePercent && ` (${Math.abs(changePercent).toFixed(2)}%)`}
              </span>
            </motion.div>
          )}
        </div>
        
        {icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="p-3 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg"
          >
            <ApperIcon name={icon} size={24} className="text-primary-600" />
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;