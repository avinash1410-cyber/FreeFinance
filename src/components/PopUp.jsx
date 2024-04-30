import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import useAxios from "../utils/useAxios";

function PopUp({ open, onClose, actionType, stockId, client_id = null }) {
  const [inputValue, setInputValue] = useState('');
  const api = useAxios();
  // const { hitRequest, handleNavigation } = useApiRequest();

  const handleAction = async () => {
    if (actionType === 'add') {
      console.log('Add Stock:', inputValue);
      try {
        const response = await api.post('http://127.0.0.1:8000/account/add_to_watchlist/',{ "stock_id": stockId, 'name': inputValue });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else if (actionType === 'buy' && client_id === null) {
      console.log('Buy Stock:', inputValue);
      try {
        const response = await api.post('http://127.0.0.1:8000/account/buy_stock/',{ "stock_id": stockId, 'amount': inputValue,client: false, client_id: null });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else if (actionType === 'buy' && client_id) {
      console.log('Buy Stock:', inputValue);
      try {
        const response = await api.post('http://127.0.0.1:8000/account/buy_stock/',{ "stock_id": stockId, 'amount': inputValue, client: true, client_id: client_id });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else if (actionType === 'sell' && client_id === null) {
      console.log('Sell Stock:', inputValue);
      try {
        const response = await api.post('http://127.0.0.1:8000/account/sell_stock/',{ "stock_id": stockId, 'quantity': inputValue });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    onClose();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  let dialogContent;
  if (actionType === 'add') {
    dialogContent = (
      <DialogContent>
        <TextField
          label="Watchlist Name"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
        />
      </DialogContent>
    );
  } else if (actionType === 'buy') {
    dialogContent = (
      <DialogContent>
        <TextField
          label="Amount"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
        />
      </DialogContent>
    );
  } else if (actionType === 'sell') {
    dialogContent = (
      <DialogContent>
        <TextField
          label="Quantity"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
        />
      </DialogContent>
    );
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{actionType === 'add' ? 'Add Stock' : actionType === 'buy' ? 'Buy Stock' : 'Sell Stock'}</DialogTitle>
        {dialogContent}
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