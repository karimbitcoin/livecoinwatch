import React, { useState, useEffect } from 'react';
import { FiSearch, FiExternalLink, FiStar, FiFilter, FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi';

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
    description: 'Binance is a global cryptocurrency exchange that provides a platform for trading more than 100 cryptocurrencies.',
    tradingFees: '0.1%',
    depositMethods: ['Bank Transfer', 'Credit Card', 'Cryptocurrency'],
    kycRequired: true,
    marginTrading: true,
    features: ['Staking', 'Launchpad', 'Futures', 'NFT Marketplace']
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
    description: 'Coinbase is a US-based cryptocurrency exchange offering a wide variety of trading pairs.',
    tradingFees: '0.6%',
    depositMethods: ['Bank Transfer', 'Credit Card', 'PayPal'],
    kycRequired: true,
    marginTrading: false,
    features: ['Staking', 'Earn', 'Learning Rewards']
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
    description: 'Kraken is one of the oldest cryptocurrency exchanges and offers advanced trading features.',
    tradingFees: '0.26%',
    depositMethods: ['Bank Transfer', 'Cryptocurrency'],
    kycRequired: true,
    marginTrading: true,
    features: ['Staking', 'Futures', 'OTC']
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
    description: 'KuCoin is a global cryptocurrency exchange for numerous digital assets and cryptocurrencies.',
    tradingFees: '0.1%',
    depositMethods: ['Bank Transfer', 'Credit Card', 'Cryptocurrency'],
    kycRequired: true,
    marginTrading: true,
    features: ['Lending', 'Staking', 'Futures', 'Trading Bot']
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
    description: 'FTX is a cryptocurrency exchange built by traders, for traders with innovative products.',
    tradingFees: '0.07%',
    depositMethods: ['Bank Transfer', 'Credit Card', 'Cryptocurrency'],
    kycRequired: true,
    marginTrading: true,
    features: ['Futures', 'Options', 'MOVE Contracts', 'Prediction Markets']
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
    description: 'Bitfinex is a digital asset trading platform offering state-of-the-art services for digital currency traders and global liquidity providers.',
    tradingFees: '0.2%',
    depositMethods: ['Bank Transfer', 'Cryptocurrency'],
    kycRequired: true,
    marginTrading: true,
    features: ['Margin Funding', 'OTC', 'Derivatives']
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
    description: 'Huobi Global is a digital asset exchange that allows users to trade cryptocurrencies.',
    tradingFees: '0.2%',
    depositMethods: ['Bank Transfer', 'Credit Card', 'Cryptocurrency'],
    kycRequired: true,
    marginTrading: true,
    features: ['Staking', 'Earn', 'Futures', 'Options']
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
    description: 'Gemini is a regulated cryptocurrency exchange, wallet, and custodian that makes it simple to buy, sell, and store digital assets.',
    tradingFees: '0.35%',
    depositMethods: ['Bank Transfer', 'Wire Transfer', 'Cryptocurrency'],
    kycRequired: true,
    marginTrading: false,
    features: ['Earn', 'Custody', 'Pay']
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
    description: 'Bittrex is a U.S.-based cryptocurrency exchange platform designed for customers who demand fast trade execution, dependable digital wallets, and industry-leading security practices.',
    tradingFees: '0.25%',
    depositMethods: ['Bank Transfer', 'Cryptocurrency'],
    kycRequired: true,
    marginTrading: false,
    features: ['Instant Buy & Sell', 'OTC']
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
    description: 'Gate.io is a global cryptocurrency exchange offering a wide range of digital assets.',
    tradingFees: '0.2%',
    depositMethods: ['Bank Transfer', 'Credit Card', 'Cryptocurrency'],
    kycRequired: true,
    marginTrading: true,
    features: ['Lending', 'Staking', 'Futures', 'Options', 'Copy Trading']
  }
];

// Countries for the filter
const countries = [...new Set(exchangesData.map(exchange => exchange.country))];

// Features for the filter
const allFeatures = [...new Set(exchangesData.flatMap(exchange => exchange.features))];

const ExchangesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'ascending' });
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    countries: [],
    minTrustScore: 0,
    features: [],
    marginTrading: null,
    kycRequired: null,
  });

  // Sort exchanges
  const sortedExchanges = [...exchangesData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Apply filters
  const filteredExchanges = sortedExchanges.filter(exchange => {
    // Search term filter
    const matchesSearch = 
      exchange.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exchange.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Country filter
    const matchesCountry = 
      filters.countries.length === 0 || 
      filters.countries.includes(exchange.country);
    
    // Trust score filter
    const matchesTrustScore = exchange.trustScore >= filters.minTrustScore;
    
    // Features filter
    const matchesFeatures = 
      filters.features.length === 0 || 
      filters.features.every(feature => exchange.features.includes(feature));
    
    // Margin trading filter
    const matchesMarginTrading = 
      filters.marginTrading === null || 
      exchange.marginTrading === filters.marginTrading;
    
    // KYC filter
    const matchesKyc = 
      filters.kycRequired === null || 
      exchange.kycRequired === filters.kycRequired;
    
    return matchesSearch && matchesCountry && matchesTrustScore && matchesFeatures && matchesMarginTrading && matchesKyc;
  });

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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? 
      <FiChevronUp className="inline ml-1" /> : 
      <FiChevronDown className="inline ml-1" />;
  };

  const toggleCountryFilter = (country) => {
    if (filters.countries.includes(country)) {
      setFilters({
        ...filters,
        countries: filters.countries.filter(c => c !== country)
      });
    } else {
      setFilters({
        ...filters,
        countries: [...filters.countries, country]
      });
    }
  };

  const toggleFeatureFilter = (feature) => {
    if (filters.features.includes(feature)) {
      setFilters({
        ...filters,
        features: filters.features.filter(f => f !== feature)
      });
    } else {
      setFilters({
        ...filters,
        features: [...filters.features, feature]
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      countries: [],
      minTrustScore: 0,
      features: [],
      marginTrading: null,
      kycRequired: null,
    });
  };

  const openExchangeDetails = (exchange) => {
    setSelectedExchange(exchange);
  };

  const closeExchangeDetails = () => {
    setSelectedExchange(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Cryptocurrency Exchanges</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="w-full lg:w-auto mb-4 lg:mb-0">
            <p className="text-gray-600 mb-2">
              Find the best cryptocurrency exchange for trading your digital assets
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-4">{filteredExchanges.length} exchanges found</span>
              {Object.values(filters).some(val => 
                Array.isArray(val) ? val.length > 0 : val !== null && val !== 0
              ) && (
                <button 
                  onClick={resetFilters}
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
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
            
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <FiFilter className="mr-2 h-5 w-5" />
                Filter
                {showFilterMenu ? 
                  <FiChevronUp className="ml-2 h-5 w-5" /> : 
                  <FiChevronDown className="ml-2 h-5 w-5" />
                }
              </button>
              
              {showFilterMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Filters</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Countries</h4>
                      <div className="flex flex-wrap gap-2">
                        {countries.map((country) => (
                          <button
                            key={country}
                            onClick={() => toggleCountryFilter(country)}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              filters.countries.includes(country)
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Minimum Trust Score</h4>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={filters.minTrustScore}
                        onChange={(e) => setFilters({...filters, minTrustScore: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>{filters.minTrustScore}</span>
                        <span>10</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {allFeatures.map((feature) => (
                          <button
                            key={feature}
                            onClick={() => toggleFeatureFilter(feature)}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              filters.features.includes(feature)
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {feature}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Margin Trading</h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setFilters({...filters, marginTrading: true})}
                            className={`px-3 py-1 rounded text-xs font-medium ${
                              filters.marginTrading === true
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setFilters({...filters, marginTrading: false})}
                            className={`px-3 py-1 rounded text-xs font-medium ${
                              filters.marginTrading === false
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            No
                          </button>
                          {filters.marginTrading !== null && (
                            <button
                              onClick={() => setFilters({...filters, marginTrading: null})}
                              className="px-1 py-1 text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">KYC Required</h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setFilters({...filters, kycRequired: true})}
                            className={`px-3 py-1 rounded text-xs font-medium ${
                              filters.kycRequired === true
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setFilters({...filters, kycRequired: false})}
                            className={`px-3 py-1 rounded text-xs font-medium ${
                              filters.kycRequired === false
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            No
                          </button>
                          {filters.kycRequired !== null && (
                            <button
                              onClick={() => setFilters({...filters, kycRequired: null})}
                              className="px-1 py-1 text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={resetFilters}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setShowFilterMenu(false)}
                        className="ml-3 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 crypto-table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  #
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  
                </th>
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  Exchange {getSortIndicator('name')}
                </th>
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('trustScore')}
                >
                  Trust Score {getSortIndicator('trustScore')}
                </th>
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('volume24h')}
                >
                  24h Volume {getSortIndicator('volume24h')}
                </th>
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('markets')}
                >
                  Markets {getSortIndicator('markets')}
                </th>
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('coins')}
                >
                  Coins {getSortIndicator('coins')}
                </th>
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('established')}
                >
                  Established {getSortIndicator('established')}
                </th>
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('country')}
                >
                  Country {getSortIndicator('country')}
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExchanges.map((exchange) => (
                <tr key={exchange.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exchange.rank}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFavorite(exchange.id)}
                      className="focus:outline-none"
                      aria-label={favorites.includes(exchange.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <FiStar
                        className={`h-5 w-5 ${
                          favorites.includes(exchange.id) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={exchange.logo} alt={exchange.name} className="w-8 h-8 mr-3 rounded-full" />
                      <div>
                        <a 
                          href={exchange.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-gray-900 flex items-center hover:text-primary"
                        >
                          {exchange.name}
                          <FiExternalLink className="ml-1 h-4 w-4 text-gray-400" />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${exchange.trustScore >= 8 ? 'bg-green-100 text-green-800' : 
                        exchange.trustScore >= 5 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {exchange.trustScore}/10
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(exchange.volume24h)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.markets.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.coins.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.established}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.country}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => openExchangeDetails(exchange)}
                      className="text-primary hover:text-primary-dark font-medium flex items-center"
                    >
                      View <FiInfo className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredExchanges.length === 0 && (
                <tr>
                  <td colSpan="10" className="px-3 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <FiSearch className="h-8 w-8 mb-2" />
                      <p>No exchanges found matching your criteria</p>
                      <button 
                        onClick={resetFilters}
                        className="mt-3 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark"
                      >
                        Reset filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Exchange Details Modal */}
      {selectedExchange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeExchangeDetails}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <img src={selectedExchange.logo} alt={selectedExchange.name} className="w-12 h-12 mr-4 rounded-full" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedExchange.name}</h2>
                    <p className="text-gray-500">Rank #{selectedExchange.rank} • Established {selectedExchange.established}</p>
                  </div>
                </div>
                <button onClick={closeExchangeDetails} className="text-gray-400 hover:text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Overview</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 block">Trust Score</span>
                      <div 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1
                        ${selectedExchange.trustScore >= 8 ? 'bg-green-100 text-green-800' : 
                          selectedExchange.trustScore >= 5 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}
                      >
                        {selectedExchange.trustScore}/10
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block">24h Trading Volume</span>
                      <span className="text-gray-900 font-medium">{formatNumber(selectedExchange.volume24h)}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block">Markets</span>
                      <span className="text-gray-900 font-medium">{selectedExchange.markets.toLocaleString()}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block">Coins Supported</span>
                      <span className="text-gray-900 font-medium">{selectedExchange.coins.toLocaleString()}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block">Trading Fees</span>
                      <span className="text-gray-900 font-medium">{selectedExchange.tradingFees}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block">Country</span>
                      <span className="text-gray-900 font-medium">{selectedExchange.country}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block">Website</span>
                      <a
                        href={selectedExchange.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                      >
                        {selectedExchange.url.replace(/^https?:\/\//, '')}
                        <FiExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 block">KYC Required</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        selectedExchange.kycRequired ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedExchange.kycRequired ? 'Yes' : 'No'}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block">Margin Trading</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        selectedExchange.marginTrading ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedExchange.marginTrading ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block">Deposit Methods</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedExchange.depositMethods.map((method) => (
                          <span 
                            key={method} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block">Available Features</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedExchange.features.map((feature) => (
                          <span 
                            key={feature} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-10 text-primary"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">About {selectedExchange.name}</h3>
                <p className="text-gray-700 mb-6">
                  {selectedExchange.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleFavorite(selectedExchange.id)}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      favorites.includes(selectedExchange.id)
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FiStar className={`mr-2 h-5 w-5 ${favorites.includes(selectedExchange.id) ? 'fill-current' : ''}`} />
                    {favorites.includes(selectedExchange.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                  
                  <a
                    href={selectedExchange.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark inline-flex items-center"
                  >
                    Visit Exchange <FiExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">About Cryptocurrency Exchanges</h2>
        <p className="text-gray-700 mb-4">
          Cryptocurrency exchanges are platforms where you can buy, sell, and trade cryptocurrencies. They act as intermediaries between buyers and sellers, providing a marketplace for digital assets.
        </p>
        <p className="text-gray-700 mb-4">
          When choosing an exchange, consider factors such as security, fees, available cryptocurrencies, payment methods, and geographic restrictions. The trust score helps you gauge the reliability and security measures of each exchange.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Key factors to consider when choosing an exchange:</strong>
        </p>
        <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
          <li><strong>Security:</strong> Look for exchanges with strong security measures like two-factor authentication, cold storage for funds, and insurance against hacks.</li>
          <li><strong>Fees:</strong> Compare trading fees, deposit/withdrawal fees, and any other charges that might apply.</li>
          <li><strong>Available cryptocurrencies:</strong> Ensure the exchange supports the cryptocurrencies you want to trade.</li>
          <li><strong>Liquidity:</strong> Higher trading volume generally means better liquidity, allowing you to buy and sell quickly without affecting market prices.</li>
          <li><strong>User interface:</strong> A user-friendly platform can make trading easier, especially for beginners.</li>
          <li><strong>Geographic restrictions:</strong> Some exchanges are not available in certain countries due to regulatory issues.</li>
        </ul>
        <p className="text-gray-700">
          Always do your own research before using any exchange and be aware of the risks involved in cryptocurrency trading.
        </p>
      </div>
    </div>
  );
};

export default ExchangesPage;
