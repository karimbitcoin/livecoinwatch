import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiDollarSign, FiPercent } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { topCoins } from '../data/mockData';

// Initial portfolio data
const initialPortfolio = [
  {
    id: '1',
    coin: 'bitcoin',
    amount: 0.5,
    buyPrice: 45000,
    buyDate: '2023-01-15'
  },
  {
    id: '2',
    coin: 'ethereum',
    amount: 3.2,
    buyPrice: 3000,
    buyDate: '2023-02-20'
  },
  {
    id: '3',
    coin: 'binancecoin',
    amount: 12,
    buyPrice: 420,
    buyDate: '2023-03-05'
  },
];

const PortfolioPage = () => {
  const [holdings, setHoldings] = useState(initialPortfolio);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentHolding, setCurrentHolding] = useState(null);
  const [newHolding, setNewHolding] = useState({
    coin: '',
    amount: '',
    buyPrice: '',
    buyDate: new Date().toISOString().substring(0, 10)
  });

  // Calculate portfolio stats
  const calculatePortfolioStats = () => {
    let totalValue = 0;
    let totalInvestment = 0;
    let pieData = [];

    holdings.forEach(holding => {
      const coin = topCoins.find(c => c.id === holding.coin);
      if (coin) {
        const currentValue = holding.amount * coin.currentPrice;
        const investment = holding.amount * holding.buyPrice;
        
        totalValue += currentValue;
        totalInvestment += investment;
        
        pieData.push({
          name: coin.name,
          value: currentValue,
          color: getRandomColor(coin.id)
        });
      }
    });

    const profitLoss = totalValue - totalInvestment;
    const profitLossPercentage = totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;

    return {
      totalValue,
      totalInvestment,
      profitLoss,
      profitLossPercentage,
      pieData
    };
  };

  const stats = calculatePortfolioStats();

  // Function to get a consistent color based on coin id
  const getRandomColor = (id) => {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#8CBA51', '#EA526F', '#23B5D3', '#7251B5'
    ];
    
    // Use a hash function to get a consistent index
    const hash = id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Handle add new holding
  const handleAddHolding = () => {
    if (newHolding.coin && newHolding.amount && newHolding.buyPrice) {
      setHoldings([
        ...holdings,
        {
          id: Date.now().toString(),
          coin: newHolding.coin,
          amount: parseFloat(newHolding.amount),
          buyPrice: parseFloat(newHolding.buyPrice),
          buyDate: newHolding.buyDate
        }
      ]);
      setNewHolding({
        coin: '',
        amount: '',
        buyPrice: '',
        buyDate: new Date().toISOString().substring(0, 10)
      });
      setIsAddModalOpen(false);
    }
  };

  // Handle edit holding
  const handleEditHolding = () => {
    if (currentHolding && currentHolding.coin && currentHolding.amount && currentHolding.buyPrice) {
      setHoldings(
        holdings.map(holding => 
          holding.id === currentHolding.id ? currentHolding : holding
        )
      );
      setCurrentHolding(null);
      setIsEditModalOpen(false);
    }
  };

  // Handle delete holding
  const handleDeleteHolding = (id) => {
    setHoldings(holdings.filter(holding => holding.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Add Coin
        </button>
      </div>
      
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-2">
            <FiDollarSign className="text-primary text-xl mr-2" />
            <span className="text-gray-500 font-medium">Portfolio Value</span>
          </div>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-2">
            <FiDollarSign className="text-primary text-xl mr-2" />
            <span className="text-gray-500 font-medium">Total Investment</span>
          </div>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalInvestment)}</div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-2">
            <FiDollarSign className="text-primary text-xl mr-2" />
            <span className="text-gray-500 font-medium">Profit/Loss</span>
          </div>
          <div className={`text-2xl font-bold ${stats.profitLoss >= 0 ? 'text-positive' : 'text-negative'}`}>
            {formatCurrency(stats.profitLoss)}
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-2">
            <FiPercent className="text-primary text-xl mr-2" />
            <span className="text-gray-500 font-medium">ROI</span>
          </div>
          <div className={`text-2xl font-bold ${stats.profitLossPercentage >= 0 ? 'text-positive' : 'text-negative'}`}>
            {stats.profitLossPercentage >= 0 ? '+' : ''}
            {stats.profitLossPercentage.toFixed(2)}%
          </div>
        </div>
      </div>
      
      {/* Portfolio Chart and Holdings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-sm rounded-lg p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Portfolio Distribution</h2>
          <div style={{ width: '100%', height: 300 }}>
            {stats.pieData.length > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={stats.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {stats.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)} 
                    labelFormatter={(label) => ''}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Add coins to your portfolio to see distribution
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Holdings</h2>
          
          {holdings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No holdings yet. Click "Add Coin" to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 crypto-table">
                <thead>
                  <tr>
                    <th>Coin</th>
                    <th>Amount</th>
                    <th>Buy Price</th>
                    <th>Value</th>
                    <th>Profit/Loss</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map(holding => {
                    const coin = topCoins.find(c => c.id === holding.coin);
                    if (!coin) return null;
                    
                    const currentValue = holding.amount * coin.currentPrice;
                    const buyValue = holding.amount * holding.buyPrice;
                    const profitLoss = currentValue - buyValue;
                    const profitLossPercentage = (profitLoss / buyValue) * 100;
                    
                    return (
                      <tr key={holding.id}>
                        <td>
                          <div className="flex items-center">
                            <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3" />
                            <div>
                              <div className="font-medium text-gray-900">{coin.name}</div>
                              <div className="text-gray-500 text-xs">{coin.symbol.toUpperCase()}</div>
                            </div>
                          </div>
                        </td>
                        <td>{holding.amount.toLocaleString()} {coin.symbol.toUpperCase()}</td>
                        <td>{formatCurrency(holding.buyPrice)}</td>
                        <td>
                          <div>
                            <div className="font-medium">{formatCurrency(currentValue)}</div>
                            <div className="text-gray-500 text-xs">{holding.amount} x {formatCurrency(coin.currentPrice)}</div>
                          </div>
                        </td>
                        <td className={profitLoss >= 0 ? 'text-positive' : 'text-negative'}>
                          <div>
                            <div className="font-medium">{formatCurrency(profitLoss)}</div>
                            <div className="text-xs">
                              {profitLossPercentage >= 0 ? '+' : ''}
                              {profitLossPercentage.toFixed(2)}%
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => {
                                setCurrentHolding(holding);
                                setIsEditModalOpen(true);
                              }}
                              className="p-1 text-gray-500 hover:text-primary"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteHolding(holding.id)}
                              className="p-1 text-gray-500 hover:text-negative"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Transaction History */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        
        {holdings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No transactions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 crypto-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Coin</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map(holding => {
                  const coin = topCoins.find(c => c.id === holding.coin);
                  if (!coin) return null;
                  
                  return (
                    <tr key={holding.id}>
                      <td>
                        <div className="flex items-center">
                          <FiClock className="mr-2 text-gray-400" />
                          {new Date(holding.buyDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                          {coin.name}
                        </div>
                      </td>
                      <td>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Buy
                        </div>
                      </td>
                      <td>{holding.amount} {coin.symbol.toUpperCase()}</td>
                      <td>{formatCurrency(holding.buyPrice)}</td>
                      <td>{formatCurrency(holding.amount * holding.buyPrice)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Add Coin Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add Coin to Portfolio</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coin</label>
                  <select
                    className="input"
                    value={newHolding.coin}
                    onChange={(e) => setNewHolding({...newHolding, coin: e.target.value})}
                  >
                    <option value="">Select a coin</option>
                    {topCoins.map(coin => (
                      <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    step="any"
                    className="input"
                    value={newHolding.amount}
                    onChange={(e) => setNewHolding({...newHolding, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buy Price (USD)</label>
                  <input
                    type="number"
                    step="any"
                    className="input"
                    value={newHolding.buyPrice}
                    onChange={(e) => setNewHolding({...newHolding, buyPrice: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buy Date</label>
                  <input
                    type="date"
                    className="input"
                    value={newHolding.buyDate}
                    onChange={(e) => setNewHolding({...newHolding, buyDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn-primary sm:ml-3"
                  onClick={handleAddHolding}
                >
                  Add Coin
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Coin Modal */}
      {isEditModalOpen && currentHolding && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Edit Holding</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coin</label>
                  <select
                    className="input"
                    value={currentHolding.coin}
                    onChange={(e) => setCurrentHolding({...currentHolding, coin: e.target.value})}
                  >
                    <option value="">Select a coin</option>
                    {topCoins.map(coin => (
                      <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    step="any"
                    className="input"
                    value={currentHolding.amount}
                    onChange={(e) => setCurrentHolding({...currentHolding, amount: parseFloat(e.target.value)})}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buy Price (USD)</label>
                  <input
                    type="number"
                    step="any"
                    className="input"
                    value={currentHolding.buyPrice}
                    onChange={(e) => setCurrentHolding({...currentHolding, buyPrice: parseFloat(e.target.value)})}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buy Date</label>
                  <input
                    type="date"
                    className="input"
                    value={currentHolding.buyDate}
                    onChange={(e) => setCurrentHolding({...currentHolding, buyDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn-primary sm:ml-3"
                  onClick={handleEditHolding}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setCurrentHolding(null);
                    setIsEditModalOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
