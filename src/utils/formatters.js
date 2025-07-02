// Utility functions for formatting data in the application

export const formatCurrency = (value, options = {}) => {
  const defaultOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(value);
};

export const formatPercent = (value, options = {}) => {
  const defaultOptions = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(value / 100);
};

export const formatNumber = (value, options = {}) => {
  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(value);
};

export const formatCompactNumber = (value) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
};

export const formatDate = (date, format = 'short') => {
  const dateObj = new Date(date);
  
  const formats = {
    full: { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    },
    short: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    },
    minimal: { 
      month: 'short', 
      day: 'numeric' 
    }
  };

  return new Intl.DateTimeFormat('en-US', formats[format] || formats.short).format(dateObj);
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = now - targetDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  
  return `${Math.floor(diffInDays / 365)} years ago`;
};

export const getTrendColor = (value, type = 'default') => {
  const colorSets = {
    default: {
      positive: 'text-success',
      negative: 'text-error',
      neutral: 'text-secondary-600'
    },
    background: {
      positive: 'bg-green-100 text-green-800',
      negative: 'bg-red-100 text-red-800',
      neutral: 'bg-secondary-100 text-secondary-800'
    }
  };

  const colors = colorSets[type] || colorSets.default;
  
  if (value > 0) return colors.positive;
  if (value < 0) return colors.negative;
  return colors.neutral;
};

export const getTrendIcon = (value) => {
  if (value > 0) return 'TrendingUp';
  if (value < 0) return 'TrendingDown';
  return 'Minus';
};