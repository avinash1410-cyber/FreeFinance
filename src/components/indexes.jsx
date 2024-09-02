import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
  padding: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #dddddd;
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
`;

const StyledTd = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
`;

const Indexes = () => {
  // Sample data
  const indexesData = [
    { name: 'Nifty 50', change: '+1.5%', high: '15000', low: '14800', open: '14850', lastTraded: '14950', volume: '10M', marketCap: '$2.5T' },
    { name: 'Banknifty', change: '-0.8%', high: '35000', low: '34800', open: '34950', lastTraded: '34850', volume: '5M', marketCap: '$1.2T' },
    { name: 'Sensex', change: '+2.0%', high: '52000', low: '51700', open: '51850', lastTraded: '51950', volume: '8M', marketCap: '$3.0T' },
    { name: 'Dow Jones', change: '-0.3%', high: '35000', low: '34800', open: '34950', lastTraded: '34850', volume: '20M', marketCap: '$10T' },
    { name: 'NASDAQ', change: '+1.2%', high: '15000', low: '14800', open: '14850', lastTraded: '14950', volume: '15M', marketCap: '$8T' },
    { name: 'FTSE 100', change: '-0.5%', high: '52000', low: '51700', open: '51850', lastTraded: '51950', volume: '12M', marketCap: '$2.2T' }
  ];

  return (
    <>
      <Navbar />
      <Container>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Index name</StyledTh>
              <StyledTh>Change</StyledTh>
              <StyledTh>High</StyledTh>
              <StyledTh>Low</StyledTh>
              <StyledTh>Open</StyledTh>
              <StyledTh>Last Traded</StyledTh>
              <StyledTh>Volume</StyledTh>
              <StyledTh>Market Cap</StyledTh>
            </tr>
          </thead>
          <tbody>
            {indexesData.map((index, indexKey) => (
              <tr key={indexKey}>
                <StyledTd>{index.name}</StyledTd>
                <StyledTd>{index.change}</StyledTd>
                <StyledTd>{index.high}</StyledTd>
                <StyledTd>{index.low}</StyledTd>
                <StyledTd>{index.open}</StyledTd>
                <StyledTd>{index.lastTraded}</StyledTd>
                <StyledTd>{index.volume}</StyledTd>
                <StyledTd>{index.marketCap}</StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Container>
    </>
  );
};

export default Indexes;