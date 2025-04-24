import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../features/crypto/selectors';
import CryptoRow from './CryptoRow';

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm text-gray-500">#</th>
            <th className="px-4 py-3 text-left text-sm text-gray-500">Name</th>
            <th className="px-4 py-3 text-right text-sm text-gray-500">Price</th>
            <th className="px-4 py-3 text-right text-sm text-gray-500">1h %</th>
            <th className="px-4 py-3 text-right text-sm text-gray-500">24h %</th>
            <th className="px-4 py-3 text-right text-sm text-gray-500">7d %</th>
            <th className="px-4 py-3 text-right text-sm text-gray-500">Market Cap</th>
            <th className="px-4 py-3 text-right text-sm text-gray-500">Volume(24h)</th>
            <th className="px-4 py-3 text-right text-sm text-gray-500">Circulating Supply</th>
            <th className="px-4 py-3 text-right text-sm text-gray-500">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <CryptoRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable; 