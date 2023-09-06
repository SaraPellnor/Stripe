import {Routes, Route} from "react-router-dom"
import Pay from "../../Pay/Pay"
import ProductList from "../../ProductList/ProductList"
import "./Main.css"

const Main = () => {
  return (
    <div className="main">
    <Routes>
    <Route path="/productlist" element={<ProductList />} />
    <Route path="/pay" element={<Pay />} />
</Routes>
</div>
  )
}

export default Main