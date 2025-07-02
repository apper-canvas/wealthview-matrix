import { useState, useEffect } from 'react';
import { portfolioService } from '@/services/api/portfolioService';
import { holdingsService } from '@/services/api/holdingsService';
import { performanceService } from '@/services/api/performanceService';

export const usePortfolioData = () => {
  const [portfolioSummary, setPortfolioSummary] = useState({
    totalValue: 0,
    dayChange: 0,
    dayChangePercent: 0,
    totalReturn: 0,
    totalReturnPercent: 0
  });
  
  const [holdings, setHoldings] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      setError('');

      // Load all data in parallel
      const [holdingsData, performanceData] = await Promise.all([
        holdingsService.getAll(),
        performanceService.getAll()
      ]);

      setHoldings(holdingsData);
      setPerformanceData(performanceData);

      // Calculate portfolio summary
      const totalValue = holdingsData.reduce((sum, holding) => sum + holding.marketValue, 0);
      const totalCost = holdingsData.reduce((sum, holding) => sum + (holding.avgCost * holding.quantity), 0);
      const totalReturn = totalValue - totalCost;
      const totalReturnPercent = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;

      // Mock day change calculation (in real app, would compare with previous day)
      const dayChange = totalValue * (Math.random() * 0.04 - 0.02); // Random -2% to +2%
      const dayChangePercent = totalValue > 0 ? (dayChange / totalValue) * 100 : 0;

      setPortfolioSummary({
        totalValue,
        dayChange,
        dayChangePercent,
        totalReturn,
        totalReturnPercent
      });

    } catch (err) {
      setError('Failed to load portfolio data');
      console.error('Portfolio data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    loadPortfolioData();
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  return {
    portfolioSummary,
    holdings,
    performanceData,
    loading,
    error,
    refetch
  };
};