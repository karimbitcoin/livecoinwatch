import React, { useState } from 'react';
import { FiClock, FiExternalLink, FiBookmark } from 'react-icons/fi';

// Mock news data
const newsData = [
  {
    id: 1,
    title: 'Bitcoin Surges Past $50,000 as Institutional Adoption Continues',
    summary: 'Bitcoin has reached new heights as more institutions add the cryptocurrency to their balance sheets. This marks a significant milestone for the digital asset.',
    source: 'CryptoNews',
    url: 'https://example.com/news/1',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    publishedAt: '2023-06-15T10:30:00Z',
    category: 'market'
  },
  {
    id: 2,
    title: 'Ethereum 2.0 Upgrade: What You Need to Know About the Merge',
    summary: 'The long-awaited Ethereum 2.0 upgrade is approaching. Here\'s what the merge means for miners, investors, and the future of the network.',
    source: 'BlockchainReport',
    url: 'https://example.com/news/2',
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05',
    publishedAt: '2023-06-14T16:45:00Z',
    category: 'technology'
  },
  {
    id: 3,
    title: 'Regulatory Developments: SEC Issues New Guidelines for Cryptocurrency Exchanges',
    summary: 'The Securities and Exchange Commission has released new compliance guidelines for cryptocurrency exchanges operating in the United States.',
    source: 'CryptoLegal',
    url: 'https://example.com/news/3',
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3',
    publishedAt: '2023-06-14T08:20:00Z',
    category: 'regulation'
  },
  {
    id: 4,
    title: 'NFT Market Recovery: Trading Volumes Increase After Months of Decline',
    summary: 'After several months of declining activity, the NFT market is showing signs of recovery with increased trading volumes and new project launches.',
    source: 'NFTInsider',
    url: 'https://example.com/news/4',
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d',
    publishedAt: '2023-06-13T12:10:00Z',
    category: 'nft'
  },
  {
    id: 5,
    title: 'Central Bank Digital Currencies: China Expands Digital Yuan Testing',
    summary: 'China is expanding its digital yuan pilot program to more cities as it continues to lead the global race in Central Bank Digital Currency development.',
    source: 'GlobalCryptoNews',
    url: 'https://example.com/news/5',
    imageUrl: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52',
    publishedAt: '2023-06-13T09:15:00Z',
    category: 'cbdc'
  },
  {
    id: 6,
    title: 'DeFi Protocol Launches New Yield Farming Program with Record APY',
    summary: 'A leading DeFi protocol has introduced a new yield farming program offering unprecedented annual percentage yields to liquidity providers.',
    source: 'DeFiDaily',
    url: 'https://example.com/news/6',
    imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82',
    publishedAt: '2023-06-12T15:30:00Z',
    category: 'defi'
  },
  {
    id: 7,
    title: 'Top Exchange Announces Support for New Layer-2 Scaling Solution',
    summary: 'One of the world\'s largest cryptocurrency exchanges will support deposits and withdrawals for a promising new Layer-2 scaling solution.',
    source: 'CryptoExchangeNews',
    url: 'https://example.com/news/7',
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55',
    publishedAt: '2023-06-12T11:20:00Z',
    category: 'exchange'
  },
  {
    id: 8,
    title: 'Major Corporation Adds Bitcoin to Treasury in $500 Million Purchase',
    summary: 'Another Fortune 500 company has added Bitcoin to its treasury, purchasing $500 million worth of the cryptocurrency as an inflation hedge.',
    source: 'BusinessCrypto',
    url: 'https://example.com/news/8',
    imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335',
    publishedAt: '2023-06-11T09:45:00Z',
    category: 'business'
  },
  {
    id: 9,
    title: 'New Research Shows Growing Cryptocurrency Adoption in Emerging Markets',
    summary: 'A comprehensive study reveals accelerating cryptocurrency adoption rates in emerging markets as an alternative to unstable local currencies.',
    source: 'CryptoResearch',
    url: 'https://example.com/news/9',
    imageUrl: 'https://images.unsplash.com/photo-1609554496796-c345a5335ceb',
    publishedAt: '2023-06-10T14:30:00Z',
    category: 'adoption'
  },
  {
    id: 10,
    title: 'Upcoming Hard Fork: What Changes to Expect and How to Prepare',
    summary: 'A major cryptocurrency network is preparing for a hard fork. Learn about the upcoming changes and what users and investors should do to prepare.',
    source: 'CryptoTechNews',
    url: 'https://example.com/news/10',
    imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9',
    publishedAt: '2023-06-10T10:15:00Z',
    category: 'technology'
  }
];

const categories = [
  { id: 'all', name: 'All News' },
  { id: 'market', name: 'Market' },
  { id: 'technology', name: 'Technology' },
  { id: 'regulation', name: 'Regulation' },
  { id: 'defi', name: 'DeFi' },
  { id: 'nft', name: 'NFTs' },
  { id: 'business', name: 'Business' },
  { id: 'adoption', name: 'Adoption' },
  { id: 'exchange', name: 'Exchanges' },
  { id: 'cbdc', name: 'CBDCs' }
];

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedArticles, setSavedArticles] = useState([]);

  // Filter news based on category and search term
  const filteredNews = newsData.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle saved article
  const toggleSaveArticle = (id) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter(articleId => articleId !== id));
    } else {
      setSavedArticles([...savedArticles, id]);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Cryptocurrency News</h1>
      
      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 mr-2 rounded-full text-sm font-medium ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* News articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(article => (
          <article key={article.id} className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 relative">
              <img 
                src={`${article.imageUrl}?auto=format&fit=crop&w=600&h=300`}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleSaveArticle(article.id)}
                className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-opacity-100 focus:outline-none"
              >
                <FiBookmark 
                  className={`h-5 w-5 ${
                    savedArticles.includes(article.id)
                      ? 'text-primary fill-current'
                      : 'text-gray-500'
                  }`} 
                />
              </button>
            </div>
            
            <div className="p-5">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                  {categories.find(cat => cat.id === article.category)?.name || article.category}
                </span>
                <div className="flex items-center">
                  <FiClock className="mr-1" />
                  {formatDate(article.publishedAt)}
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                {article.title}
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.summary}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Source: {article.source}
                </span>
                
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark text-sm flex items-center"
                >
                  Read More <FiExternalLink className="ml-1" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {filteredNews.length === 0 && (
        <div className="text-center py-12 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
          <p className="mt-2 text-gray-500">
            Try changing your search term or selecting a different category
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
