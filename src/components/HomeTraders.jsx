import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CustomButton from '../components/Button';
import useApiRequest from './useApiRequest';
import styled from 'styled-components';

import { StockItem, ItemContainer } from '../components/Items';




// Styled component for the flex container
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;


const HomeTraders = () => {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hitRequest, handleNavigation } = useApiRequest();

  useEffect(() => {
    async function fetchTraders() {
      try {
        const data = await hitRequest('http://127.0.0.1:8000/trader/');
        setTraders(data);
      } finally {
        setLoading(false);
      }
    }
    fetchTraders();
  }, []);

  const handleOpen = (traderId) => {
    handleNavigation(`/trader/${traderId}`);
  };

  const displayedTraders = traders.slice(0, 4);

  return (
    <Flex>
      {loading ? (
        <CircularProgress />
      ) : (
        displayedTraders.map((trader) => (
          <ItemContainer key={trader.id}>
            <center>
              <StockItem>
                <Link to={`/trader/${trader.id}`}>
                  <div>
                    <p>Name: {trader.cust.user.username}</p>
                    <p>Phone: {trader.cust.phone}</p>
                    <p>Address: {trader.cust.add}</p>
                  </div>
                </Link>
              </StockItem>
            </center>
            <center>
              <CustomButton onClick={() => handleOpen(trader.id)}>+</CustomButton>
              <CustomButton onClick={() => handleOpen(trader.id)}>Buy</CustomButton>
              <CustomButton onClick={() => handleOpen(trader.id)}>Sell</CustomButton>
            </center>
          </ItemContainer>
        ))
      )}
    </Flex>
  );
};

export default HomeTraders;