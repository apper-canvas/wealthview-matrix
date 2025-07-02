import performanceData from '@/services/mockData/performance.json';

// Performance service for managing portfolio performance data
export const performanceService = {
  // Get all performance data
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...performanceData].sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  // Get performance data by date range
  async getByDateRange(startDate, endDate) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return performanceData.filter(p => {
      const date = new Date(p.date);
      return date >= start && date <= end;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  // Add new performance data point
  async create(performancePoint) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newPoint = {
      Id: Math.max(...performanceData.map(p => p.Id)) + 1,
      ...performancePoint
    };
    
    performanceData.push(newPoint);
    return { ...newPoint };
  }
};