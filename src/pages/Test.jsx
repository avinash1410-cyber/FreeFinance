import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

function MyComponent() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    console.log('Input value:', inputValue);
    setOpen(false); // Close the dialog after action
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Pop-up
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pop-up Title</DialogTitle>
        <DialogContent>
          <TextField
            label="Input Value"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAction} color="primary">
            Action
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default MyComponent;