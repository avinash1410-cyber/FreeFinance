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
import { Link } from "../components/Helpers";
import { useNavigate } from "react-router-dom";
import HomeIndexes from "../components/HomeIndexes"; // Renamed to follow PascalCase convention
import HomeCategories from "../components/HomeCategories";
import TopMarket from "../components/TopMarket";

const Home = () => {
  const { user } = useContext(AuthContext);
  const handleNavigation = useNavigate();
  console.log(user);
  return (
    <div>
      <ProtectedPage />
      <Announcement />
      <Navbar />
      <Slider />
      <HomeIndexes /> {/* Corrected component name */}
      <Link
        onClick={() => handleNavigation("/stocks/")}
        style={{ fontWeight: "bold" }}
      >
        ALL STOCKS
      </Link>
      <HomeStocks />
      <Link
        onClick={() => handleNavigation("/traders/")}
        style={{ fontWeight: "bold" }}
      >
        ALL TRADERS
      </Link>
      <HomeTraders />
      <span style={{ fontWeight: "bold" }}>Top Sectors</span>
      <HomeCategories />
      <span style={{ fontWeight: "bold" }}>Top by Market Cap</span>
      <TopMarket />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;