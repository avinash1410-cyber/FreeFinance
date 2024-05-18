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
import Home_Indexes from "../components/HomeIndexes";





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
      <Home_Indexes></Home_Indexes>
      <Link onClick={() => handleNavigation('/stocks/')}><h3>stocks</h3></Link>
      <HomeStocks/>
      <Link onClick={() => handleNavigation('/traders/')}><h3>traders</h3></Link>
      <HomeTraders/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;