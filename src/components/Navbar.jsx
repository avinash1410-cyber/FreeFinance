import { Badge, Button } from "@mui/material";
import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  AddShoppingCart as AddShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  AccountCircle as AccountCircleIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import styled from "styled-components";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from '../utils/useAxios';






const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  position: relative;

  &:hover::after {
    content: "${({ tooltipText }) => tooltipText}";
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

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);
  const api = useAxios();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://avi8654340.pythonanywhere.com/account/search/', { key: searchTerm });
      console.log(response.data);
      navigate('/search', { state: { results: response.data } });
    } catch (error) {
      console.error('Error searching:', error);
    }
  };





  async function handleEarnClick() {
    try {
      const Response = await api.get("https://avi8654340.pythonanywhere.com/account/update/");
      console.log(Response);
      alert(Response.data.response);
      navigate('/Earn');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const menuItems = [
    { icon: <AddShoppingCartIcon />, text: "Watchlist", link: "/watchlist" },
    { icon: <AccountCircleIcon />, text: "Trader", link: "/traders" },
    { icon: <TrendingUpIcon />, text: "Stocks", link: "/stocks" },
    { icon: <AccountBalanceWalletIcon />, text: "Portfolio", link: "/portfolio" },
    { icon: <CurrencyExchangeIcon onClick={handleEarnClick} />, text: "Earn" },
    { icon: <BookmarkBorderIcon />, text: "My Stocks", link: "/my_stocks" },
    { icon: <NotificationsIcon />, text: "Notifications" } // Implement your notification popup logic here
  ];

  return (
    <Container>
      <Wrapper>
        <Left>
          <button onClick={logoutUser}>LOGOUT</button>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for stocks"
            />
            <Button type="submit">Search</Button>
          </form>
        </Left>
        <Center>
          <Link to="/"><Logo>Social Trading</Logo></Link>
        </Center>
        <Right>
          {menuItems.map((item, index) => (
            <MenuItem key={index} tooltipText={item.text}>
              <a href={item.link}>
                <Badge color="primary">
                  {item.icon}
                </Badge>
              </a>
            </MenuItem>
          ))}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;