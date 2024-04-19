import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAxios from '../utils/useAxios';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";


const PortfolioContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const StockItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Portfolio = () => {
  const [orders, setOrders] = useState([]);
  const api=useAxios();

  useEffect(() => {
    async function fetchData() {
        async function fetchData(){
              await api.get("/order/").then((res) => {
              console.log(res);
              setOrders(res.data);
            })
            .catch((err) => {
              console.log(err);
            });      
        };
        fetchData();
      };
    fetchData();
  }, []);



  return (
    <>
    <ProtectedPage/>
    <Announcement />
    <Navbar/>
    <PortfolioContainer>
      <h2>My Portfolio</h2>
      {orders.map(order => (
        <StockItem key={order.id}>
          <p>Stock Name: {order.stock.name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Current Price: ${order.stock.price}</p>
          <p>Total Value: ${order.amount}</p>
        </StockItem>
      ))}
    </PortfolioContainer>
    </>
  );
};

export default Portfolio;