import { useState, useEffect } from 'react';
import * as watchlistService from '@/services/api/watchlistService';
import { toast } from 'react-toastify';

export const useWatchlistData = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const data = await watchlistService.getAll();
      setWatchlist(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load watchlist');
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async (symbol) => {
    try {
      const newItem = await watchlistService.create({ symbol });
      setWatchlist(prev => [...prev, newItem]);
      toast.success(`${symbol} added to watchlist`);
    } catch (err) {
      toast.error('Failed to add to watchlist');
    }
  };

  const removeFromWatchlist = async (id) => {
    try {
      await watchlistService.delete(id);
      setWatchlist(prev => prev.filter(item => item.Id !== id));
      toast.success('Removed from watchlist');
    } catch (err) {
      toast.error('Failed to remove from watchlist');
    }
  };

  useEffect(() => {
    fetchWatchlist();
    
    // Real-time price updates every 30 seconds
    const interval = setInterval(() => {
      watchlistService.updatePrices().then(updatedData => {
        setWatchlist(updatedData);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    watchlist,
    loading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    refetch: fetchWatchlist
  };
};