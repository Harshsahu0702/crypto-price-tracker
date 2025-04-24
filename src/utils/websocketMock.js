export const startMockWebSocket = (dispatch) => {
  const assets = ['bitcoin', 'ethereum', 'tether', 'ripple', 'bnb'];
  
  setInterval(() => {
    assets.forEach((assetId) => {
      // Generate more realistic price movements
      const priceChange = (Math.random() - 0.5) * 0.001; // 0.1% max change
      const volumeChange = (Math.random() - 0.5) * 0.02; // 2% max change

      const updates = {
        price: (prevState) => {
          const currentPrice = prevState.assets.find(a => a.id === assetId).price;
          return currentPrice * (1 + priceChange);
        },
        priceChange1h: (Math.random() * 2 - 1).toFixed(2), // -1% to +1%
        priceChange24h: (Math.random() * 4 - 2).toFixed(2), // -2% to +2%
        priceChange7d: (Math.random() * 10 - 5).toFixed(2), // -5% to +5%
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