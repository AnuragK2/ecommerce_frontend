import logo from "./logo.svg";
import "./App.css";
import HomePage from "./customer/pages/HomePage/HomePage";
import Footer from "./customer/components/Footer/Footer";
import Navigation from "./customer/components/navigation/Navigation";
import Product from "./customer/components/Product/Product";
import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
import Cart from "./customer/components/Cart/Cart";
import Checkout from './customer/components/Checkout/Checkout';
import Order from "./customer/components/Order/Order";
import OrderDetails from "./customer/components/Order/OrderDetails";
import { Route, Routes } from "react-router-dom";
import CustomerRoute from "./Routers/CustomerRoute";

function App() {
  return (
    <div className="">

      <Routes>
        <Route path='/*' element={<CustomerRoute />}></Route>
        
      </Routes>
      
      
    
    </div>
  );
}

export default App;
