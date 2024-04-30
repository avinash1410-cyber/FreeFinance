import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";

import { Wrapper, FirstComponent, SecondComponent, StockItem, ItemContainer } from '../components/Items';
import InputForm from '../components/InputForm';
import CustomButton from '../components/Button';
import styled from 'styled-components';
import BalanceForm from '../components/BalanceForm';
import { Scrollable } from '../components/Items';

import { First,Flex } from '../components/Helpers2';
import { Second } from './Portfolio';
import { BlackBox } from './ViewStock';





const MyStocks = () => {
  const api = useAxios();
  const [orders, setOrders] = useState([]);
  const [mode, setMode] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const orderResponse = await api.get("http://127.0.0.1:8000/account/my_stocks/");
        console.log("Order data:", orderResponse.data);
        // Set state accordingly
        setOrders(orderResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleSell = (stockName) => {
    setMode('sell');
    setSelectedStock(stockName);
  };

  const handleBuy = (stockName) => {
    setMode('buy');
    setSelectedStock(stockName);
  };

  return (
    <>
      <ProtectedPage />
      <Announcement />
      <Navbar />
      <Wrapper>
        <FirstComponent>
          <Scrollable>
          <ItemContainer>
            <h2>My Stocks</h2>
            {orders.map(order => (
            
              <StockItem key={order.id}>
                
                <Flex>
                
                  <First>
                    
                    <p>Stock Name: {order.stock.name}</p>
                    <p>Current Price: {order.stock.name}</p>
                    <p>Buy At Price: {order.stock.name}</p>
                    
                  </First>
                
                  <Second>
                    <p>Quantity: {order.stock.name}</p>
                    <p>Profit/Sell: {order.stock.name}</p>
                    <CustomButton onClick={() => handleSell(order.stock.name)}>Sell</CustomButton>
                    <CustomButton onClick={() => handleBuy(order.stock.name)}>Buy</CustomButton>
                  </Second>
                </Flex>
               
              </StockItem>
              
            ))}
          </ItemContainer>
          </Scrollable>
        </FirstComponent>

        <SecondComponent>
          <ItemContainer>
            <h2>{mode === 'sell' ? 'Sell' : 'Buy'} Stocks</h2>
            <InputForm mode={mode} stockName={selectedStock} />
          </ItemContainer>

          <ItemContainer>
            <h2>ADD BALANCE</h2>
            <p>Current Balance   $4000</p>
            <BalanceForm mode={mode} stockName={selectedStock} />
          </ItemContainer>
        </SecondComponent>
      </Wrapper>
    </>
  );
};

export default MyStocks;