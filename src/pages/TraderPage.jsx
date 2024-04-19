import {React,useState,useEffect,useContext} from 'react'
import useAxios from '../utils/useAxios';
import styled from "styled-components";
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";




export default function TraderPage() {
  const api=useAxios();
  const [Traders, setTraders] = useState([]);

  useEffect(() => {
    async function fetchData(){
      fetch('http://127.0.0.1:8000/trader/', {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
      ).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            setTraders(json)
          });
        }
      });   
    };
    fetchData();
  }, []);

  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      
      <h1><center>Here is The list of our super Traders</center></h1>
      {Traders.length > 0 && (
        <ul>
          {Traders.map(Trader => (
            <li key={Trader.id}>{Trader.cust.user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );

}
