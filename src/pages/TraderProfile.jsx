import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import useAxios from '../utils/useAxios';
import { CircularProgress } from "@material-ui/core";
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import CustomButton from '../components/Button';
import { Flex, ItemContainer, StockItem } from '../components/Items';







const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const BlackBox = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  flex: 1;
  border-radius: 5px;
  margin: 20px;
`;

const Graph = styled.svg`
  width: 100%;
  height: 150px; /* Adjust height as needed */
`;

const Bar = styled.rect`
  fill: #4caf50;
`;

const BlackBox2 = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  width: 75%;
  border-radius: 5px;
  margin: 20px;
`;

const Text = styled.text`
  fill: white;
  font-size: 12px;
  text-anchor: middle;
`;



function TraderProfile() {
  const { id } = useParams();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const classes = useStyles();
  const navigate = useNavigate();
  const api=useAxios();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/trader/${id}`)
      .then((res) => {
        setTrader(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);


  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      {loading && <CircularProgress />} {/* Show loading indicator while fetching data */}
      {error && <p>Error: {error.message}</p>} {/* Display error message if request fails */}
      {trader && (
      
        <Container>
        <BlackBox>
            <p>Name: {trader.cust.user.username}</p>
            <p>Address: {trader.cust.add}</p>
            <p>Balance: {trader.cust.balance}</p>
            <p>Phone: {trader.cust.phone}</p>
        </BlackBox>
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



        {/* <ItemContainer>
        <StockItem>
          <p>Avinash</p>
          <p>Kumar</p>
        </StockItem>
        </ItemContainer> */}

        </Container>


      )}
      {/* Disable buttons when loading or no stock data */}
      {/* <CustomButton disabled={loading || !stock} onClick={handleBuy}>Buy</CustomButton>
      
      <CustomButton disabled={loading || !stock} onClick={handleSell}>Sell</CustomButton>
       */}
      <CustomButton>Hire</CustomButton>
      
    </div>
  );
}
export default TraderProfile;