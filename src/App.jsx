import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CryptoTable from './components/CryptoTable';
import { startMockWebSocket } from './utils/websocketMock';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    startMockWebSocket(dispatch);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="bg-white">
          <h1 className="text-2xl font-bold mb-8">Cryptocurrency Prices by Market Cap</h1>
          <CryptoTable />
        </div>
      </div>
    </div>
  );
}

export default App; 