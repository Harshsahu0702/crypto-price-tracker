import React from 'react';

const CryptoRow = ({ asset }) => {
  const formatNumber = (num) => {
    if (num === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPercentage = (num) => {
    return `${num > 0 ? '+' : ''}${Number(num).toFixed(2)}%`;
  };

  const formatLargeNumber = (num) => {
    if (num === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      notation: 'standard',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatSupply = (supply, symbol) => {
    return `${new Intl.NumberFormat('en-US', {
      notation: 'standard',
      maximumFractionDigits: 2,
    }).format(supply)} ${symbol}`;
  };

  const generateChartPath = (prices) => {
    if (!prices || prices.length === 0) return '';

    const width = 160;
    const height = 60;
    const padding = 5;

    // Find min and max for scaling
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Scale points to fit the chart
    const xStep = (width - 2 * padding) / (prices.length - 1);
    const scaleY = (height - 2 * padding) / priceRange;

    // Generate path
    return prices.reduce((path, price, i) => {
      const x = padding + i * xStep;
      const y = height - padding - (price - minPrice) * scaleY;
      return path + `${i === 0 ? 'M' : 'L'} ${x},${y} `;
    }, '');
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-4 text-sm">{asset.rank}</td>
      <td className="px-4 py-4">
        <div className="flex items-center">
          <img
            src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
            alt={`${asset.name} logo`}
            className="w-8 h-8 mr-3"
            onError={(e) => {
              e.target.src = `https://coinicons-api.vercel.app/api/icon/${asset.symbol.toLowerCase()}`;
            }}
          />
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-sm text-gray-500">{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-right">{formatNumber(asset.price)}</td>
      <td className={`px-4 py-4 text-right ${asset.priceChange1h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatPercentage(asset.priceChange1h)}
      </td>
      <td className={`px-4 py-4 text-right ${asset.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatPercentage(asset.priceChange24h)}
      </td>
      <td className={`px-4 py-4 text-right ${asset.priceChange7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatPercentage(asset.priceChange7d)}
      </td>
      <td className="px-4 py-4 text-right">${formatLargeNumber(asset.marketCap)}</td>
      <td className="px-4 py-4 text-right">
        <div>${formatLargeNumber(asset.volume24h)}</div>
        <div className="text-sm text-gray-500">{formatLargeNumber(asset.volume24h / asset.price)} {asset.symbol}</div>
      </td>
      <td className="px-4 py-4 text-right">
        {formatSupply(asset.circulatingSupply, asset.symbol)}
      </td>
      <td className="px-4 py-4">
        <div className="w-[160px] h-[60px]">
          <svg viewBox="0 0 160 60" className="w-full h-full">
            <path
              d={generateChartPath(asset.historicalPrices)}
              fill="none"
              stroke={asset.priceChange7d >= 0 ? "#22c55e" : "#ef4444"}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </td>
    </tr>
  );
};

export default CryptoRow; 