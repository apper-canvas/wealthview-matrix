import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import MetricCard from '@/components/molecules/MetricCard';
import AllocationChart from '@/components/organisms/AllocationChart';
import PerformanceChart from '@/components/organisms/PerformanceChart';
import HoldingsTable from '@/components/organisms/HoldingsTable';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const Dashboard = () => {
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
        title="Welcome to WealthView"
        description="Start building your investment portfolio by adding your first holding. Track performance, analyze allocation, and make informed decisions."
        icon="PieChart"
        actionLabel="Add Your First Holding"
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Portfolio Summary Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Portfolio Value"
            value={portfolioSummary.totalValue}
            prefix="$"
            icon="DollarSign"
            trend={portfolioSummary.dayChange >= 0 ? 'up' : 'down'}
            change={portfolioSummary.dayChange}
            changePercent={portfolioSummary.dayChangePercent}
          />
          <MetricCard
            title="Today's Change"
            value={Math.abs(portfolioSummary.dayChange)}
            prefix={portfolioSummary.dayChange >= 0 ? '+$' : '-$'}
            icon="TrendingUp"
            trend={portfolioSummary.dayChange >= 0 ? 'up' : 'down'}
            changePercent={portfolioSummary.dayChangePercent}
          />
          <MetricCard
            title="Total Holdings"
            value={holdings.length}
            icon="Briefcase"
            trend="neutral"
          />
          <MetricCard
            title="Total Return"
            value={Math.abs(portfolioSummary.totalReturn)}
            prefix={portfolioSummary.totalReturn >= 0 ? '+$' : '-$'}
            icon="Target"
            trend={portfolioSummary.totalReturn >= 0 ? 'up' : 'down'}
            changePercent={portfolioSummary.totalReturnPercent}
          />
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <AllocationChart holdings={holdings} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PerformanceChart performanceData={performanceData} />
        </motion.div>
      </div>

      {/* Top Holdings */}
      <motion.div variants={itemVariants}>
        <HoldingsTable 
          holdings={holdings.slice(0, 5)} 
          onEdit={(holding) => {
            // Navigate to holdings page with edit modal
            window.location.href = `/holdings?edit=${holding.Id}`;
          }}
          onDelete={(holding) => {
            // Handle delete with confirmation
            if (window.confirm(`Are you sure you want to delete ${holding.symbol}?`)) {
              // Delete logic would go here
              console.log('Delete holding:', holding);
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;