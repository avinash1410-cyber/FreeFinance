import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import CustomButton from '../components/Button';
import PopUp from '../components/PopUp';



export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const BlackBox = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  flex: 1;
  border-radius: 5px;
  margin: 20px;
`;

export const Graph = styled.svg`
  width: 100%;
  height: 150px; /* Adjust height as needed */
`;

export  const Bar = styled.rect`
  fill: #4caf50;
`;

export const BlackBox2 = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  width: 75%;
  border-radius: 5px;
  margin: 20px;
`;

export const Text = styled.text`
  fill: white;
  font-size: 12px;
  text-anchor: middle;
`;



export const BlackBox3 = styled.div`
  background-color: grey;
  color: white;
  padding: 20px;
  width: 96%;
  border-radius: 5px;
  margin: 20px;
`;






function ViewStock() {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const classes = useStyles();


  const [openPopup, setOpenPopup] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [actionType, setActionType] = useState(null);



  useEffect(() => {
    axios.get(`https://avi8654340.pythonanywhere.com/stock/${id}`)
      .then((res) => {
        setStock(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);


  const handleOpenPopup = (stockId, type) => {
    setSelectedStock(stockId);
    setActionType(type);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };



  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      {loading && <CircularProgress />} {/* Show loading indicator while fetching data */}
      {error && <p>Error: {error.message}</p>} {/* Display error message if request fails */}
      {stock && (
        <Container>
        <BlackBox>
          <p>Name: {stock.name}</p>
          <p>Price: {stock.price}</p>
          <p>Market Cap: {stock.market_cap}</p>
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
          <CustomButton onClick={() => handleOpenPopup(stock.id, 'add')}>ADD</CustomButton>
          <CustomButton onClick={() => handleOpenPopup(stock.id, 'buy')}>BUY</CustomButton>
          <CustomButton onClick={() => handleOpenPopup(stock.id, 'sell')}>SELL</CustomButton>
          <PopUp open={openPopup} onClose={handleClosePopup} actionType={actionType} stockId={selectedStock} />
    </div>
  );
}

export default ViewStock;