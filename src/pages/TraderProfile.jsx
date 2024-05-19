import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import CustomButton from '../components/Button';
import { BlackBox,BlackBox2,Graph,Bar,Text,Container,BlackBox3 } from './ViewStock';

function TraderProfile() {
  const { id } = useParams();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://avi8654340.pythonanywhere.com/trader/profile/${id}`)
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
    <>
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
          </Container>
        )}
        <CustomButton>Remove</CustomButton>
        <CustomButton>Add Balance</CustomButton>
      </div>
      
      <BlackBox3>
        <Container>
          <BlackBox>
            <>
              <p>name:HDFC</p>
              <p>name:HDFC</p> 
            </>
          </BlackBox>
          
          <BlackBox>
            <>
              <p>name:HDFC</p>
              <p>name:HDFC</p> 
            </>   
          </BlackBox>
          <BlackBox>
            <>
              <p>name:HDFC</p>
              <p>name:HDFC</p> 
            </>
          </BlackBox>
        </Container>     
        <Container>
          <BlackBox>
            <>
              <p>name:HDFC</p>
              <p>name:HDFC</p> 
            </>
          </BlackBox>
          
          <BlackBox>
            <>
              <p>name:HDFC</p>
              <p>name:HDFC</p> 
            </>   
          </BlackBox>
          <BlackBox>
            <>
              <p>name:HDFC</p>
              <p>name:HDFC</p> 
            </>
          </BlackBox>
        </Container>     
        <Container>
          <BlackBox>
            <>
              <p>name:HDFC</p>
              <p>name:HDFC</p> 
            </>
          </BlackBox>
          
          <BlackBox>
            <>
              <p>name:HDFC</p>
              <p>name:HDFC</p> 
            </>   
          </BlackBox>
          <BlackBox>
            <>
              <p>name:HDFC</p>
              <p>name:HDFC</p> 
            </>
          </BlackBox>
        </Container>     
      </BlackBox3>
    </>
  );
}

export default TraderProfile;