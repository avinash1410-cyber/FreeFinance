import { Badge, Button,Switch } from "@material-ui/core";

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';




import styled from "styled-components";
import { mobile } from "../responsive";
import {
  Link,
} from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useApiRequest from "./useApiRequest";
import { useNavigate } from 'react-router-dom';








const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  position: relative;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}

  &:hover::after {
    content: "${({ tooltipText }) => tooltipText}"; /* Use a dynamic tooltip text */
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 10;
    width: max-content;
    white-space: nowrap;
  }
`;



const Image = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;







const Navbar = () => {


  const { logoutUser } = useContext(AuthContext);
  const [i, setSearch] = useState();
  const[Product, setProduct]=useState();
  const navigate = useNavigate();
  const { hitRequest } = useApiRequest();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await hitRequest('http://127.0.0.1:8000/account/update/', 'GET');
      console.log(data.message);
      alert(data.message)
      navigate('/Earn')
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };
    







  return (
    <Container>
      <Wrapper>
        <Left>

        <button onClick={logoutUser}>LOGOUT</button>
       
          <SearchContainer>
              <Input type="text" onChange={e => setSearch(e.target.value)} placeholder="search for the stock"/>
              <Button onClick={handleSubmit}>Search</Button>
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/"><Logo>Social-trading</Logo></Link>
        </Center>
        <Right>
          <MenuItem tooltipText="Watchlist">
          <Link to="/watchlist"><Badge color="primary">
              <AddShoppingCartIcon />
            </Badge>
          </Link>
          </MenuItem>

          <MenuItem tooltipText="Trader">
          <Link to="/traders"><Badge  color="primary">
              <AccountCircleIcon />
            </Badge>
          </Link> 
          </MenuItem>



          <MenuItem tooltipText="Stocks">
          <Link to="/stocks"><Badge color="primary">
              <TrendingUpIcon />
            </Badge>
          </Link> 
          </MenuItem>

          
          <MenuItem tooltipText="Portfolio">
          <Link to="/portfolio"><Badge color="primary">
              <AccountBalanceWalletIcon />
            </Badge>
          </Link> 
          </MenuItem>

          <MenuItem tooltipText="Earn">

          <Link to="/trader" onClick={handleSubmit}><Badge color="primary">
              <CurrencyExchangeIcon />
            </Badge>
          </Link> 
          </MenuItem>



          <MenuItem tooltipText="My Stocks">
          <Link to="/my_stocks"><Badge color="primary">
              <BookmarkBorderIcon />
            </Badge>
          </Link> 
          </MenuItem>
          
          <MenuItem tooltipText="Notifications">
          <Link to="/my_stocks"><Badge color="primary">
              <NotificationsIcon />
            </Badge>
          </Link> 
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
