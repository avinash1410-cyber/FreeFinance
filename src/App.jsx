import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ViewStock from "./pages/ViewStock";
import Home from "./pages/Home";
import StockList from "./pages/StockList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Watchlist from "./pages/Watchlist";
import TraderPage from "./pages/TraderPage";
import { AuthProvider } from "./context/AuthContext";
//import Home from "./views/homePage";
//import Login from "./views/loginPage";
//import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";
import { PaytmButton } from "./components/PaytmButton";
import TraderProfile from "./pages/TraderProfile";
import Portfolio from "./pages/Portfolio";
import MyComponent from "./pages/Test";


const App = () => {
  return (
    <>

  <BrowserRouter>



  <AuthProvider>
    <Routes> 
      <Route path="/protected" element={<ProtectedPage/>}/>   
      <Route path="/" element={<Home/>} />
      {/* <Route path="search/:id" element={<SearchProduct/>} /> */}
      <Route path="login/" element={<Login />} />
      <Route path="watchlist/" element={<Watchlist />} />
      <Route path="stocks/" element={<StockList />} />
      <Route path="stocks/:id" element={<ViewStock />} />

      <Route path="portfolio/" element={<Portfolio />} />

      <Route path="trader/" element={<TraderPage />} />
      <Route path="trader/:id" element={<TraderProfile />} />
      <Route path="register/" element={<Register />} />
      <Route path="test/" element={<MyComponent />} />
    </Routes>

    </AuthProvider>
  </BrowserRouter>
  </>
  );
};

export default App;