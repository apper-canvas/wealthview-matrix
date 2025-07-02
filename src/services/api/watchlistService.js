import mockWatchlistData from "@/services/mockData/watchlist.json";
import React from "react";
import Error from "@/components/ui/Error";

let watchlistData = [...mockWatchlistData];
let nextId = Math.max(...watchlistData.map(item => item.Id)) + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generatePriceHistory = (basePrice) => {
  const history = [];
  let price = basePrice;
  
  for (let i = 0; i < 20; i++) {
    const change = (Math.random() - 0.5) * 0.02; // ±1% change
    price = price * (1 + change);
    history.push({ price: parseFloat(price.toFixed(2)) });
  }
  
  return history;
};

const simulatePriceUpdate = (item) => {
  const change = (Math.random() - 0.5) * 0.03; // ±1.5% change
  const newPrice = item.currentPrice * (1 + change);
  const changePercent = ((newPrice - item.currentPrice) / item.currentPrice) * 100;
  
  // Update price history
  const newHistory = [...item.priceHistory.slice(1), { price: newPrice }];
  
  return {
    ...item,
    currentPrice: parseFloat(newPrice.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    priceHistory: newHistory
  };
};

export const getAll = async () => {
  await delay(300);
  return [...watchlistData];
};

export const getById = async (id) => {
  await delay(200);
  const item = watchlistData.find(item => item.Id === parseInt(id));
  return item ? { ...item } : null;
};

export const create = async (itemData) => {
  await delay(400);
  
  const basePrice = 50 + Math.random() * 200; // Random price between $50-$250
  const newItem = {
    Id: nextId++,
    symbol: itemData.symbol,
    name: `${itemData.symbol} Inc.`,
    currentPrice: parseFloat(basePrice.toFixed(2)),
    changePercent: (Math.random() - 0.5) * 10, // ±5% initial change
    priceHistory: generatePriceHistory(basePrice)
  };
  
  watchlistData.push(newItem);
  return { ...newItem };
};

export const remove = async (id) => {
  await delay(250);
  const index = watchlistData.findIndex(item => item.Id === parseInt(id));
  if (index === -1) {
    throw new Error('Item not found');
  }
  watchlistData.splice(index, 1);
  return true;
};

export const updatePrices = async () => {
  await delay(100);
  watchlistData = watchlistData.map(simulatePriceUpdate);
  return [...watchlistData];
};