import {React,useState,useEffect,useContext} from 'react'
import useAxios from '../utils/useAxios';
import styled from "styled-components";
import Navbar from '../components/Navbar';




export default function ArtistPage() {
  const api=useAxios();
  const [Artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchData(){
      fetch('http://127.0.0.1:8000/artist/', {
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
            setArtists(json)
          });
        }
      });   
    };
    fetchData();
  }, []);

  return (
    <div>
      <center><Navbar></Navbar></center>
      <h1><center>Here is The list of our super Traders</center></h1>
      {Artists.length > 0 && (
        <ul>
          {Artists.map(Artist => (
            <li key={Artist.id}>{Artist.cust.user.username}</li>
          ))}
        </ul>
      )}
      Daily,weekly,monthly,yearly
    </div>
  );

}
