import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useTransactionData } from '@/hooks/useTransactionData';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Input from '@/components/atoms/Input';
import TransactionModal from '@/components/organisms/TransactionModal';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const Transactions = () => {
  const { transactions, loading, error, refetch, addTransaction, deleteTransaction } = useTransactionData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleAddTransaction = () => {
    setIsModalOpen(true);
  };

  const handleSaveTransaction = async (transactionData) => {
    try {
      await addTransaction(transactionData);
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTransaction = async (transaction) => {
    if (window.confirm(`Are you sure you want to delete this ${transaction.type} transaction for ${transaction.symbol}?`)) {
      try {
        await deleteTransaction(transaction.Id);
        toast.success('Transaction deleted successfully');
        refetch();
      } catch (error) {
        toast.error('Failed to delete transaction');
      }
    }
  };

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
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

  const getTransactionTypeColor = (type) => {
    return type === 'buy' ? 'text-success' : 'text-error';
  };

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} type="data" />;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Empty
        title="No Transactions Yet"
        description="Start recording your investment transactions to track your portfolio activity and analyze your trading patterns."
        icon="ArrowLeftRight"
        actionLabel="Add First Transaction"
        action={handleAddTransaction}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">
            Transactions
          </h1>
          <p className="text-secondary-600 mt-1">
            Track all your investment transactions and trading activity
          </p>
        </div>
        <Button
          onClick={handleAddTransaction}
          icon="Plus"
          variant="primary"
          size="lg"
        >
          Add Transaction
        </Button>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by symbol or company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon="Search"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-secondary-300 rounded-lg bg-white text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Types</option>
                <option value="buy">Buy Only</option>
                <option value="sell">Sell Only</option>
              </select>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-2 border border-secondary-300 rounded-lg bg-white text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="symbol-asc">Symbol (A-Z)</option>
                <option value="symbol-desc">Symbol (Z-A)</option>
                <option value="quantity-desc">Quantity (High-Low)</option>
                <option value="quantity-asc">Quantity (Low-High)</option>
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card padding="p-0">
          <div className="p-6 border-b border-secondary-100">
            <h3 className="text-xl font-display font-semibold text-secondary-800">
              Transaction History ({filteredTransactions.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-secondary-700">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-secondary-700">
                    Symbol
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-secondary-700">
                    Type
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-secondary-700">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-secondary-700">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-secondary-700">
                    Total Value
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-secondary-700">
                    Fees
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-secondary-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {filteredTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-secondary-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-secondary-900">
                        {format(new Date(transaction.date), 'MMM dd, yyyy')}
                      </div>
                      <div className="text-xs text-secondary-500">
                        {format(new Date(transaction.date), 'HH:mm')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-secondary-900">
                        {transaction.symbol}
                      </div>
                      <div className="text-sm text-secondary-600">
                        {transaction.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'buy' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <ApperIcon 
                          name={transaction.type === 'buy' ? 'ArrowDown' : 'ArrowUp'} 
                          size={12} 
                          className="mr-1" 
                        />
                        {transaction.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-secondary-900">
                        {transaction.quantity.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-secondary-900">
                        {formatCurrency(transaction.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`font-medium ${getTransactionTypeColor(transaction.type)}`}>
                        {formatCurrency(transaction.quantity * transaction.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-secondary-900">
                        {transaction.fees ? formatCurrency(transaction.fees) : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Trash2"
                        onClick={() => handleDeleteTransaction(transaction)}
                        className="text-secondary-600 hover:text-red-600"
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </motion.div>
  );
};

export default Transactions;