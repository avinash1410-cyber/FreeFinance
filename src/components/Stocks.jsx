import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import CustomButton from '../components/Button';
import useApiRequest from './useApiRequest';
import styled from 'styled-components';
import { StockItem, ItemContainer } from '../components/Items';
import PopUp from './PopUp';
import { BlackBox } from '../pages/ViewStock';

// Styled component for the flex container
export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// Styled component for centering
export const Centered = styled.div`
  text-align: center;
`;

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hitRequest } = useApiRequest();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [actionType, setActionType] = useState(null);
  const location = useLocation();
  const [client_id, setClientId] = useState(null);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const data = await hitRequest('https://avi8654340.pythonanywhere.com/stock/');
        setStocks(data);
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
  }, [fetchStocks]);

  const handleOpenPopup = (stockId, type) => {
    setSelectedStock(stockId);
    setActionType(type);
    console.log(type);
    setOpenPopup(true);
  
    // Extract client ID from the URL
    const parts = location.pathname.split('/');
    const idIndex = parts.indexOf('client') + 1;
  
    // Check if 'client' exists in the URL and the next part is a number
    if (idIndex !== 0 && !isNaN(parts[idIndex])) {
      const clientId = parts[idIndex];
      setClientId(clientId);
      console.log(clientId);
    } else {
      // If 'client' doesn't exist or the next part is not a number, set clientId to null or handle the situation accordingly
      setClientId(null);
      console.log("Client ID not found in the URL");
    }
  };
  

  
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Flex>
      {loading ? (
        <CircularProgress />
      ) : (
        stocks.map((stock) => (
          <ItemContainer key={stock.id}>
            <Centered>
            <BlackBox>
              <StockItem>
                <Link to={`/stock/${stock.id}`}>
                  <div>
                    <p>Name: {stock.name}</p>
                    <p>Price: {stock.price}</p>
                    <p>Market Cap: {stock.market_cap}</p>
                  </div>
                </Link>
              </StockItem>
              </BlackBox>
            </Centered>
            <Centered>
            <BlackBox>
              <CustomButton onClick={() => handleOpenPopup(stock.id, 'add')}>ADD</CustomButton>
              <CustomButton onClick={() => handleOpenPopup(stock.id, 'buy')}>BUY</CustomButton>
              <CustomButton onClick={() => handleOpenPopup(stock.id, 'sell')}>SELL</CustomButton>
              </BlackBox>
            </Centered>
          </ItemContainer>
        ))
      )}

      <PopUp open={openPopup} onClose={handleClosePopup} actionType={actionType} stockId={selectedStock} client_id={client_id}/>
    </Flex>
  );
};

export default Stocks;
