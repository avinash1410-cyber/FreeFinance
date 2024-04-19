import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import useAxios from '../utils/useAxios';

export default function TraderProfile() {
  const { id } = useParams();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/trader/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const json = await response.json();
          setTrader(json);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false); // Set loading state to false when done fetching
      }
    }

    fetchData();
  }, [id]);

  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      <center><Navbar /></center>
      <h1><center>Here is The list of our super Traders</center></h1>
      {loading ? ( // Render loading state
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Username: {trader?.cust.user.username}</h3> {/* Use optional chaining to avoid errors */}
        </div>
      )}
    </div>
  );
}