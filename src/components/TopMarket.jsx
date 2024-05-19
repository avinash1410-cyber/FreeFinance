import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

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

const StyledCanvas = styled.canvas`
  max-width: 100px;
  height: 50px;
`;

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
`;

const TopMarket = () => {
  // Sample data
  const [indexesData] = useState([
    { name: 'Nifty 50', change: '+1.5%', marketCap: '$2.5T', graphData: [10, 20, 30, 40, 50] },
    { name: 'Banknifty', change: '-0.8%', marketCap: '$1.2T', graphData: [50, 40, 30, 20, 10] },
    { name: 'Sensex', change: '+2.0%', marketCap: '$3.0T', graphData: [20, 30, 40, 50, 60] },
    { name: 'Nasdaq', change: '+1.5%', marketCap: '$2.5T', graphData: [10, 20, 30, 40, 50] },
    { name: 'HQX', change: '-0.5%', marketCap: '$1.2T', graphData: [50, 40, 30, 20, 10] },
    { name: 'BSE', change: '+2.%', marketCap: '$3.0T', graphData: [20, 30, 40, 50, 60] },
    { name: 'NSE', change: '+1.2%', marketCap: '$2.5T', graphData: [10, 20, 30, 40, 50] },
    { name: 'Alibaba', change: '-0.8%', marketCap: '$1.2T', graphData: [50, 40, 30, 20, 10] },
    { name: 'Marvel', change: '-2.0%', marketCap: '$3.0T', graphData: [20, 30, 40, 50, 60] },
    // Add more data entries here...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

  const renderGraphs = () => {
    indexesData.forEach((index, indexKey) => {
      const graphCanvas = document.getElementById(`graph-${indexKey}`);
      if (graphCanvas) {
        new Chart(graphCanvas, {
          type: 'bar',
          data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
              label: 'Stock Price',
              data: index.graphData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    });
  };

  useEffect(() => {
    renderGraphs();
  }, [renderGraphs]);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = indexesData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <Container>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Index name</StyledTh>
              <StyledTh>Change</StyledTh>
              <StyledTh>Market Cap</StyledTh>
              <StyledTh>Graph</StyledTh>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((index, indexKey) => (
              <tr key={indexKey}>
                <StyledTd>{index.name}</StyledTd>
                <StyledTd>{index.change}</StyledTd>
                <StyledTd>{index.marketCap}</StyledTd>
                <StyledTd>
                  <StyledCanvas id={`graph-${indexKey}`} width="100" height="50"></StyledCanvas>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        {/* Pagination */}
        <PaginationContainer>
          {Array.from({ length: Math.ceil(indexesData.length / rowsPerPage) }, (_, i) => (
            <PaginationButton key={i} onClick={() => handleClickPage(i + 1)}>{i + 1}</PaginationButton>
          ))}
        </PaginationContainer>
      </Container>
    </>
  );
};

export default TopMarket;