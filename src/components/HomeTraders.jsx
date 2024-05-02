import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CustomButton from '../components/Button';
import useApiRequest from './useApiRequest';
import styled from 'styled-components';

import { StockItem, ItemContainer } from '../components/Items';
import { BlackBox } from '../pages/ViewStock';
import useAxios from '../utils/useAxios';
import { useNavigate } from 'react-router-dom';

// Styled component for the flex container
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HomeTraders = () => {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiredTraders, setHiredTraders] = useState([]);
  const { hitRequest, handleNavigation } = useApiRequest();
  const api = useAxios();
  const navigate = useNavigate();

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

  useEffect(() => {
    // Assuming you have a separate API endpoint to fetch the list of hired traders
    async function fetchHiredTraders() {
      try {
        const data = await hitRequest('http://127.0.0.1:8000/hired-traders/');
        setHiredTraders(data);
      } catch (error) {
        console.error('Error fetching hired traders:', error);
      }
    }
    fetchHiredTraders();
  }, []);


  
  const handleClick = async (traderId) => {
    try {
      const response = await api.get(`http://127.0.0.1:8000/account/hire_trader/${traderId}/`);
      console.log(response);
      alert(response.data.response);
      navigate('/portfolio');
      // Add the hired trader to the list of hired traders
      setHiredTraders([...hiredTraders, traderId]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const displayedTraders = traders.slice(0, 3);

  return (
    <Flex>
      {loading ? (
        <CircularProgress />
      ) : (
        displayedTraders.map((trader) => (
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
                <CustomButton onClick={() => handleClick(trader.id)}>
                  {hiredTraders.includes(trader.id) ? "Remove the Trader" : "HIRE THE TRADER"}
                </CustomButton>
              </BlackBox>
            </center>
          </ItemContainer>
        ))
      )}
    </Flex>
  );
};

export default HomeTraders;