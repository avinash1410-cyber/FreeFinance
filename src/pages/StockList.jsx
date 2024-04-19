import { React, useState, useEffect, useContext } from 'react';
import useAxios from '../utils/useAxios';
import styled from "styled-components";
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const ListItem = styled.li`
  margin-bottom: 10px;
`;

const useStyles = makeStyles((theme) => ({
  addToWatchlist: {
    color: theme.palette.getContrastText(theme.palette.success.main),
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },

  buyButton: {
    color: theme.palette.getContrastText(theme.palette.success.main),
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  sellButton: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));








export default function StockList() {
  const api = useAxios();
  const [Stocks, setStocks] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      fetch('http://127.0.0.1:8000/stock/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            setStocks(json)
          });
        }
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      <h1><center>Here is The list of Stocks</center></h1>
      {Stocks.length > 0 && (
        <ul>
          {Stocks.map(stock => (
            <>
            <ListItem key={stock.id}>
              <Link to={`/stocks/${stock.id}`}>
                <div>
                  <p>Name: {stock.name}</p>
                  <p>Price: {stock.price}</p>
                  <p>Market Cap: {stock.market_cap}</p>
                </div>
              </Link>
            </ListItem>
            <Button className={classes.addToWatchlist}>Add To watchlist</Button>
            </>
          ))}
        </ul>
      )}
    </div>
  );
}