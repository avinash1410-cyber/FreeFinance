import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';




const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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
    { name: 'Nifty 50', change: '+1.5%', high: '15000', low: '14800', open: '14850', lastTraded: '14950' },
    { name: 'Banknifty', change: '-0.8%', high: '35000', low: '34800', open: '34950', lastTraded: '34850' },
    { name: 'Sensex', change: '+2.0%', high: '52000', low: '51700', open: '51850', lastTraded: '51950' }
  ];

  return (
    <>
    <Navbar></Navbar>
    <StyledTable>
      <thead>
        <tr>
          <StyledTh>Index name</StyledTh>
          <StyledTh>Change</StyledTh>
          <StyledTh>High</StyledTh>
          <StyledTh>Low</StyledTh>
          <StyledTh>Open</StyledTh>
          <StyledTh>Last Traded</StyledTh>
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
          </tr>
        ))}
      </tbody>
    </StyledTable>
    </>
  );
};

export default Indexes;