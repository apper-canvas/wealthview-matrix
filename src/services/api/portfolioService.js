// Portfolio service for managing portfolio-level operations
export const portfolioService = {
  // Get portfolio summary
  async getSummary() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would calculate from actual holdings data
    return {
      totalValue: 125000.00,
      dayChange: 2500.00,
      dayChangePercent: 2.04,
      totalReturn: 15000.00,
      totalReturnPercent: 13.64
    };
  },

  // Get portfolio allocation
  async getAllocation() {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    return [
      { name: 'Stocks', value: 75000, percentage: 60 },
      { name: 'ETFs', value: 30000, percentage: 24 },
      { name: 'Bonds', value: 15000, percentage: 12 },
      { name: 'REITs', value: 5000, percentage: 4 }
    ];
  }
};