export const startMockWebSocket = (dispatch) => {
  const volatilityMap = {
    'bitcoin': 0.02,
    'ethereum': 0.025,
    'tether': 0.001,
    'ripple': 0.03,
    'bnb': 0.015
  };
  
  setInterval(() => {
    Object.entries(volatilityMap).forEach(([assetId, volatility]) => {
      // Generate more realistic price movements based on asset volatility
      const priceChange = (Math.random() - 0.5) * volatility;
      const volumeChange = (Math.random() - 0.5) * (volatility * 2); // Volume changes more than price

      const updates = {
        price: (prevState) => {
          const currentPrice = prevState.assets.find(a => a.id === assetId).price;
          return currentPrice * (1 + priceChange);
        },
        priceChange1h: (prevState) => {
          const asset = prevState.assets.find(a => a.id === assetId);
          return Number(asset.priceChange1h) + (Math.random() - 0.5) * volatility * 100;
        },
        priceChange24h: (prevState) => {
          const asset = prevState.assets.find(a => a.id === assetId);
          return Number(asset.priceChange24h) + (Math.random() - 0.5) * volatility * 200;
        },
        priceChange7d: (prevState) => {
          const asset = prevState.assets.find(a => a.id === assetId);
          return Number(asset.priceChange7d) + (Math.random() - 0.5) * volatility * 500;
        },
        volume24h: (prevState) => {
          const currentVolume = prevState.assets.find(a => a.id === assetId).volume24h;
          return currentVolume * (1 + volumeChange);
        },
      };
      
      dispatch({
        type: 'crypto/updateAsset',
        payload: { id: assetId, updates },
      });
    });
  }, 1500); // Update every 1.5 seconds
}; 