import { useState, useEffect } from 'react';
import { transactionService } from '@/services/api/transactionService';

export const useTransactionData = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError('Failed to load transactions');
      console.error('Transaction data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const transaction = {
        ...transactionData,
        date: transactionData.date || new Date().toISOString(),
        totalValue: transactionData.quantity * transactionData.price
      };
      
      await transactionService.create(transaction);
    } catch (error) {
      throw new Error('Failed to add transaction');
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await transactionService.delete(transactionId);
    } catch (error) {
      throw new Error('Failed to delete transaction');
    }
  };

  const refetch = () => {
    loadTransactions();
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    refetch
  };
};