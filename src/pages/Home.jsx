import React from "react";

import Footer from "../components/Footer";

import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ProtectedPage from "../views/ProtectedPage";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";

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
