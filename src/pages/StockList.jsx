import useAxios from '../utils/useAxios';
import styled from "styled-components";
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CustomButton from '../components/Button';
import Stocks from '../components/Stocks';


const ListItem = styled.li`
  margin-bottom: 10px;
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




export default function StockList() {
  const api = useAxios();
  const [stocks, setStocks] = useState([]);
  // const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedStockId, setSelectedStockId] = useState(null); // State to store the selected stock ID
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://avi8654340.pythonanywhere.com/stock/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          const json = await response.json();
          setStocks(json);
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  return (
    <>
      <ProtectedPage />
      <Announcement />
      <Navbar />
      <h1>
        <center>Here is The list of Stocks</center>
      </h1>
      <Stocks></Stocks>
    </>
  );
}