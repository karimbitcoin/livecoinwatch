import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUp, FiArrowDown, FiStar } from 'react-icons/fi';

const CryptoTable = ({ coins }) => {
  const [sortField, setSortField] = useState('marketCapRank');
  const [sortDirection, setSortDirection] = useState('asc');
  const [favorites, setFavorites] = useState([]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCoins = [...coins].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      // For very small prices, show more decimal places
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`;
    }
  };

  const formatLargeNumber = (num) => {
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

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <FiArrowUp className="inline-block ml-1" /> : <FiArrowDown className="inline-block ml-1" />;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Top Cryptocurrencies</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Live prices and market data</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 crypto-table">
          <thead>
            <tr>
              <th className="w-10 cursor-pointer" onClick={() => handleSort('favorite')}>
                <FiStar className="text-gray-400" />
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('marketCapRank')}>
                # {getSortIcon('marketCapRank')}
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('name')}>
                Name {getSortIcon('name')}
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('currentPrice')}>
                Price {getSortIcon('currentPrice')}
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('priceChangePercentage24h')}>
                24h % {getSortIcon('priceChangePercentage24h')}
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('marketCap')}>
                Market Cap {getSortIcon('marketCap')}
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('totalVolume')}>
                Volume (24h) {getSortIcon('totalVolume')}
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('circulatingSupply')}>
                Circulating Supply {getSortIcon('circulatingSupply')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCoins.map((coin) => (
              <tr key={coin.id}>
                <td>
                  <button
                    onClick={() => toggleFavorite(coin.id)}
                    className="focus:outline-none"
                  >
                    <FiStar
                      className={`h-5 w-5 ${
                        favorites.includes(coin.id) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                </td>
                <td>{coin.marketCapRank}</td>
                <td>
                  <Link to={`/coins/${coin.id}`} className="flex items-center">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-2" />
                    <div>
                      <div className="font-medium text-gray-900">{coin.name}</div>
                      <div className="text-gray-500 text-xs">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </Link>
                </td>
                <td>{formatPrice(coin.currentPrice)}</td>
                <td className={coin.priceChangePercentage24h >= 0 ? 'text-positive' : 'text-negative'}>
                  {coin.priceChangePercentage24h >= 0 ? '+' : ''}
                  {coin.priceChangePercentage24h.toFixed(2)}%
                </td>
                <td>{formatLargeNumber(coin.marketCap)}</td>
                <td>{formatLargeNumber(coin.totalVolume)}</td>
                <td>
                  <div className="flex items-center">
                    <span>{coin.circulatingSupply.toLocaleString()} {coin.symbol.toUpperCase()}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
