import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import CustomButton from '../components/Button';
import useApiRequest from './useApiRequest';
import styled from 'styled-components';
import { StockItem, ItemContainer } from '../components/Items';
import PopUp from './PopUp';
import { BlackBox } from '../pages/ViewStock';
import AuthContext from '../context/AuthContext';

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

const HomeCategories = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hitRequest } = useApiRequest();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [actionType, setActionType] = useState(null);
  const { user } = useContext(AuthContext); // Access the user from AuthContext

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await hitRequest('https://avi8654340.pythonanywhere.com/stock/');
        setStocks(data);
      } finally {
        setLoading(false);
      }
    };

    if (user) { // Only fetch stocks if user is logged in
      fetchStocks();
    } else {
      setLoading(false); // Set loading to false if user is not logged in
    }
  }, [user, hitRequest]);

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
      ) : user ? (
        displayedStocks.map((stock) => (
          <ItemContainer key={stock.id}>
            <BlackBox>
              <Centered>
                <StockItem>
                  <Link to={`/stock/${stock.id}`}>
                    <div>
                      <p>Name: {stock.name}</p>
                      <p>No of company: {stock.price}</p>
                      <p>Market Cap: {stock.market_cap}</p>
                    </div>
                  </Link>
                </StockItem>
              </Centered>
            </BlackBox>
            <Centered>
            </Centered>
          </ItemContainer>
        ))
      ) : (
        <p>Please log in to view stocks.</p>
      )}
      <PopUp open={openPopup} onClose={handleClosePopup} actionType={actionType} stockId={selectedStock} />
    </Flex>
  );
};

export default HomeCategories;