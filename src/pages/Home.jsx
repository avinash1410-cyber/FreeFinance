import React from "react";

import Footer from "../components/Footer";

import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import HomeStocks from "../components/HomeStocks";
import HomeTraders from "../components/HomeTraders";
import {Link} from "../components/Helpers";
import { useNavigate } from "react-router-dom";




const Home = () => {
  const { user } = useContext(AuthContext);
  const handleNavigation = useNavigate();
  console.log(user);
  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      <Slider />
      <Link onClick={() => handleNavigation('/stocks/')}><h2>Stocks</h2></Link>
      <HomeStocks/>
      <Link onClick={() => handleNavigation('/traders/')}><h2>Traders</h2></Link>
      <HomeTraders/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;