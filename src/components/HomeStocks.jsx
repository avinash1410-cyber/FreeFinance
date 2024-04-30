import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import CustomButton from '../components/Button';
import useApiRequest from './useApiRequest';
import styled from 'styled-components';
import { StockItem, ItemContainer } from '../components/Items';
import PopUp from './PopUp';
import { BlackBox } from '../pages/ViewStock';



// Styled component for the flex container
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// Styled component for centering
const Centered = styled.div`
  text-align: center;
`;

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hitRequest } = useApiRequest();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [actionType, setActionType] = useState(null);

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

  const handleOpenPopup = (stockId, type) => {
    setSelectedStock(stockId);
    setActionType(type);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const displayedStocks = stocks.slice(0, 3);

  return (
    <Flex>
      {loading ? (
        <CircularProgress />
      ) : (
        displayedStocks.map((stock) => (
          
          <ItemContainer key={stock.id}>
            <BlackBox>
            <Centered>
              <StockItem>
                <Link to={`/stock/${stock.id}`}>
                  <div>
                    <p>Name: {stock.name}</p>
                    <p>Price: {stock.price}</p>
                    <p>Market Cap: {stock.market_cap}</p>
                  </div>
                </Link>
              </StockItem>
            </Centered>
            </BlackBox>
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

      <PopUp open={openPopup} onClose={handleClosePopup} actionType={actionType} stockId={selectedStock} />

    </Flex>
  );
};

export default Stocks;