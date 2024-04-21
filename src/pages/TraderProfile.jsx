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







const BlackBox = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 5px;
  margin: 20px;
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
        <BlackBox>
            <p>Name: {trader.cust.user.username}</p>
            <p>Address: {trader.cust.add}</p>
            <p>Balance: {trader.cust.balance}</p>
            <p>Phone: {trader.cust.phone}</p>
            
        </BlackBox>
      )}
      {/* Disable buttons when loading or no stock data */}
      {/* <CustomButton disabled={loading || !stock} onClick={handleBuy}>Buy</CustomButton>
      
      <CustomButton disabled={loading || !stock} onClick={handleSell}>Sell</CustomButton>
       */}
      <CustomButton>+</CustomButton>
    </div>
  );
}
export default TraderProfile;