import React, { useState, useEffect, useContext } from 'react';
import { Badge, Button, Popover, Typography, List, ListItem, ListItemText } from '@mui/material';
import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  AddShoppingCart as AddShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  AccountCircle as AccountCircleIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);
  const api = useAxios();

  useEffect(() => {
    if (anchorEl) {
      fetchNotifications();
    }
  }, [anchorEl, fetchNotifications]); // Include fetchNotifications in the dependency array

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await api.get('https://avi8654340.pythonanywhere.com/account/notifications/');
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleEarnClick = async () => {
    try {
      const response = await api.get('https://avi8654340.pythonanywhere.com/account/update/');
      console.log(response);
      alert(response.data.response);
      navigate('/Earn');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  const menuItems = [
    { icon: <AddShoppingCartIcon />, text: 'Watchlist', link: '/watchlist' },
    { icon: <AccountCircleIcon />, text: 'Trader', link: '/traders' },
    { icon: <TrendingUpIcon />, text: 'Stocks', link: '/stocks' },
    { icon: <AccountBalanceWalletIcon />, text: 'Portfolio', link: '/portfolio' },
    { icon: <CurrencyExchangeIcon onClick={handleEarnClick} />, text: 'Earn' },
    { icon: <BookmarkBorderIcon />, text: 'My Stocks', link: '/my_stocks' },
    { icon: <NotificationsIcon onClick={handleNotificationsClick} />, text: 'Notifications' } // Handle click for notifications
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
              <a href={item.link || '#'} onClick={item.onClick}>
                <Badge color="primary">
                  {item.icon}
                </Badge>
              </a>
            </MenuItem>
          ))}
        </Right>
      </Wrapper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List sx={{ width: '300px', maxWidth: 360 }}>
          {loading ? (
            <Typography sx={{ p: 2 }}>Loading...</Typography>
          ) : notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={notification} />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ p: 2 }}>No new notifications</Typography>
          )}
        </List>
      </Popover>
    </Container>
  );
};

export default Navbar;