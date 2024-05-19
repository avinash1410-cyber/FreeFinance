import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CustomButton from '../components/Button';
import useApiRequest from './useApiRequest';
import styled from 'styled-components';

import { StockItem, ItemContainer } from '../components/Items';
import { BlackBox } from '../pages/ViewStock';




// Styled component for the container


// Styled component for the flex container
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;





const Traders = () => {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hitRequest } = useApiRequest();

  useEffect(() => {
    async function fetchTraders() {
      try {
        const data = await hitRequest('https://avi8654340.pythonanywhere.com/trader/');
        setTraders(data);
      } finally {
        setLoading(false);
      }
    }
    fetchTraders();
  }, []);

  const handleOpen = async (traderId) => {
    try {
      const traderData = await hitRequest(`https://avi8654340.pythonanywhere.com/account/hire_trader/${traderId}`, 'GET');
      console.log('Trader details:', traderData);
      // Handle trader data, e.g., navigate to trader detail page
    } catch (error) {
      console.error('Error fetching trader details:', error);
    }
  };


  return (
    <Flex>
      {loading ? (
        <CircularProgress />
      ) : (
        traders.map((trader) => (
          <ItemContainer key={trader.id}>
            <center>
            <BlackBox>
              <StockItem>
                <Link to={`/trader/${trader.id}`}>
                  <div>
                    <p>Name: {trader.cust.user.username}</p>
                    <p>Phone: {trader.cust.phone}</p>
                    <p>Address: {trader.cust.add}</p>
                  </div>
                </Link>
              </StockItem>
              </BlackBox>
            </center>
            <center>
            <BlackBox>
              <CustomButton onClick={() => handleOpen(trader.id)}>Hire</CustomButton>
              </BlackBox>
            </center>
          </ItemContainer>
        ))
      )}
    </Flex>
  );
};
export default Traders;