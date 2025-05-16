import React from 'react';
import MarketOverview from '../components/MarketOverview';
import CryptoTable from '../components/CryptoTable';
import PriceChart from '../components/PriceChart';

const HomePage = ({ marketData, topCoins, btcPriceData }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <MarketOverview marketData={marketData} />
      
      <div className="mb-6">
        <PriceChart 
          coinId="bitcoin" 
          coinName="Bitcoin"
          priceData={btcPriceData}
        />
      </div>
      
      <CryptoTable coins={topCoins} />
    </div>
  );
};

export default HomePage;
