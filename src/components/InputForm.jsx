import React, { useState } from 'react';
import styled from 'styled-components';
import { Form,Input,Button } from './Helpers2';


const InputForm = ({ mode,stockName }) => {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'sell') {
      console.log('Sell');
      console.log(stockName);
      console.log(quantity);
    } else {
      console.log('Buy');
      console.log(stockName);
      console.log(quantity);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      {mode === 'sell' ? (
        <>
        <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button type="submit">Sell</Button>
        </>
      ) : (
        <>
        <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button type="submit">Buy</Button>
        </>
      )}
    </Form>
  );
};

export default InputForm;
