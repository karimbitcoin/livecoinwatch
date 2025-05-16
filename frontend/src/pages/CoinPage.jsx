import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiArrowLeft, FiStar, FiExternalLink, FiInfo,
  FiDollarSign, FiBarChart2, FiTrendingUp, FiTrendingDown
} from 'react-icons/fi';
import PriceChart from '../components/PriceChart';

const CoinPage = ({ coins, allPriceData }) => {
  const { coinId } = useParams();
  const coin = coins.find(c => c.id === coinId);
  
  if (!coin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Coin not found</h1>
        <p className="mt-4 text-gray-500">The coin you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="mt-8 inline-block btn-primary">
          <FiArrowLeft className="inline-block mr-2" /> Back to Homepage
        </Link>
      </div>
    );
  }

  const priceData = allPriceData[coinId] || [];

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/" className="text-gray-500 hover:text-gray-700 flex items-center">
          <FiArrowLeft className="mr-2" /> Back to Market
        </Link>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={coin.image} alt={coin.name} className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{coin.name}</h1>
              <div className="flex items-center mt-1">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {coin.symbol.toUpperCase()}
                </span>
                <span className="ml-2 text-gray-500 text-sm">Rank #{coin.marketCapRank}</span>
                <button className="ml-2 text-gray-300 hover:text-yellow-400">
                  <FiStar className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end">
            <div className="text-3xl font-bold">{formatPrice(coin.currentPrice)}</div>
            <div className={`flex items-center mt-1 ${coin.priceChangePercentage24h >= 0 ? 'text-positive' : 'text-negative'}`}>
              {coin.priceChangePercentage24h >= 0 ? (
                <FiTrendingUp className="mr-1" />
              ) : (
                <FiTrendingDown className="mr-1" />
              )}
              <span>{coin.priceChangePercentage24h >= 0 ? '+' : ''}{coin.priceChangePercentage24h.toFixed(2)}% (24h)</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500 mb-1 flex items-center">
              <FiDollarSign className="mr-1" /> Market Cap
            </div>
            <div className="font-bold">{formatLargeNumber(coin.marketCap)}</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500 mb-1 flex items-center">
              <FiBarChart2 className="mr-1" /> 24h Trading Vol
            </div>
            <div className="font-bold">{formatLargeNumber(coin.totalVolume)}</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500 mb-1 flex items-center">
              <FiInfo className="mr-1" /> Circulating Supply
            </div>
            <div className="font-bold">
              {coin.circulatingSupply.toLocaleString()} {coin.symbol.toUpperCase()}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500 mb-1 flex items-center">
              <FiInfo className="mr-1" /> Max Supply
            </div>
            <div className="font-bold">
              {coin.maxSupply ? coin.maxSupply.toLocaleString() : 'No Max Supply'} {coin.symbol.toUpperCase()}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <a
            href={`https://www.coingecko.com/en/coins/${coinId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark text-sm flex items-center"
          >
            CoinGecko <FiExternalLink className="ml-1" />
          </a>
          
          <a
            href={coin.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark text-sm flex items-center"
          >
            Website <FiExternalLink className="ml-1" />
          </a>
        </div>
      </div>
      
      <PriceChart 
        coinId={coinId}
        coinName={coin.name}
        priceData={priceData}
      />
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">About {coin.name}</h2>
        <p className="text-gray-700">
          {coin.description || `${coin.name} is a cryptocurrency that aims to provide a decentralized solution for digital transactions. It uses blockchain technology to secure and verify transactions on its network.`}
        </p>
      </div>
    </div>
  );
};

export default CoinPage;
