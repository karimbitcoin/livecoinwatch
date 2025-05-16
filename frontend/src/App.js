import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";

import { marketData, topCoins, priceDatas } from "./data/mockData";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Apply dark mode to body
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <BrowserRouter>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                marketData={marketData}
                topCoins={topCoins}
                btcPriceData={priceDatas.bitcoin}
              />
            } 
          />
          <Route 
            path="/coins/:coinId" 
            element={<CoinPage coins={topCoins} allPriceData={priceDatas} />} 
          />
          <Route path="*" element={<HomePage marketData={marketData} topCoins={topCoins} btcPriceData={priceDatas.bitcoin} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
