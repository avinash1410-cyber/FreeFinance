import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import useAxios from "../utils/useAxios";
import useApiRequest from './useApiRequest';




function PopUp({ open, onClose, actionType, stockId }) {
  const [inputValue, setInputValue] = useState('');
  const api = useAxios();
  const { hitRequest, handleNavigation } = useApiRequest();

  const handleAction = async () => {
    if (actionType === 'add') {
      // Perform action for adding
      console.log('Add Stock:', inputValue);
      console.log(stockId);
      console.log(inputValue);
      try {
        const response = await hitRequest('http://127.0.0.1:8000/account/add_to_watchlist/','POST',{"stock_id":stockId,'name':inputValue});
        console.log(response.data);
      } catch(error) {
        console.log(error);
      }

    } else if (actionType === 'buy') {
      // Perform action for buying
      console.log('Buy Stock:', inputValue);
      console.log(stockId);
      console.log(inputValue);
      try {
        const response = await hitRequest('http://127.0.0.1:8000/account/add_to_watchlist/','POST',{"stock_id":stockId,'name':inputValue});
        console.log(response.data);
      } catch(error) {
        console.log(error);
      }

    } else if (actionType === 'sell') {
      // Perform action for selling
      console.log('Sell Stock:', inputValue);
      console.log(stockId);
      console.log(inputValue);

      try {
        const response = await hitRequest('http://127.0.0.1:8000/account/add_to_watchlist/','POST',{"stock_id":stockId,'name':inputValue});
        console.log(response.data);
      } catch(error) {
        console.log(error);
      }

      
    }
    onClose(); // Close the dialog after action
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
