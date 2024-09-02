import {React,useState,useEffect,useContext} from 'react'
import useAxios from '../utils/useAxios';
import WatchlistItems from './WatchlistItems';
import AuthContext from '../context/AuthContext';
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";


export default function Order() {
  const api=useAxios();
  const [orders, setOrders] = useState([]);
  const {user}=useContext(AuthContext);

  useEffect(() => {
    async function fetchData(){
          await api.get("/order/").then((res) => {
          console.log(res);
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });      
    };
    fetchData();
  }, []);

  return (
<div>
  <ProtectedPage/>
  <Announcement />
  <Navbar />
  <h1>Your Orders</h1>
  <Navbar />
  {orders.map((order) => (
    <div key={order.id}>
      <h2>{order.name}</h2>
      <ul>
        <WatchlistItems stock={stock} key={stock.id}/>
      </ul>
    </div>
  ))}
</div>
  );
}