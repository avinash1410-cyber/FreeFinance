import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Wrapper, FirstComponent, SecondComponent, ThirdComponent, StockItem, ItemContainer } from '../components/Items';
import { First,Flex } from '../components/Helpers2';
import { Second } from './Portfolio';
import { Button } from '@material-ui/core';
import CustomButton from '../components/Button';
import BalanceForm from '../components/BalanceForm';


const Trader_Portfolio = () => {
  const api = useAxios();
  const [clients, setClients] = useState([]);
  const [traders, setTraders] = useState([]);
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const [orderResponse, tradersResponse,accountResponse] = await Promise.all([
          api.get("http://127.0.0.1:8000/trader/clients/"),
          api.get("http://127.0.0.1:8000/account/hires_list/"),
          api.get("http://127.0.0.1:8000/account/"),
        ]);
        console.log("Order data:", orderResponse.data);
        console.log("Traders data:", tradersResponse.data);
        console.log("Account data",accountResponse.data)
        // Set state accordingly
        setClients(orderResponse.data);
        setTraders(tradersResponse.data);
        setAccount(accountResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <ProtectedPage />
      <Announcement />
      <Navbar />
      <Wrapper>
        <FirstComponent>
          <ItemContainer>
            <h2>Other Traders</h2>
            {traders.map(trader => (
              <StockItem key={trader.id}>
                <p>Trader Name: {trader.cust.user.username}</p>
                {/* Add other trader details here */}
              </StockItem>
            ))}
          </ItemContainer>
        </FirstComponent>

        <SecondComponent>
          <ItemContainer>
            <h2>My Clients</h2>
            {clients.map(client => (
              <StockItem key={client.id}>
                <Flex>
                  <First>
                <p>Client: {client.user.username}</p>
                <p>Amount: {client.user.username}</p>
                </First>
                <Second>
                <p>Output: {client.user.username}</p>
                <CustomButton>Release</CustomButton>
                </Second>
                </Flex>
                {/* Add other portfolio details here */}
              </StockItem>
            ))}
          </ItemContainer>
        </SecondComponent>

        <ThirdComponent>
          <ItemContainer>
            <h2>My Balance: ${account?.balance}</h2>
           <BalanceForm/>
          </ItemContainer>
        </ThirdComponent>
      </Wrapper>
    </>
  );
};

export default Trader_Portfolio;