import transactionsData from '@/services/mockData/transactions.json';

// Transaction service for managing transaction history
export const transactionService = {
  // Get all transactions
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 350));
    return [...transactionsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  // Get transaction by ID
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const transaction = transactionsData.find(t => t.Id === parseInt(id));
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return { ...transaction };
  },

  // Create new transaction
  async create(transactionData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newTransaction = {
      Id: Math.max(...transactionsData.map(t => t.Id)) + 1,
      ...transactionData,
      date: transactionData.date || new Date().toISOString()
    };
    
    transactionsData.push(newTransaction);
    return { ...newTransaction };
  },

  // Update existing transaction
  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = transactionsData.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Transaction not found');
    }
    
    transactionsData[index] = { ...transactionsData[index], ...updateData };
    return { ...transactionsData[index] };
  },

  // Delete transaction
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = transactionsData.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Transaction not found');
    }
    
    const deleted = transactionsData.splice(index, 1)[0];
    return { ...deleted };
  },

  // Get transactions by holding
  async getByHolding(holdingId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return transactionsData.filter(t => t.holdingId === holdingId);
  }
};