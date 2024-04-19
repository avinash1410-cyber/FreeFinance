import { useState, useEffect, useContext } from 'react';
import useAxios from '../utils/useAxios';
import WatchlistItems from './WatchlistItems';
import AuthContext from '../context/AuthContext';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

export default function Watchlist() {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/account/my_watchlist/");
        setWatchlists(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [api]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post('/account/create_watchlist/', { name: inputValue });
      if (res.data.message === "Successful") {
        navigate("/portfolio");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    handleSubmit();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <ProtectedPage />
      <Announcement />
      <Navbar />
      <div>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Watchlist
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Watchlist</DialogTitle>
          <DialogContent>
            <TextField
              label="Watchlist Name"
              variant="outlined"
              value={inputValue}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAction} color="primary" disabled={!inputValue.trim() || loading}>
              {loading ? <CircularProgress size={24} /> : 'Create'}
            </Button>
            <Button onClick={handleClose} color="secondary" disabled={loading}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <h1><center>Your Watchlist</center></h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        watchlists.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <ul>
              {item.stock.map((stock) => (
                <li key={stock.id}>
                  <WatchlistItems stock={stock} key={stock.id} />
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}