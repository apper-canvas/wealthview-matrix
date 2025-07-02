import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-primary text-white shadow-lg hover:shadow-xl focus:ring-primary-500 disabled:opacity-50',
    secondary: 'bg-white text-primary-600 border border-primary-200 shadow-card hover:shadow-card-hover focus:ring-primary-500 disabled:opacity-50',
    accent: 'bg-gradient-accent text-white shadow-lg hover:shadow-xl focus:ring-accent-500 disabled:opacity-50',
    ghost: 'text-secondary-600 hover:bg-secondary-100 focus:ring-secondary-500 disabled:opacity-50',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl focus:ring-red-500 disabled:opacity-50'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm space-x-1',
    md: 'px-6 py-3 text-base space-x-2',
    lg: 'px-8 py-4 text-lg space-x-3'
  };
  
  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={iconSizes[size]} 
          className="animate-spin" 
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={iconSizes[size]} />
      )}
      
      {children && <span>{children}</span>}
      
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={iconSizes[size]} />
      )}
    </motion.button>
  );
};

export default Button;