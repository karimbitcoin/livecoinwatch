// Market Overview Data
export const marketData = {
  marketCap: 2456789012345,
  volume24h: 198765432198,
  liquidity: 87654321987,
  marketCapChange24h: 2.34
};

// Helper function to generate price history data
const generatePriceData = (basePrice, volatility, days) => {
  const data = [];
  const now = new Date();
  let price = basePrice;
  
  // Generate hourly data for the number of days
  for (let i = days * 24; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000).getTime();
    // Add some random variation to simulate price changes
    const change = (Math.random() - 0.48) * volatility;
    price = Math.max(price * (1 + change), 0.00001); // Ensure price doesn't go below 0.00001
    
    data.push({
      timestamp,
      price
    });
  }
  
  return data;
};

// Generate price data for each coin
export const priceDatas = {
  bitcoin: generatePriceData(46789.34, 0.005, 180),
  ethereum: generatePriceData(3456.78, 0.008, 180),
  binancecoin: generatePriceData(467.23, 0.007, 180),
  xrp: generatePriceData(0.7845, 0.01, 180),
  cardano: generatePriceData(0.3456, 0.012, 180),
  solana: generatePriceData(89.35, 0.015, 180),
  polkadot: generatePriceData(17.89, 0.01, 180),
  dogecoin: generatePriceData(0.0834, 0.018, 180),
  avalanche: generatePriceData(23.67, 0.012, 180),
  litecoin: generatePriceData(123.45, 0.008, 180),
};

// Top Cryptocurrencies Data
export const topCoins = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    currentPrice: 46789.34,
    marketCap: 898765432100,
    marketCapRank: 1,
    totalVolume: 45678901234,
    priceChangePercentage24h: 2.45,
    circulatingSupply: 19200000,
    maxSupply: 21000000,
    website: 'https://bitcoin.org',
    description: 'Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency.'
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    currentPrice: 3456.78,
    marketCap: 416123456789,
    marketCapRank: 2,
    totalVolume: 23456789012,
    priceChangePercentage24h: 3.12,
    circulatingSupply: 120500000,
    maxSupply: null,
    website: 'https://ethereum.org',
    description: 'Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.'
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png',
    currentPrice: 467.23,
    marketCap: 78123456789,
    marketCapRank: 3,
    totalVolume: 4567890123,
    priceChangePercentage24h: -1.23,
    circulatingSupply: 167000000,
    maxSupply: 200000000,
    website: 'https://binance.com',
    description: 'Binance Coin (BNB) is an exchange-based token created and issued by the cryptocurrency exchange Binance. Initially created on the Ethereum blockchain, BNB now operates as the native token of the Binance Chain.'
  },
  {
    id: 'xrp',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    currentPrice: 0.7845,
    marketCap: 40123456789,
    marketCapRank: 4,
    totalVolume: 2345678901,
    priceChangePercentage24h: 0.87,
    circulatingSupply: 51000000000,
    maxSupply: 100000000000,
    website: 'https://ripple.com/xrp',
    description: 'XRP is the cryptocurrency used by the Ripple payment network. Built for enterprise use, XRP aims to be a fast, cost-efficient cryptocurrency for cross-border payments.'
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    currentPrice: 0.3456,
    marketCap: 35123456789,
    marketCapRank: 5,
    totalVolume: 1984567890,
    priceChangePercentage24h: -0.45,
    circulatingSupply: 101500000000,
    maxSupply: 45000000000,
    website: 'https://cardano.org',
    description: 'Cardano is a proof-of-stake blockchain platform: the first to be founded on peer-reviewed research and developed through evidence-based methods.'
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    currentPrice: 89.35,
    marketCap: 31123456789,
    marketCapRank: 6,
    totalVolume: 1734567890,
    priceChangePercentage24h: 5.21,
    circulatingSupply: 348500000,
    maxSupply: null,
    website: 'https://solana.com',
    description: 'Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.'
  },
  {
    id: 'polkadot',
    symbol: 'dot',
    name: 'Polkadot',
    image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    currentPrice: 17.89,
    marketCap: 21123456789,
    marketCapRank: 7,
    totalVolume: 1434567890,
    priceChangePercentage24h: 2.34,
    circulatingSupply: 1180500000,
    maxSupply: null,
    website: 'https://polkadot.network',
    description: 'Polkadot is an open-source sharded multichain protocol that connects and secures a network of specialized blockchains, facilitating cross-chain transfer of any data or asset types.'
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    currentPrice: 0.0834,
    marketCap: 19123456789,
    marketCapRank: 8,
    totalVolume: 1234567890,
    priceChangePercentage24h: -2.45,
    circulatingSupply: 229200000000,
    maxSupply: null,
    website: 'https://dogecoin.com',
    description: 'Dogecoin is a cryptocurrency based on the popular "Doge" Internet meme and features a Shiba Inu on its logo.'
  },
  {
    id: 'avalanche',
    symbol: 'avax',
    name: 'Avalanche',
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    currentPrice: 23.67,
    marketCap: 16123456789,
    marketCapRank: 9,
    totalVolume: 1134567890,
    priceChangePercentage24h: 1.78,
    circulatingSupply: 680500000,
    maxSupply: 720000000,
    website: 'https://avax.network',
    description: 'Avalanche is an open-source platform for launching decentralized applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem.'
  },
  {
    id: 'litecoin',
    symbol: 'ltc',
    name: 'Litecoin',
    image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
    currentPrice: 123.45,
    marketCap: 14123456789,
    marketCapRank: 10,
    totalVolume: 1034567890,
    priceChangePercentage24h: 0.34,
    circulatingSupply: 114500000,
    maxSupply: 84000000,
    website: 'https://litecoin.org',
    description: 'Litecoin is a peer-to-peer cryptocurrency created by Charlie Lee. It was created based on the Bitcoin protocol but differs in terms of the hashing algorithm used.'
  }
];
