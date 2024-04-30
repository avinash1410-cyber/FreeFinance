import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Wrapper, FirstComponent, SecondComponent, ThirdComponent, StockItem, ItemContainer } from '../components/Items';
import { Link } from 'react-router-dom';
import { Input } from '@material-ui/core';
import BalanceForm from '../components/BalanceForm';
import { First,Flex } from '../components/Helpers2';
import styled from 'styled-components';
import CustomButton from '../components/Button';
import { Scrollable } from '../components/Items';




export const Second = styled.div`
  flex: 1;
  display: block;
  text-align: right;
`;


export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;




const Portfolio = () => {
  const api = useAxios();
  const [orders, setOrders] = useState([]);
  const [traders, setTraders] = useState([]);
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const [orderResponse, tradersResponse,accountResponse] = await Promise.all([
          api.get("http://127.0.0.1:8000/account/my_stocks/"),
          api.get("http://127.0.0.1:8000/account/hires_list/"),
          api.get("http://127.0.0.1:8000/account/")
        ]);
        console.log("Order data:", orderResponse.data);
        console.log("Traders data:", tradersResponse.data);
        console.log("Account data:", accountResponse.data);

        // Set state accordingly
        setOrders(orderResponse.data);
        setTraders(tradersResponse.data);
        setAccount(accountResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <ProtectedPage />
      <Announcement />
      <Navbar />
      <Wrapper>
        <FirstComponent>
          <ItemContainer>
            <h2>My Traders</h2>
            {traders.map(trader => (
              
            <StockItem key={trader.id}>
              < Flex>
              <Link to={`/trader/${trader.id}`}>
               
                  <First>
                    <p>Trader Name: {trader.cust.user.username}</p>
                    <p>Invetsed: 40000</p>
                  </First>
               
              </Link>
              <Second>
                <p>TurnOut: 600000</p>
                {/* <p>Remove</p> */}
                <ButtonContainer>
                  <CustomButton>Remove</CustomButton>
                </ButtonContainer>
              </Second>
              </Flex>
            </StockItem>
                                    
            ))}
          </ItemContainer>
        </FirstComponent>

        <Scrollable>
        <SecondComponent>
          <ItemContainer>
            <h2>My Portfolio</h2>
            {orders.map(order => (
              
              <StockItem key={order.id}>
                <Flex>
                <Link to={`/stock/${order.id}`}>
                <First>
                <p>Stock Name: {order.stock.name}</p>
                <p>Buy At Price: {order.stock.name}</p>
                <p>Quantity: {order.stock.name}</p>
                <p>Profit/Sell: {order.stock.name}</p>
                {/* Add other portfolio details here */}
                </First>
                </Link>

                <Second>
                
                <p>Current Price {order.stock.name}</p>
                <ButtonContainer>
                <CustomButton>______Buy____</CustomButton>
                <CustomButton>_____Sell____</CustomButton>
                </ButtonContainer>                
                </Second>
                </Flex>
              </StockItem>

              
            ))}
          </ItemContainer>
        </SecondComponent>
        </Scrollable>
        <ThirdComponent>
          <ItemContainer>
            <h2>My Balance</h2>

            <BalanceForm></BalanceForm>
          </ItemContainer>
        </ThirdComponent>
      </Wrapper>
    </>
  );
};

export default Portfolio;