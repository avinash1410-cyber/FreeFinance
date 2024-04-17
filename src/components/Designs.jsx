import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { Link } from 'react-router-dom';
import axios from 'axios';
import DesignView from '../pages/DesignView';


const Image = styled.img`
height: 75%;
z-index: 2;
`;

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Designs = () => {

  const [products, setProducts] = useState([]);
useEffect(() => {
    fetchProducts();
  }, []);
const fetchProducts = () => {
    axios
      .get('https://bishellapi.herokuapp.com/design/')
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
          <h1>Designs Avilable</h1>
      {
        products.map((item) => (
        <div>
            <Image src={`http://localhost:8000${item.image}`}  alt={"Image of Product"} width="600px" height="600px"/>
        </div>
        ))
      
      
      }
    </Container>
  );
};
export default Designs;