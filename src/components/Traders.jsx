import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CustomButton from '../components/Button';
import useApiRequest from './useApiRequest';
import styled from 'styled-components';

// Styled component for the container
const Container = styled.div`
  max-width: 300px; /* Set maximum width */
  margin: 0 auto; /* Center the container horizontally */
  padding: 0 20px; /* Add padding to the sides */
  color: #000; /* Set text color to black */
  background-color: #f0f0f0;
`;

// Styled component for the flex container
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// Styled component for the item
const Item = styled.div`
  margin-bottom: 10px;
  max-width: 200px;
  border-radius: 5px;
  background-color: black;
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 5px; /* Add rounded corners */
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
          <Container key={trader.id}>
            <center>
              <Item>
                <Link to={`/trader/${trader.id}`}>
                  <div>
                    <p>Name: {trader.cust.user.username}</p>
                    <p>Phone: {trader.cust.phone}</p>
                    <p>Address: {trader.cust.add}</p>
                  </div>
                </Link>
              </Item>
            </center>
            <center>
              <CustomButton onClick={() => handleOpen(trader.id)}>Hire</CustomButton>
            </center>
          </Container>
        ))
      )}
    </Flex>
  );
};
export default HomeTraders;