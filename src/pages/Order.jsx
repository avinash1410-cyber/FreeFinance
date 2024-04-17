import {React,useState,useEffect,useContext} from 'react'
import axios from "axios";
import useAxios from '../utils/useAxios';
import CartItems from './CartItems';
import Product from '../components/Product';
import OrderItems from './OrderItems';
import styled from "styled-components";
import Navbar from '../components/Navbar';



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;


export default function Order() {
  const api=useAxios();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData(){
      try {
          await api.get("/order/").then((res) => {
          console.log(res);
          setProducts(res.data);
          console.log(products); 
        })
        .catch((err) => {
          console.log(err);
        });
      } catch {
        console.log("Something went wrong");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      <Navbar/>
      <Container>
        {products.map((item) => 
        (
          <OrderItems item={item} key={item.id} name={item.name}  />
        ))}
      </Container>
         
    </div>
    
  );
}
