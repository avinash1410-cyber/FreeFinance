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

// const useStyles = makeStyles((theme) => ({
//   addToWatchlist: {
//     color: theme.palette.getContrastText(theme.palette.success.main),
//     backgroundColor: theme.palette.success.main,
//     '&:hover': {
//       backgroundColor: theme.palette.success.dark,
//     },
//   },

//   buyButton: {
//     color: theme.palette.getContrastText(theme.palette.success.main),
//     backgroundColor: theme.palette.success.main,
//     '&:hover': {
//       backgroundColor: theme.palette.success.dark,
//     },
//   },
//   sellButton: {
//     color: theme.palette.getContrastText(theme.palette.error.main),
//     backgroundColor: theme.palette.error.main,
//     '&:hover': {
//       backgroundColor: theme.palette.error.dark,
//     },
//   },
// }));

function ViewStock() {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const classes = useStyles();
  const navigate = useNavigate();
  const api=useAxios();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/stock/${id}`)
      .then((res) => {
        setStock(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const handleBuy = async () => {
    try {
      // Show loading indicator while processing
      setLoading(true);
      // Perform buy operation
      const res = await api.post('http://127.0.0.1:8000/account/buy_stock/', {"amount": stock.price, "stock_id": id});
      // Check if operation was successful
      if (res.data.message === "Successful") {
        // Navigate to success page or show success message
        navigate("/portfolio");
      } else {
        // Handle unsuccessful operation (e.g., display error message)
        alert(res.data.message)
      }
    } catch (error) {
      // Handle error (e.g., display error message)
    } finally {
      // Hide loading indicator after operation is complete
      setLoading(false);
    }
  };

  const handleSell = async () => {
    try {
      // Show loading indicator while processing
      setLoading(true);
      // Perform sell operation
      const res = await api.post('http://127.0.0.1:8000/account/sell_stock/', {"quantity": 1, "stock_id": id});
      // Check if operation was successful
      if (res.data.message === "Successful") {
        // Navigate to success page or show success message
        navigate("/portfolio");
      } else {
        // Handle unsuccessful operation (e.g., display error message)
        alert(res.data.message)
      }
    } catch (error) {
      // Handle error (e.g., display error message)
    } finally {
      // Hide loading indicator after operation is complete
      setLoading(false);
    }
  };

  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      {loading && <CircularProgress />} {/* Show loading indicator while fetching data */}
      {error && <p>Error: {error.message}</p>} {/* Display error message if request fails */}
      {stock && (
        <BlackBox>
          <p>Name: {stock.name}</p>
          <p>Price: {stock.price}</p>
          <p>Market Cap: {stock.market_cap}</p>
        </BlackBox>
      )}
      {/* Disable buttons when loading or no stock data */}
      <CustomButton disabled={loading || !stock} onClick={handleBuy}>Buy</CustomButton>
      
      <CustomButton disabled={loading || !stock} onClick={handleSell}>Sell</CustomButton>
      
      <CustomButton>+</CustomButton>
    </div>
  );
}

export default ViewStock;