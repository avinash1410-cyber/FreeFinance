import React, { useState, useEffect } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';

const StockMarket = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://stock-market-api.com');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setData(receivedData);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    socket.onerror = (error) => {
      setError(error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      <h2>Stock Market Data</h2>
      <ul>
        {data && data.map((item, index) => (
          <li key={index}>{item.symbol}: {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockMarket;