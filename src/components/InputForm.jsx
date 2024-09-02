import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from './Helpers2';
import useAxios from "../utils/useAxios";

const InputForm = ({ mode, stock }) => {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState(0); // State to hold the total value
  const api = useAxios();

  useEffect(() => {
    // Recalculate total whenever quantity or price changes
    if (quantity && price) {
      setTotal(quantity * price);
    } else {
      setTotal(0);
    }
  }, [quantity, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(mode === 'sell' ? 'https://avi8654340.pythonanywhere.com/account/sell_stock/' : 'https://avi8654340.pythonanywhere.com/account/buy_stock/', {
        "stock_id": stock.id,
        "order_price": price,
        "quantity": quantity,
        "client": false,
        "client_id": null
      });
      console.log(response.data);
      alert(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      {mode === 'sell' && (
        <>
          <Input
            type="text"
            placeholder="Total"
            value={total} // Display the total value
            readOnly // Make the input read-only
          />
          <Button type="submit">Sell</Button>
        </>
      )}
      {mode === 'buy' && (
        <>
        <Input
        type="text"
        placeholder="Total"
        value={total} // Display the total value
        readOnly // Make the input read-only
         />
        <Button type="submit">Buy</Button>
        </>
      )}
    </Form>
  );
};

export default InputForm;