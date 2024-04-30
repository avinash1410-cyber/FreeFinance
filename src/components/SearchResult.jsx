import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import { BlackBox, Container, BlackBox3 } from '../pages/ViewStock';
import { StockItem, ItemContainer } from './Items';
import { Flex,Centered } from './Stocks';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  flex-wrap: wrap;
  justify-content: flex-start;
`;




const SearchResult = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [traders, setTraders] = useState([]);

  useEffect(() => {
    if (location.state && location.state.results) {
      const { stocks, traders } = location.state.results;
      setOrders(stocks || []);
      setTraders(traders || []);
    } else {
      console.log('State is undefined or does not contain results');
    }
  }, [location.state]);

  return (
    <div>
      <ProtectedPage />
      <Navbar />
      <div>
        <h2>Stocks</h2>
        <BlackBox3>
          <StyledContainer>
            {orders.map((stock) => (
              <Flex key={stock.id}>
                <Link to={`/stock/${stock.id}`}>
                <BlackBox>
                  <ItemContainer>
                  <Centered>
                    <StockItem>
                      <p>Name: {stock.name}</p>
                      <p>Price: {stock.price}</p>
                      <p>Value: {stock.market_cap}</p>
                    </StockItem>
                    </Centered>
                  </ItemContainer>
                </BlackBox>
                </Link>
              </Flex>
            ))}
          </StyledContainer>
        </BlackBox3>
      </div>
      <div>
        <h2>Traders</h2>
        <BlackBox3>
          <StyledContainer>
            {traders.map((trader) => (
              <Flex key={trader.id}>
                <Link to={`/trader/${trader.id}`}>
                <BlackBox>
                  <ItemContainer>
                  <Centered>
                    <StockItem>
                      <p>Name: {trader.cust.user.username}</p>
                      <p>Add: {trader.cust.add}</p>
                      <p>Balance: {trader.cust.balance}</p>
                      <p>Phone: {trader.cust.phone}</p>
                    </StockItem>
                    </Centered>
                  </ItemContainer>
                </BlackBox>
                </Link>
              </Flex>
            ))}
          </StyledContainer>
        </BlackBox3>
      </div>
    </div>
  );
};

export default SearchResult;