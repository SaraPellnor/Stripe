import { Routes, Route } from "react-router-dom";
import ProductList from "../ProductList/ProductList";
import Cart from "../Cart/Cart";
import "./Main.css";
import OrderSuccess from "../OrderSuccess/OrderSuccess";
import OrderFaild from "../OrderFaild/OrderFaild";
import LogInForm from "../LogIn/LogInForm";
import Orders from "../Orders/Orders"
import Registration from "../RegistrationForm/RegistrationForm";
const Main = () => {
  return (
    <div className="main">
      
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/order-succsess" element={<OrderSuccess />} />
        <Route path="/order-faild" element={<OrderFaild />} />
      </Routes>
    </div>
  );
};

export default Main;
