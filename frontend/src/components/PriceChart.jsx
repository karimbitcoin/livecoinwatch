import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const PriceChart = ({ coinId, coinName, priceData }) => {
  const [timeFrame, setTimeFrame] = useState('7d');
  
  // Filter data based on selected time frame
  const getFilteredData = () => {
    switch (timeFrame) {
      case '24h':
        return priceData.slice(-24);
      case '7d':
        return priceData.slice(-168); // 24 * 7
      case '30d':
        return priceData.slice(-720); // 24 * 30
      case 'max':
        return priceData;
      default:
        return priceData.slice(-168);
    }
  };

  const filteredData = getFilteredData();
  
  // Calculate if price trend is positive or negative
  const isPositive = filteredData.length > 1 && 
    filteredData[filteredData.length - 1].price > filteredData[0].price;
  
  // Calculate percentage change
  const startPrice = filteredData.length > 0 ? filteredData[0].price : 0;
  const endPrice = filteredData.length > 0 ? filteredData[filteredData.length - 1].price : 0;
  const percentChange = startPrice > 0 
    ? ((endPrice - startPrice) / startPrice) * 100 
    : 0;

  // Format time based on timeframe
  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    if (timeFrame === '24h') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeFrame === '7d') {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Format tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{new Date(payload[0].payload.timestamp).toLocaleString()}</p>
          <p className="text-primary font-bold">
            ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{coinName} Price Chart</h2>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold mr-2">
              ${endPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`text-sm font-medium ${isPositive ? 'text-positive' : 'text-negative'}`}>
              {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeFrame('24h')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === '24h' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            24h
          </button>
          <button 
            onClick={() => setTimeFrame('7d')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === '7d' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            7d
          </button>
          <button 
            onClick={() => setTimeFrame('30d')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === '30d' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            30d
          </button>
          <button 
            onClick={() => setTimeFrame('max')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === 'max' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id={`gradientFill-${coinId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0.3} />
                <stop offset="75%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatXAxis}
              minTickGap={30}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={['dataMin - 100', 'dataMax + 100']}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={isPositive ? '#22c55e' : '#ef4444'} 
              fill={`url(#gradientFill-${coinId})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
