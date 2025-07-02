import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { useWatchlistData } from '@/hooks/useWatchlistData';
import { formatCurrency } from '@/utils/formatters';

const WatchlistSidebar = () => {
  const { watchlist, loading, error, addToWatchlist, removeFromWatchlist } = useWatchlistData();
  const [newSymbol, setNewSymbol] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSymbol = (e) => {
    e.preventDefault();
    if (newSymbol.trim()) {
      addToWatchlist(newSymbol.trim().toUpperCase());
      setNewSymbol('');
      setShowAddForm(false);
    }
  };

  const getTrendColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const formatChangePercent = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="p-4 h-full">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Watchlist</h2>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            size="sm"
            className="p-2"
          >
            <ApperIcon name={showAddForm ? "X" : "Plus"} size={16} />
          </Button>
        </div>

        {/* Add Symbol Form */}
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddSymbol}
            className="space-y-2"
          >
            <Input
              type="text"
              placeholder="Enter symbol (e.g., AAPL)"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              className="text-sm"
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="flex-1 text-sm">
                Add
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowAddForm(false)}
                className="flex-1 text-sm"
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Watchlist Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {error && (
          <div className="text-red-600 text-sm text-center py-4">
            Error loading watchlist
          </div>
        )}

        {watchlist.length === 0 && !error && (
          <div className="text-gray-500 text-sm text-center py-8">
            <ApperIcon name="BarChart3" size={32} className="mx-auto mb-2 opacity-50" />
            No items in watchlist
          </div>
        )}

        {watchlist.map((item) => (
          <motion.div
            key={item.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{item.symbol}</h3>
                  <p className="text-xs text-gray-500">{item.name}</p>
                </div>
                <button
                  onClick={() => removeFromWatchlist(item.Id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <ApperIcon name="X" size={14} />
                </button>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">
                  {formatCurrency(item.currentPrice)}
                </span>
                <div className={`flex items-center text-xs ${getTrendColor(item.changePercent)}`}>
                  <ApperIcon name={getTrendIcon(item.changePercent)} size={12} className="mr-1" />
                  {formatChangePercent(item.changePercent)}
                </div>
              </div>

              {/* Mini Chart */}
              <div className="h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.priceHistory}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={item.changePercent >= 0 ? "#10b981" : "#ef4444"}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistSidebar;