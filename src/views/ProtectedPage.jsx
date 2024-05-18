import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { AccountCircle } from '@mui/icons-material';
import { Typography, Box, Menu, MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import MovingText from "../components/MovingText";




const Container = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Text = styled(Typography)`
  margin-left: 16px;
  font-size: 18px;
  color: #333;
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    display: block;
    padding: 10px 20px;
    font-size: 16px;
    color: #333;
    transition: background-color 0.3s;
  }

  &&:hover {
    background-color: #f0f0f0;
  }
`;

function ProtectedPage() {
  const [res, setRes] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("account/test/");
        setRes(response.data.response);
      } catch {
        alert("Must Log in First");
        setRes("Anonymous User");
        navigate("/login");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    // Handle option click here
    console.log("Option clicked:", option);
    // Close the menu
    handleMenuClose();
  };

  return (
    <Container>
      <IconButton onClick={handleMenuOpen}>
        <AccountCircleIcon style={{ fontSize: 48, color: '#3f51b5' }} />
      </IconButton>
      <Text>{res || "No data available"}</Text>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <StyledMenuItem onClick={() => handleOptionClick("add_money")}>Add Money</StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick("watchlist")}>Watchlist</StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick("my_stocks")}>My Stocks</StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick("my_traders")}>My Traders</StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick("custumer_support")}>Custumer Support</StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick("setting")}>Settings</StyledMenuItem>
      </Menu>
      {/* Add the MovingText component here */}
      <MovingText />
    </Container>
  );
}

export default ProtectedPage;