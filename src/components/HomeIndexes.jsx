import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';





const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const Box = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Heading = styled.h2`
  margin-bottom: 10px;
`;

const Home_Indexes = () => {
  const [niftyValue, setNiftyValue] = useState(null);
  const [banNiftyValue, setBanNiftyValue] = useState(null);
  const [sensexValue, setSensexValue] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const responseAAPL = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=T20B7MJT31CC4TU4`);
        const responseMSFT = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=T20B7MJT31CC4TU4`);
        const responseTSLA = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=T20B7MJT31CC4TU4`);
        
        const dataAAPL = await responseAAPL.json();
        const dataMSFT = await responseMSFT.json();
        const dataTSLA = await responseTSLA.json();

        console.log('AAPL data:', dataAAPL);
        console.log('MSFT data:', dataMSFT);
        console.log('TSLA data:', dataTSLA);

        // Extract the current price for each stock from the API response
        const currentPriceAAPL = parseFloat(dataAAPL['Global Quote']['05. price']);
        const currentPriceMSFT = parseFloat(dataMSFT['Global Quote']['05. price']);
        const currentPriceTSLA = parseFloat(dataTSLA['Global Quote']['05. price']);

        // Set the state for each stock value
        setNiftyValue(currentPriceAAPL);
        setBanNiftyValue(currentPriceMSFT);
        setSensexValue(currentPriceTSLA);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []); // Empty dependency array to execute only once on component mount

  return (
    <div>
      <Link to={"/indexes"}><p>All Indexes</p></Link>
      <Wrapper>
        <Box>
          <Heading>Nifty 50</Heading>
          {niftyValue && <p>Current Nifty value: {niftyValue}</p>}
        </Box>
        <Box>
          <Heading>BanNifty</Heading>
          {banNiftyValue && <p>Current BankNifty value: {banNiftyValue}</p>}
          
        </Box>
        <Box>
          <Heading>Sensex</Heading>
          {sensexValue && <p>Current Sensex value: {sensexValue}</p>}
        </Box>
      </Wrapper>
    </div>
  );
};

export default Home_Indexes;