import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import CustomButton from '../components/Button';
import useApiRequest from './useApiRequest';
import styled from 'styled-components';
import { StockItem, ItemContainer } from '../components/Items';
import { BlackBox } from '../pages/ViewStock';
import useAxios from '../utils/useAxios';
import AuthContext from '../context/AuthContext';

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
  const { hitRequest } = useApiRequest();
  const api = useAxios();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Access the user from AuthContext

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        const data = await hitRequest('https://avi8654340.pythonanywhere.com/trader/');
        setTraders(data);
      } finally {
        setLoading(false);
      }
    };

    if (user) { // Only fetch traders if user is logged in
      fetchTraders();
    } else {
      setLoading(false); // Set loading to false if user is not logged in
    }
  }, [user, hitRequest]);

  useEffect(() => {
    const fetchHiredTraders = async () => {
      try {
        const data = await hitRequest('https://avi8654340.pythonanywhere.com/hired-traders/');
        setHiredTraders(data);
      } catch (error) {
        console.error('Error fetching hired traders:', error);
      }
    };

    if (user) { // Only fetch hired traders if user is logged in
      fetchHiredTraders();
    }
  }, [user, hitRequest]);

  const handleClick = async (traderId) => {
    try {
      const response = await api.get(`https://avi8654340.pythonanywhere.com/account/hire_trader/${traderId}/`);
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
      ) : user ? (
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
      ) : (
        <p>Please log in to view traders.</p>
      )}
    </Flex>
  );
};

export default HomeTraders;