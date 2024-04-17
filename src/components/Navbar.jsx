import { Badge, Button } from "@material-ui/core";
import { Search, ShoppingCartOutlined,AccountCircleOutlined, Dashboard } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import {
  Link,
} from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";









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
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
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
  const nav = useNavigate();


  const handleSubmit = async e => {
    console.log(i);
   nav(`/search/${i}`); 
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
          <MenuItem>
          <Link to="/cart"><Badge color="primary">
              <Dashboard />
            </Badge>
          </Link>
          </MenuItem>

          <MenuItem>
          <Link to="/artist"><Badge badgeContent={'traders'} color="primary">
              <AccountCircleOutlined />
            </Badge>
          </Link> 
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
