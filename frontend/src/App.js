import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import NotFoundPage from "./pages/NotFoundPage";
import ExchangesPage from "./pages/ExchangesPage";
import PortfolioPage from "./pages/PortfolioPage";
import NewsPage from "./pages/NewsPage";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "./pages/AuthPages";

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
        <Routes>
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          <Route 
            path="/register" 
            element={<RegisterPage />} 
          />
          <Route 
            path="/forgot-password" 
            element={<ForgotPasswordPage />} 
          />
          <Route path="*" element={
            <>
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
                <Route 
                  path="/exchanges" 
                  element={<ExchangesPage />} 
                />
                <Route 
                  path="/portfolio" 
                  element={<PortfolioPage />} 
                />
                <Route 
                  path="/news" 
                  element={<NewsPage />} 
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
