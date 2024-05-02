import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import useAxios from "../utils/useAxios";

function PopUp({ open, onClose, actionType, stockId, client_id = null }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const api = useAxios();

  const handleAction = async () => {
    try {
      if (actionType === 'add') {
        const response = await api.post('http://127.0.0.1:8000/account/add_to_watchlist/', { "stock_id": stockId, 'name': name });
        console.log(response.data);
        alert(response.data.response);
      } else if (actionType === 'buy' && client_id === null) {
        const response = await api.post('http://127.0.0.1:8000/account/buy_stock/', { "stock_id": stockId, 'quantity': quantity, 'order_price': price });
        console.log(response.data);
      } else if (actionType === 'buy' && client_id) {
        const response = await api.post('http://127.0.0.1:8000/account/buy_stock/', { "stock_id": stockId, 'quantity': quantity, 'order_price': price, client: true, client_id: client_id });
        console.log(response.data);
      } else if (actionType === 'sell' && client_id === null) {
        const response = await api.post('http://127.0.0.1:8000/account/sell_stock/', { "stock_id": stockId, 'quantity': quantity, 'order_price': price });
        console.log(response.data);
      } else if (actionType === 'sell' && client_id ) {
        const response = await api.post('http://127.0.0.1:8000/account/sell_stock/', { "stock_id": stockId, 'quantity': quantity, 'order_price': price, client: true, client_id: client_id});
        console.log(response.data);
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
    calculateTotal(newQuantity, price);
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
    calculateTotal(quantity, newPrice);
  };

  const calculateTotal = (newQuantity, newPrice) => {
    const newTotal = parseFloat(newQuantity) * parseFloat(newPrice);
    setTotal(newTotal.toFixed(2));
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{actionType === 'add' ? 'Add Stock' : actionType === 'buy' ? 'Buy Stock' : 'Sell Stock'}</DialogTitle>
        <DialogContent>
          {actionType === 'add' && (
            <TextField
              label="Watchlist Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {(actionType === 'buy' || actionType === 'sell') && (
            <>
              <TextField
                label="Quantity"
                variant="outlined"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <TextField
                label="Order Price"
                variant="outlined"
                value={price}
                onChange={handlePriceChange}
              />
              <TextField
                label="Total"
                variant="outlined"
                value={total}
                disabled
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAction} color="primary">
            {actionType === 'add' ? 'Add' : actionType === 'buy' ? 'Buy' : 'Sell'}
          </Button>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopUp;