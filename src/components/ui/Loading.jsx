import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = ({ className = "" }) => (
  <motion.div
    className={`bg-gradient-surface rounded-xl p-6 shadow-card ${className}`}
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
  >
    <div className="animate-pulse">
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3 mb-3"></div>
      <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
    </div>
  </motion.div>
);

const SkeletonTable = () => (
  <motion.div
    className="bg-gradient-surface rounded-xl shadow-card overflow-hidden"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
  >
    <div className="p-6 border-b border-gray-100">
      <div className="animate-pulse">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4">
          <div className="animate-pulse flex space-x-4">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/6"></div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const SkeletonChart = () => (
  <motion.div
    className="bg-gradient-surface rounded-xl p-6 shadow-card"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
  >
    <div className="animate-pulse">
      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3 mb-6"></div>
      <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-end justify-center">
        <div className="text-gray-400 font-medium">Loading Chart...</div>
      </div>
    </div>
  </motion.div>
);

const Loading = ({ type = "default", className = "" }) => {
  const variants = {
    default: (
      <div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonTable />
        </div>
      </div>
    ),
    table: <SkeletonTable />,
    chart: <SkeletonChart />,
    cards: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {variants[type] || variants.default}
    </motion.div>
  );
};

export default Loading;