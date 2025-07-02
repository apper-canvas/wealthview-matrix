import React, { useState, useEffect } from 'react';
import Header from '@/components/organisms/Header';
import WatchlistSidebar from '@/components/organisms/WatchlistSidebar';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import ApperIcon from '@/components/ApperIcon';

const Layout = ({ children }) => {
  const { portfolioSummary, loading } = usePortfolioData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header 
        portfolioValue={portfolioSummary?.totalValue || 0}
        dayChange={portfolioSummary?.dayChange || 0}
        dayChangePercent={portfolioSummary?.dayChangePercent || 0}
      />
      
      <div className="flex">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-20 left-4 z-50 bg-white p-2 rounded-lg shadow-lg border"
        >
          <ApperIcon name={sidebarOpen ? "X" : "BarChart3"} size={20} />
        </button>

        {/* Sidebar */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-40 
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          bg-white border-r border-gray-200 lg:w-80 w-72
          mt-16 lg:mt-16
        `}>
          <WatchlistSidebar />
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50 mt-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:pl-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;