import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CustomButton from '../components/Button';
import useApiRequest from './useApiRequest';
import styled from 'styled-components';

// Styled component for the container
export const Container = styled.div`
  max-width: 300px; /* Set maximum width */
  margin: 0 auto; /* Center the container horizontally */
  padding: 0 20px; /* Add padding to the sides */
  color: #000; /* Set text color to black */
  background-color: #f0f0f0;
`;

// Styled component for the flex container
export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// Styled component for the item
export const Item = styled.div`
  margin-bottom: 10px;
  max-width: 200px;
  border-radius: 5px;
  background-color: black;
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 5px; /* Add rounded corners */
`;

export default function Clients() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hitRequest, handleNavigation } = useApiRequest();

  useEffect(() => {
    async function fetchStocks() {
      try {
        const data = await hitRequest('http://127.0.0.1:8000/stock/');
        setStocks(data);
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
  }, []);

  const handleOpen = (stockId) => {
    handleNavigation(`/stocks/${stockId}`);
  };

  return (
    <Flex>
      {loading ? (
        <CircularProgress />
      ) : (
        stocks.map((stock) => (
          <Container key={stock.id}>
            <center>
              <Item>
                <Link to={`/stocks/${stock.id}`}>
                  <div>
                    <p>Name: {stock.name}</p>
                    <p>Price: {stock.price}</p>
                    <p>Market Cap: {stock.market_cap}</p>
                  </div>
                </Link>
              </Item>  
            </center>
            <center>
              <CustomButton onClick={() => handleOpen(stock.id)}>+</CustomButton>
              <CustomButton onClick={() => handleOpen(stock.id)}>Buy</CustomButton>
              <CustomButton onClick={() => handleOpen(stock.id)}>Sell</CustomButton>
            </center>
          </Container>
        ))
      )}
    </Flex>
  );
}