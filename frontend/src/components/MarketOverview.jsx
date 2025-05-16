import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';

const MarketOverview = ({ marketData }) => {
  const { marketCap, volume24h, liquidity, marketCapChange24h } = marketData;
  
  const formatNumber = (num) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`;
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FiDollarSign className="text-primary text-xl mr-2" />
            <span className="text-gray-500 font-medium">Market Cap</span>
          </div>
          <div className="text-2xl font-bold">{formatNumber(marketCap)}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FiDollarSign className="text-primary text-xl mr-2" />
            <span className="text-gray-500 font-medium">24h Volume</span>
          </div>
          <div className="text-2xl font-bold">{formatNumber(volume24h)}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FiDollarSign className="text-primary text-xl mr-2" />
            <span className="text-gray-500 font-medium">Liquidity</span>
          </div>
          <div className="text-2xl font-bold">{formatNumber(liquidity)}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            {marketCapChange24h >= 0 ? (
              <FiTrendingUp className="text-positive text-xl mr-2" />
            ) : (
              <FiTrendingDown className="text-negative text-xl mr-2" />
            )}
            <span className="text-gray-500 font-medium">24h Change</span>
          </div>
          <div className={`text-2xl font-bold ${marketCapChange24h >= 0 ? 'text-positive' : 'text-negative'}`}>
            {marketCapChange24h >= 0 ? '+' : ''}{marketCapChange24h.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
