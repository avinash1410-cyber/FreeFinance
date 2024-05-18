import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import React, { useState } from "react";
import ViewStock from "./pages/ViewStock";
import Home from "./pages/Home";
import StockList from "./pages/StockList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Watchlist from "./pages/Watchlist";
import TraderPage from "./pages/TraderPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedPage from "./views/ProtectedPage";
import { PaytmButton } from "./components/PaytmButton";
import TraderProfile from "./pages/TraderProfile";
import Portfolio from "./pages/Portfolio";
import MyComponent from "./pages/Test";
import My_Traders_Portfolio from "./pages/Trader_Portfolio";
import MyStocks from "./pages/MyStocks";
import StockMarket from "./pages/WS";
import ClientProfile from "./pages/ClientPage";
import SearchResult from "./components/SearchResult";
import axios from "axios";
import Indexes from "./components/indexes";







const App = () => {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (key) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/search/', { key });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes> 
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult data={searchResults} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/my_stocks" element={<MyStocks />} />
          <Route path="/stocks" element={<StockList />} />
          <Route path="/trader/client/:id/stocks" element={<StockList />} />
          <Route path="/stock/:id" element={<ViewStock />} />
          <Route path="/trader/client/:id" element={<ClientProfile />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/Earn" element={<My_Traders_Portfolio />} />
          <Route path="/traders" element={<TraderPage />} />
          <Route path="/trader/:id" element={<TraderProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<MyComponent />} />
          <Route path="/indexes" element={<Indexes />} />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;