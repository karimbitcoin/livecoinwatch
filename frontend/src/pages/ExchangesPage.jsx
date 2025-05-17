import React, { useState } from 'react';
import { FiSearch, FiExternalLink, FiStar } from 'react-icons/fi';

// Mock data for exchanges
const exchangesData = [
  {
    id: 'binance',
    name: 'Binance',
    logo: 'https://assets.coingecko.com/markets/images/52/small/binance.jpg',
    country: 'Global',
    url: 'https://www.binance.com',
    trustScore: 10,
    volume24h: 12876543210,
    markets: 1289,
    coins: 386,
    rank: 1,
    established: 2017,
    description: 'Binance is a global cryptocurrency exchange that provides a platform for trading more than 100 cryptocurrencies.'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Exchange',
    logo: 'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png',
    country: 'USA',
    url: 'https://www.coinbase.com',
    trustScore: 9,
    volume24h: 8765432109,
    markets: 878,
    coins: 274,
    rank: 2,
    established: 2012,
    description: 'Coinbase is a US-based cryptocurrency exchange offering a wide variety of trading pairs.'
  },
  {
    id: 'kraken',
    name: 'Kraken',
    logo: 'https://assets.coingecko.com/markets/images/29/small/kraken.jpg',
    country: 'USA',
    url: 'https://www.kraken.com',
    trustScore: 9,
    volume24h: 6543210987,
    markets: 643,
    coins: 187,
    rank: 3,
    established: 2011,
    description: 'Kraken is one of the oldest cryptocurrency exchanges and offers advanced trading features.'
  },
  {
    id: 'kucoin',
    name: 'KuCoin',
    logo: 'https://assets.coingecko.com/markets/images/61/small/kucoin.png',
    country: 'Seychelles',
    url: 'https://www.kucoin.com',
    trustScore: 8,
    volume24h: 5432109876,
    markets: 762,
    coins: 219,
    rank: 4,
    established: 2017,
    description: 'KuCoin is a global cryptocurrency exchange for numerous digital assets and cryptocurrencies.'
  },
  {
    id: 'ftx',
    name: 'FTX',
    logo: 'https://assets.coingecko.com/markets/images/451/small/FTX-exchange.png',
    country: 'Bahamas',
    url: 'https://ftx.com',
    trustScore: 8,
    volume24h: 4321098765,
    markets: 543,
    coins: 156,
    rank: 5,
    established: 2019,
    description: 'FTX is a cryptocurrency exchange built by traders, for traders with innovative products.'
  },
  {
    id: 'bitfinex',
    name: 'Bitfinex',
    logo: 'https://assets.coingecko.com/markets/images/4/small/BItfinex.png',
    country: 'British Virgin Islands',
    url: 'https://www.bitfinex.com',
    trustScore: 8,
    volume24h: 3210987654,
    markets: 432,
    coins: 167,
    rank: 6,
    established: 2012,
    description: 'Bitfinex is a digital asset trading platform offering state-of-the-art services for digital currency traders and global liquidity providers.'
  },
  {
    id: 'huobi',
    name: 'Huobi Global',
    logo: 'https://assets.coingecko.com/markets/images/25/small/huobi.jpg',
    country: 'Seychelles',
    url: 'https://www.huobi.com',
    trustScore: 8,
    volume24h: 2109876543,
    markets: 638,
    coins: 312,
    rank: 7,
    established: 2013,
    description: 'Huobi Global is a digital asset exchange that allows users to trade cryptocurrencies.'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    logo: 'https://assets.coingecko.com/markets/images/50/small/gemini.png',
    country: 'USA',
    url: 'https://www.gemini.com',
    trustScore: 9,
    volume24h: 1987654321,
    markets: 324,
    coins: 98,
    rank: 8,
    established: 2014,
    description: 'Gemini is a regulated cryptocurrency exchange, wallet, and custodian that makes it simple to buy, sell, and store digital assets.'
  },
  {
    id: 'bittrex',
    name: 'Bittrex',
    logo: 'https://assets.coingecko.com/markets/images/10/small/BG-color-250x250_icon.png',
    country: 'USA',
    url: 'https://bittrex.com',
    trustScore: 8,
    volume24h: 876543210,
    markets: 412,
    coins: 143,
    rank: 9,
    established: 2014,
    description: 'Bittrex is a U.S.-based cryptocurrency exchange platform designed for customers who demand fast trade execution, dependable digital wallets, and industry-leading security practices.'
  },
  {
    id: 'gate',
    name: 'Gate.io',
    logo: 'https://assets.coingecko.com/markets/images/60/small/gate_io_logo1.jpg',
    country: 'Cayman Islands',
    url: 'https://gate.io',
    trustScore: 8,
    volume24h: 765432109,
    markets: 587,
    coins: 231,
    rank: 10,
    established: 2013,
    description: 'Gate.io is a global cryptocurrency exchange offering a wide range of digital assets.'
  }
];

const ExchangesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  const filteredExchanges = exchangesData.filter(exchange =>
    exchange.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exchange.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Cryptocurrency Exchanges</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <p className="text-gray-600 mb-4 md:mb-0">
            Find the best cryptocurrency exchange for trading your digital assets
          </p>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search exchanges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 crypto-table">
            <thead>
              <tr>
                <th className="w-10">#</th>
                <th className="w-10"></th>
                <th>Exchange</th>
                <th>Trust Score</th>
                <th>24h Volume</th>
                <th>Markets</th>
                <th>Coins</th>
                <th>Established</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExchanges.map((exchange) => (
                <tr key={exchange.id}>
                  <td>{exchange.rank}</td>
                  <td>
                    <button
                      onClick={() => toggleFavorite(exchange.id)}
                      className="focus:outline-none"
                    >
                      <FiStar
                        className={`h-5 w-5 ${
                          favorites.includes(exchange.id) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img src={exchange.logo} alt={exchange.name} className="w-8 h-8 mr-3 rounded-full" />
                      <div>
                        <a 
                          href={exchange.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-gray-900 flex items-center"
                        >
                          {exchange.name}
                          <FiExternalLink className="ml-1 h-4 w-4 text-gray-400" />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {exchange.trustScore}/10
                    </div>
                  </td>
                  <td>{formatNumber(exchange.volume24h)}</td>
                  <td>{exchange.markets}</td>
                  <td>{exchange.coins}</td>
                  <td>{exchange.established}</td>
                  <td>{exchange.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">About Cryptocurrency Exchanges</h2>
        <p className="text-gray-700 mb-4">
          Cryptocurrency exchanges are platforms where you can buy, sell, and trade cryptocurrencies. They act as intermediaries between buyers and sellers, providing a marketplace for digital assets.
        </p>
        <p className="text-gray-700 mb-4">
          When choosing an exchange, consider factors such as security, fees, available cryptocurrencies, payment methods, and geographic restrictions. The trust score helps you gauge the reliability and security measures of each exchange.
        </p>
        <p className="text-gray-700">
          Always do your own research before using any exchange and be aware of the risks involved in cryptocurrency trading.
        </p>
      </div>
    </div>
  );
};

export default ExchangesPage;
