import {React,useState,useEffect,useContext} from 'react'
import axios from "axios";
import useAxios from '../utils/useAxios';
import CartItems from './CartItems';
import Product from '../components/Product';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Cart() {
  const api=useAxios();
  const [products, setProducts] = useState([]);
  const {user}=useContext(AuthContext);

  useEffect(() => {
    async function fetchData(){
          await api.get("/cart/").then((res) => {
          console.log(res);
          console.log(user);
          setProducts(res.data);
          console.log(products); 
        })
        .catch((err) => {
          console.log(err);
        });      
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      <Navbar></Navbar>
      {products.map((item) => (
        <CartItems item={item} key={item.id} name={item.name}  />
      ))}
    
    </div>

  );
}
