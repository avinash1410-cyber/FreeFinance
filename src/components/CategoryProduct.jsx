import { useNavigate } from "react-router-dom";
import { Link,useParams } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import CategoryProductList from './CategoryProductList';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Product from "./Product";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;



function CategoryProduct(){
  const [products, setProducts] = useState([]);
  const{id}=useParams();
  console.log(id);

  useEffect(()=>{
    axios.get(`https://bishellapi.herokuapp.com/category/${id}`)
    .then((res)=>{
      setProducts(res.data);
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
  },[]);



  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item.id} name={item.name}  />
      ))}
    </Container>
  );



}

export default CategoryProduct;