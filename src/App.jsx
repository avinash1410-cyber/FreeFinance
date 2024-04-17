import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ViewProduct from "./pages/ViewProduct";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Categories from "./components/Categories";
import CategoryProduct from "./components/CategoryProduct";
import SearchProduct from "./components/SearchProduct";
import Order from "./pages/Order";
import ArtistPage from "./components/ArtistPage";
import Upload from "./components/ArtistPage";
import Designs from "./components/Designs";

import { AuthProvider } from "./context/AuthContext";
//import Home from "./views/homePage";
//import Login from "./views/loginPage";
//import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";
import { PaytmButton } from "./components/PaytmButton";



const App = () => {
  return (
    <>

  <BrowserRouter>



  <AuthProvider>
    <Routes> 
      <Route path="/protected" element={<ProtectedPage/>}/>   
      <Route path="/" element={<Home/>} />
      <Route path="search/:id" element={<SearchProduct/>} />
      <Route path="login/" element={<Login />} />
      <Route path="watchlist/" element={<Cart />} />
      <Route path="add_to_watchlist/" element={<Cart />} />
      <Route path="sell_stock/" element={<Order />} />
      <Route path="buy_stock/" element={<ArtistPage />} />
      <Route path="update/" element={<Upload />} />
      <Route path="register/" element={<Register />} />
      <Route path="product/:id" element={<ViewProduct/>} />
      <Route path="stocks/" element={<ProductList />} />
      <Route path="category/" element={<Categories />} />
      <Route path="category/:id" element={<CategoryProduct />} />
      <Route path="designs/" element={<Designs/>} />
      <Route path="pay/:id" element={<PaytmButton/>} />
    </Routes>

    </AuthProvider>
  </BrowserRouter>
  </>
  );
};

export default App;