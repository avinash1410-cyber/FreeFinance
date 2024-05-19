import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import React, { useState, useEffect } from 'react';
import Stocks from '../components/Stocks';

export default function StockList() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://avi8654340.pythonanywhere.com/stock/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          const json = await response.json();
          setStocks(json);
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <ProtectedPage />
      <Announcement />
      <Navbar />
      <h1>
        <center>Here is The list of Stocks</center>
      </h1>
      {/* Rendering the Stocks component */}
      <Stocks stocks={stocks} loading={loading} />
    </>
  );
}