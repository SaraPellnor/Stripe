import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./Components/LogIn/LogIn";
import Products from "./Components/Products/Products";
import Confirmation from "./Components/Confirmation/Confirmation";
import Pay from "./Components/Pay/Pay";
import "./App.css";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pay />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/confirmation" element={<Confirmation />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
      </Routes>
    </BrowserRouter >
    
  );
}

export default App;
