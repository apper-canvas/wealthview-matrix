import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import SearchBar from '@/components/molecules/SearchBar';

const TransactionModal = ({ isOpen, onClose, onSave, editTransaction = null }) => {
  const [formData, setFormData] = useState({
    symbol: editTransaction?.symbol || '',
    name: editTransaction?.name || '',
    type: editTransaction?.type || 'buy',
    quantity: editTransaction?.quantity || '',
    price: editTransaction?.price || '',
    date: editTransaction?.date || new Date().toISOString().split('T')[0],
    fees: editTransaction?.fees || '',
    assetClass: editTransaction?.assetClass || 'Stock'
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock stock suggestions for search
  const stockSuggestions = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.63 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.85 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3342.88 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.28 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 316.90 },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', price: 362.10 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleStockSelect = (stock) => {
    setFormData(prev => ({
      ...prev,
      symbol: stock.symbol,
      name: stock.name,
      price: stock.price.toString()
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.symbol.trim()) newErrors.symbol = 'Symbol is required';
    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (!formData.date) newErrors.date = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    
    try {
      const transactionData = {
        ...formData,
        quantity: parseFloat(formData.quantity),
        price: parseFloat(formData.price),
        fees: parseFloat(formData.fees) || 0,
        marketValue: parseFloat(formData.quantity) * parseFloat(formData.price)
      };

      await onSave(transactionData);
      toast.success(`Transaction ${editTransaction ? 'updated' : 'added'} successfully!`);
      onClose();
    } catch (error) {
      toast.error('Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      symbol: '',
      name: '',
      type: 'buy',
      quantity: '',
      price: '',
      date: new Date().toISOString().split('T')[0],
      fees: '',
      assetClass: 'Stock'
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-surface rounded-xl shadow-premium-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold gradient-text">
              {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Stock Search */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Search Stock
              </label>
              <SearchBar
                placeholder="Search by symbol or company name..."
                suggestions={stockSuggestions.filter(stock => 
                  stock.symbol.toLowerCase().includes(formData.symbol.toLowerCase()) ||
                  stock.name.toLowerCase().includes(formData.symbol.toLowerCase())
                )}
                onSuggestionSelect={handleStockSelect}
                onSearch={(query) => handleInputChange('symbol', query)}
              />
            </div>

            {/* Stock Details */}
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Symbol"
                value={formData.symbol}
                onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                placeholder="e.g., AAPL"
                error={errors.symbol}
                required
              />
              <Input
                label="Company Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Apple Inc."
                error={errors.name}
                required
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Transaction Type
              </label>
              <div className="flex space-x-4">
                {['buy', 'sell'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={formData.type === type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="sr-only"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('type', type)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        formData.type === type
                          ? 'bg-gradient-primary text-white shadow-lg'
                          : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="0"
                error={errors.quantity}
                required
                step="0.001"
                min="0"
              />
              <Input
                label="Price per Share"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
                error={errors.price}
                required
                step="0.01"
                min="0"
              />
            </div>

            {/* Date and Fees */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                error={errors.date}
                required
              />
              <Input
                label="Fees"
                type="number"
                value={formData.fees}
                onChange={(e) => handleInputChange('fees', e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            {/* Asset Class */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Asset Class
              </label>
              <select
                value={formData.assetClass}
                onChange={(e) => handleInputChange('assetClass', e.target.value)}
                className="block w-full px-4 py-3 border border-secondary-300 rounded-lg bg-white text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              >
                <option value="Stock">Stock</option>
                <option value="ETF">ETF</option>
                <option value="Bond">Bond</option>
                <option value="Crypto">Cryptocurrency</option>
                <option value="REIT">REIT</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Total Value Display */}
            {formData.quantity && formData.price && (
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Total Value:</span>
                  <span className="text-xl font-display font-bold gradient-text">
                    ${(parseFloat(formData.quantity) * parseFloat(formData.price)).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="flex-1"
              >
                {editTransaction ? 'Update' : 'Add'} Transaction
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionModal;