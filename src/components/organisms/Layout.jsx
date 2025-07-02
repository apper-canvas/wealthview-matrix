import React, { useState, useEffect } from 'react';
import Header from '@/components/organisms/Header';
import { usePortfolioData } from '@/hooks/usePortfolioData';

const Layout = ({ children }) => {
  const { portfolioSummary, loading } = usePortfolioData();

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header 
        portfolioValue={portfolioSummary?.totalValue || 0}
        dayChange={portfolioSummary?.dayChange || 0}
        dayChangePercent={portfolioSummary?.dayChangePercent || 0}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;