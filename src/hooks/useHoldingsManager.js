import { useState } from 'react';
import { holdingsService } from '@/services/api/holdingsService';

export const useHoldingsManager = () => {
  const [loading, setLoading] = useState(false);

  const addHolding = async (holdingData) => {
    setLoading(true);
    try {
      // Transform transaction data to holding format
      const holding = {
        symbol: holdingData.symbol,
        name: holdingData.name,
        quantity: holdingData.quantity,
        avgCost: holdingData.price,
        currentPrice: holdingData.price, // In real app, would fetch current price
        marketValue: holdingData.quantity * holdingData.price,
        dayChange: 0, // Would calculate from market data
        totalReturn: 0, // Initial investment has no return yet
        assetClass: holdingData.assetClass
      };

      await holdingsService.create(holding);
    } catch (error) {
      throw new Error('Failed to add holding');
    } finally {
      setLoading(false);
    }
  };

  const updateHolding = async (holdingId, holdingData) => {
    setLoading(true);
    try {
      const updatedHolding = {
        symbol: holdingData.symbol,
        name: holdingData.name,
        quantity: holdingData.quantity,
        avgCost: holdingData.price,
        currentPrice: holdingData.price,
        marketValue: holdingData.quantity * holdingData.price,
        assetClass: holdingData.assetClass
      };

      await holdingsService.update(holdingId, updatedHolding);
    } catch (error) {
      throw new Error('Failed to update holding');
    } finally {
      setLoading(false);
    }
  };

  const deleteHolding = async (holdingId) => {
    setLoading(true);
    try {
      await holdingsService.delete(holdingId);
    } catch (error) {
      throw new Error('Failed to delete holding');
    } finally {
      setLoading(false);
    }
  };

  return {
    addHolding,
    updateHolding,
    deleteHolding,
    loading
  };
};