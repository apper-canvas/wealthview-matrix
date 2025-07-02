import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

const HoldingsTable = ({ holdings = [], onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState('marketValue');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getTrendColor = (value) => {
    return value >= 0 ? 'text-success' : 'text-error';
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) {
      return <ApperIcon name="ArrowUpDown" size={14} className="text-secondary-400" />;
    }
    return (
      <ApperIcon 
        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary-600" 
      />
    );
  };

  if (holdings.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="text-secondary-500">
          <ApperIcon name="Briefcase" size={48} className="mx-auto mb-4 text-secondary-300" />
          <p className="text-lg font-medium">No holdings yet</p>
          <p className="text-sm">Start building your portfolio by adding your first holding</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="p-0">
      <div className="p-6 border-b border-secondary-100">
        <h3 className="text-xl font-display font-semibold text-secondary-800">
          Holdings
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('symbol')}
                  className="flex items-center space-x-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors"
                >
                  <span>Symbol</span>
                  <SortIcon field="symbol" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors"
                >
                  <span>Name</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-4 text-right">
                <button
                  onClick={() => handleSort('quantity')}
                  className="flex items-center space-x-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors ml-auto"
                >
                  <span>Quantity</span>
                  <SortIcon field="quantity" />
                </button>
              </th>
              <th className="px-6 py-4 text-right">
                <button
                  onClick={() => handleSort('currentPrice')}
                  className="flex items-center space-x-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors ml-auto"
                >
                  <span>Price</span>
                  <SortIcon field="currentPrice" />
                </button>
              </th>
              <th className="px-6 py-4 text-right">
                <button
                  onClick={() => handleSort('marketValue')}
                  className="flex items-center space-x-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors ml-auto"
                >
                  <span>Market Value</span>
                  <SortIcon field="marketValue" />
                </button>
              </th>
              <th className="px-6 py-4 text-right">
                <button
                  onClick={() => handleSort('totalReturn')}
                  className="flex items-center space-x-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors ml-auto"
                >
                  <span>Total Return</span>
                  <SortIcon field="totalReturn" />
                </button>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-sm font-medium text-secondary-700">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            <AnimatePresence>
              {sortedHoldings.map((holding, index) => (
                <motion.tr
                  key={holding.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-secondary-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-secondary-900">
                      {holding.symbol}
                    </div>
                    <div className="text-xs text-secondary-500 uppercase">
                      {holding.assetClass}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-secondary-900">{holding.name}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-secondary-900">
                      {holding.quantity.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-secondary-900">
                      {formatCurrency(holding.currentPrice)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-medium text-secondary-900">
                      {formatCurrency(holding.marketValue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`font-medium ${getTrendColor(holding.totalReturn)}`}>
                      {formatCurrency(Math.abs(holding.totalReturn))}
                    </div>
                    <div className={`text-sm ${getTrendColor(holding.totalReturn)}`}>
                      {formatPercent((holding.totalReturn / (holding.marketValue - holding.totalReturn)) * 100)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Edit"
                        onClick={() => onEdit && onEdit(holding)}
                        className="text-secondary-600 hover:text-primary-600"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Trash2"
                        onClick={() => onDelete && onDelete(holding)}
                        className="text-secondary-600 hover:text-red-600"
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default HoldingsTable;