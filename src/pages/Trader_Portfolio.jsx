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
import { Link } from 'react-router-dom';




const Trader_Portfolio = () => {
  const api = useAxios();
  const [clients, setClients] = useState([]);
  const [traders, setTraders] = useState([]);
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const [clientsResponse, tradersResponse,accountResponse] = await Promise.all([
          api.get("https://avi8654340.pythonanywhere.com/trader/clients/"),
          api.get("https://avi8654340.pythonanywhere.com/account/hires_list/"),
          api.get("https://avi8654340.pythonanywhere.com/account/"),
        ]);
        console.log("clients data:", clientsResponse.data);
        console.log("Traders data:", tradersResponse.data);
        console.log("Account data",accountResponse.data)
        // Set state accordingly
        setClients(clientsResponse.data);
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
                <Link to={`/trader/${trader.id}`}>
                <Flex>
                  <First>
                  <p>Trader Name: {trader.cust.user.username}</p>
                  <p>Contact: {trader.cust.phone}</p>
                  </First>
                  <Second>
                  <p>Balance(Profit/loss) : ${trader.cust.balance}</p>
                  <p>reach: {trader.clients.length}</p>
                  </Second>
                </Flex>
                </Link>
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
                 
                <Link to={`/trader/client/${client.id}`}>
                <First>              
                <></>
                <p>Client: {client.user.username}</p>
                <p>Amount: {client.balance}</p>
                </First>
                </Link>
                <Second>
                <p>Contact: {client.phone}</p>
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