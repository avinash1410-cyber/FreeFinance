import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Wrapper, FirstComponent, SecondComponent,ThirdComponent,StockItem,ItemContainer } from '../components/Items';





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
    <Wrapper>
    <FirstComponent>
    
    <ItemContainer>
      <h2>My Orders</h2>
      {orders.map(order => (
        <StockItem key={order.id}>
          <p>Stock Name: {order.stock.name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Current Price: ${order.stock.price}</p>
          <p>Total Value: ${order.amount}</p>
        </StockItem>
      ))}
    </ItemContainer>
   
    </FirstComponent>
    <SecondComponent>
    
    <ItemContainer>
      <h2>My Portfolio</h2>
      {orders.map(order => (
        <StockItem key={order.id}>
          <p>Stock Name: {order.stock.name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Current Price: ${order.stock.price}</p>
          <p>Total Value: ${order.amount}</p>
        </StockItem>
      ))}
    </ItemContainer>
    </SecondComponent>

    <ThirdComponent>
    
    <ItemContainer>
      <h2>My Balance</h2>
      {orders.map(order => (
        <StockItem key={order.id}>
          <p>Stock Name: {order.stock.name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Current Price: ${order.stock.price}</p>
          <p>Total Value: ${order.amount}</p>
        </StockItem>
      ))}
    </ItemContainer>
    </ThirdComponent>
    </Wrapper>
    </>
  );
};

export default Portfolio;