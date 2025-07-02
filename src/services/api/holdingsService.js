import holdingsData from '@/services/mockData/holdings.json';

// Holdings service for managing individual holdings
export const holdingsService = {
  // Get all holdings
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...holdingsData];
  },

  // Get holding by ID
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const holding = holdingsData.find(h => h.Id === parseInt(id));
    if (!holding) {
      throw new Error('Holding not found');
    }
    return { ...holding };
  },

  // Create new holding
  async create(holdingData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newHolding = {
      Id: Math.max(...holdingsData.map(h => h.Id)) + 1,
      ...holdingData,
      dayChange: Math.random() * 200 - 100, // Random day change for demo
      totalReturn: 0 // New holdings start with 0 return
    };
    
    holdingsData.push(newHolding);
    return { ...newHolding };
  },

  // Update existing holding
  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = holdingsData.findIndex(h => h.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Holding not found');
    }
    
    holdingsData[index] = { ...holdingsData[index], ...updateData };
    return { ...holdingsData[index] };
  },

  // Delete holding
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = holdingsData.findIndex(h => h.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Holding not found');
    }
    
    const deleted = holdingsData.splice(index, 1)[0];
    return { ...deleted };
  }
};