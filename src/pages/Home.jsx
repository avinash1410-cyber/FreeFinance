import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ProtectedPage from "../views/ProtectedPage";


const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      <Slider />
      {/* <Categories />
      <Products/> */}
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
