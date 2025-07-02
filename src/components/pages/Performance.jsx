import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import MetricCard from '@/components/molecules/MetricCard';
import PerformanceChart from '@/components/organisms/PerformanceChart';
import AllocationChart from '@/components/organisms/AllocationChart';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const Performance = () => {
  const { 
    portfolioSummary, 
    holdings, 
    performanceData, 
    loading, 
    error, 
    refetch 
  } = usePortfolioData();

  if (loading) {
    return <Loading type="default" />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} type="data" />;
  }

  if (!holdings || holdings.length === 0) {
    return (
      <Empty
        title="No Performance Data"
        description="Add holdings to your portfolio to start tracking performance metrics and visualizing your investment growth over time."
        icon="TrendingUp"
        actionLabel="Add Holdings"
        action={() => window.location.href = '/holdings'}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Calculate additional performance metrics
  const bestPerformer = holdings.reduce((best, holding) => 
    holding.totalReturn > best.totalReturn ? holding : best
  );

  const worstPerformer = holdings.reduce((worst, holding) => 
    holding.totalReturn < worst.totalReturn ? holding : worst
  );

  const avgReturn = holdings.reduce((sum, holding) => sum + holding.totalReturn, 0) / holdings.length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold gradient-text mb-2">
          Performance Analysis
        </h1>
        <p className="text-secondary-600">
          Track your portfolio's performance and analyze investment returns
        </p>
      </motion.div>

      {/* Key Performance Metrics */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Return"
            value={Math.abs(portfolioSummary.totalReturn)}
            prefix={portfolioSummary.totalReturn >= 0 ? '+$' : '-$'}
            icon="Target"
            trend={portfolioSummary.totalReturn >= 0 ? 'up' : 'down'}
            changePercent={portfolioSummary.totalReturnPercent}
          />
          <MetricCard
            title="Best Performer"
            value={Math.abs(bestPerformer.totalReturn)}
            prefix={bestPerformer.totalReturn >= 0 ? '+$' : '-$'}
            icon="Award"
            trend={bestPerformer.totalReturn >= 0 ? 'up' : 'down'}
          />
          <MetricCard
            title="Worst Performer"
            value={Math.abs(worstPerformer.totalReturn)}
            prefix={worstPerformer.totalReturn >= 0 ? '+$' : '-$'}
            icon="AlertTriangle"
            trend={worstPerformer.totalReturn >= 0 ? 'up' : 'down'}
          />
          <MetricCard
            title="Average Return"
            value={Math.abs(avgReturn)}
            prefix={avgReturn >= 0 ? '+$' : '-$'}
            icon="BarChart"
            trend={avgReturn >= 0 ? 'up' : 'down'}
          />
        </div>
      </motion.div>

      {/* Performance Chart */}
      <motion.div variants={itemVariants}>
        <PerformanceChart performanceData={performanceData} />
      </motion.div>

      {/* Allocation and Holdings Performance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <AllocationChart holdings={holdings} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-gradient-surface rounded-xl shadow-card p-6">
            <h3 className="text-xl font-display font-semibold text-secondary-800 mb-6">
              Top Performers
            </h3>
            <div className="space-y-4">
              {holdings
                .sort((a, b) => b.totalReturn - a.totalReturn)
                .slice(0, 5)
                .map((holding, index) => {
                  const returnPercent = (holding.totalReturn / (holding.marketValue - holding.totalReturn)) * 100;
                  return (
                    <motion.div
                      key={holding.Id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-secondary-100 hover:shadow-md transition-shadow"
                    >
                      <div>
                        <p className="font-medium text-secondary-900">
                          {holding.symbol}
                        </p>
                        <p className="text-sm text-secondary-600">
                          {holding.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          holding.totalReturn >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          {holding.totalReturn >= 0 ? '+' : ''}
                          ${Math.abs(holding.totalReturn).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                        <p className={`text-sm ${
                          returnPercent >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}%
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Performance;