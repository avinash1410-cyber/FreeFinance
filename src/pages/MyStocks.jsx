import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";

import {FirstComponent, SecondComponent, StockItem,ItemContainer,Wrapper, ThirdComponent } from '../components/Items';
import InputForm from '../components/InputForm';
import CustomButton from '../components/Button';
import styled from 'styled-components';
import BalanceForm from '../components/BalanceForm';
import { Scrollable } from '../components/Items';

import { Flex } from '../components/Helpers2';






export const ItemContainer2 = styled.div`
  max-width: max;
  margin: 0 auto;
  padding: 20px;
`;



const MyStocks = () => {
  const api = useAxios();
  const [orders, setOrders] = useState([]);
  const [mode, setMode] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const orderResponse = await api.get("https://avi8654340.pythonanywhere.com/account/my_stocks/");
        console.log("Order data:", orderResponse.data);
        // Set state accordingly
        setOrders(orderResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleSell = (stock) => {
    setMode('sell');
    setSelectedStock(stock);
  };

  const handleBuy = (stock) => {
    setMode('buy');
    setSelectedStock(stock);
  };

  return (
    <>
      <ProtectedPage />
      <Announcement />
      <Navbar />
      <Wrapper>
        <FirstComponent>
          <Scrollable>
          <ItemContainer2>
            <h2>My Stocks</h2>
            {orders.map(order => (
            
              <StockItem key={order.id}>
                
                <Flex>
              
                  <FirstComponent>
                    
                    <p>Stock Name: {order.stock.name}</p>
                    <p>Current Price: {order.stock.price}</p>
                    <p>Profit/Loss: $10</p>  
                  </FirstComponent>
                
                  <SecondComponent>
                    <p>Order Price: {order.orderPrice}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Invest/Current: {order.amount}/{order.amount+36}</p>
                  </SecondComponent>

                  <ThirdComponent>
                    <p>Quantity: {order.quantity}</p>
                    <p>For sell: {order.sell ? 'Yes' : 'No'}</p>
                    <CustomButton onClick={() => handleSell(order.stock)}>Sell</CustomButton>
                    <CustomButton onClick={() => handleBuy(order.stock)}>Buy</CustomButton>
                  </ThirdComponent>
                </Flex>
               
              </StockItem>
              
            ))}
          </ItemContainer2>
          </Scrollable>
        </FirstComponent>

        <SecondComponent>
          <ItemContainer>
            <h2>{mode === 'sell' ? 'Sell' : 'Buy'} Stocks</h2>
            <InputForm mode={mode} stock={selectedStock} />
          </ItemContainer>

          <ItemContainer>
            <h2>ADD BALANCE</h2>
            <BalanceForm mode={mode} stockName={selectedStock} />
          </ItemContainer>
        </SecondComponent>
      </Wrapper>
    </>
  );
};

export default MyStocks;