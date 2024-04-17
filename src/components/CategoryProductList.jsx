import {React,useState,useEffect} from 'react'
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;





export default function CategoryProductList(props) {


  const{ id }=useParams();
  const [products, setProducts] = useState([]);
useEffect(() => {
    fetchProducts();
  }, []);
const fetchProducts = () => {
  console.log(id);
    axios
      .get(`https://bishellapi.herokuapp.com/${id}`)
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
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
}