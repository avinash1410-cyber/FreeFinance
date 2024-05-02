import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import useAxios from '../utils/useAxios';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import {BlackBox2,BlackBox3,Bar,Text,Graph,Container,BlackBox} from "../pages/ViewStock"
import CustomButton from '../components/Button';
import { useNavigate } from 'react-router-dom';




const ClientProfile = () => {
  const { id } = useParams();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`http://127.0.0.1:8000/trader/client/${id}`);
        console.log(response.data);
        setResponse(response.data.response); // Accessing response.data.response to get the inner object
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);



  

  const navigateToClientTradePage = (id) => {
    // Navigate to the trade page
    navigate(`/trader/client/${id}/stocks`);
  };




  return (
    <>
          <ProtectedPage/>
       <Navbar />
    <Container>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <BlackBox>Error: {error.message}</BlackBox>
      ) : response ? (
        <BlackBox>
          <h2>Client Profile</h2>
          <p>ID: {response.id}</p>
          <p>Name: {response.cust.user.username}</p>
          <p>Address: {response.cust.add}</p>
          <p>Balance: {response.cust.balance}</p>
          <p>Phone: {response.cust.phone}</p>
        </BlackBox>
      ) : (
        <BlackBox>No data available</BlackBox>
      )}
      <BlackBox2>
        <Graph>
          <Bar x="10" y="20" width="20" height="100" />
          <Text x="20" y="140">Jan</Text>
          <Bar x="40" y="40" width="20" height="80" />
          <Text x="50" y="140">Feb</Text>
          <Bar x="70" y="60" width="20" height="60" />
          <Text x="80" y="140">Mar</Text>
          <Bar x="100" y="80" width="20" height="40" />
          <Text x="110" y="140">Apr</Text>
          <Bar x="130" y="100" width="20" height="20" />
          <Text x="140" y="140">May</Text>
        </Graph>

        </BlackBox2>
      </Container>
      <CustomButton onClick={() => navigateToClientTradePage(response.cust.id)}>Trade</CustomButton>

      <BlackBox3>
        <Container>
          
          {loading ? (
        <CircularProgress />
      ) : (
            response.orders.map((order) => (
            <Link to={`/stock/${order.stock.id}`}>
                <BlackBox>
                  <p>Name: {order.stock.name}</p>
                  <p>Price: {order.stock.price}</p>
                  <p>Market Cap: {order.stock.market_cap}</p>
                </BlackBox>
                </Link>
            ))
          )}
       
        </Container>
      </BlackBox3>
    </>
  );
};

export default ClientProfile;