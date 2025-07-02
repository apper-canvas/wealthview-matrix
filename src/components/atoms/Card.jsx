import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  gradient = false,
  padding = 'p-6',
  ...props
}) => {
  const baseClasses = `bg-gradient-surface rounded-xl shadow-card transition-all duration-200 ${padding}`;
  const hoverClasses = hover ? 'hover:shadow-card-hover transform hover:scale-[1.02]' : '';
  const gradientClasses = gradient ? 'bg-gradient-primary text-white' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02 } : {}}
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;