import { createSlice } from '@reduxjs/toolkit';

// Helper to generate initial historical data
const generateHistoricalData = (basePrice, volatility) => {
  const points = [];
  let price = basePrice;
  for (let i = 0; i < 50; i++) {
    price = price * (1 + (Math.random() - 0.5) * volatility);
    points.push(price);
  }
  return points;
};

const initialState = {
  assets: [
    {
      id: 'bitcoin',
      rank: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 93759.48,
      priceChange1h: 0.43,
      priceChange24h: 0.93,
      priceChange7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19850000,
      maxSupply: 21000000,
      historicalPrices: generateHistoricalData(93759.48, 0.02),
    },
    {
      id: 'ethereum',
      rank: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      priceChange1h: 0.60,
      priceChange24h: 3.21,
      priceChange7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120710000,
      maxSupply: null,
      historicalPrices: generateHistoricalData(1802.46, 0.025),
    },
    {
      id: 'tether',
      rank: 3,
      name: 'Tether',
      symbol: 'USDT',
      price: 1.00,
      priceChange1h: 0.00,
      priceChange24h: 0.00,
      priceChange7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145270000000,
      maxSupply: null,
      historicalPrices: generateHistoricalData(1.00, 0.001),
    },
    {
      id: 'ripple',
      rank: 4,
      name: 'XRP',
      symbol: 'XRP',
      price: 2.22,
      priceChange1h: 0.46,
      priceChange24h: 0.54,
      priceChange7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58390000000,
      maxSupply: 100000000000,
      historicalPrices: generateHistoricalData(2.22, 0.03),
    },
    {
      id: 'bnb',
      rank: 5,
      name: 'BNB',
      symbol: 'BNB',
      price: 606.65,
      priceChange1h: 0.09,
      priceChange24h: -1.20,
      priceChange7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140890000,
      maxSupply: 200000000,
      historicalPrices: generateHistoricalData(606.65, 0.015),
    },
  ],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAsset: (state, action) => {
      const { id, updates } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      if (assetIndex !== -1) {
        const updatedAsset = { ...state.assets[assetIndex] };
        
        // Process each update, handling both direct values and functions
        Object.entries(updates).forEach(([key, value]) => {
          updatedAsset[key] = typeof value === 'function' ? value(state) : value;
          
          // Update market cap when price changes
          if (key === 'price') {
            updatedAsset.marketCap = updatedAsset.price * updatedAsset.circulatingSupply;
            // Update historical prices
            updatedAsset.historicalPrices = [...updatedAsset.historicalPrices.slice(1), updatedAsset.price];
          }
        });
        
        state.assets[assetIndex] = updatedAsset;
      }
    },
  },
});

export const { updateAsset } = cryptoSlice.actions;
export default cryptoSlice.reducer; 