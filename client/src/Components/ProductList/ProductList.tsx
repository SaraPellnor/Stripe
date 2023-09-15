import { useOrderContext } from "../../Context/OrderContext";
import { useProductContext } from "../../Context/ProductContext";
import { useEffect } from "react";
import "./ProductList.css";

const ProductList = () => {
  const { addToCart } = useOrderContext();
  const { products, fetchProducts } = useProductContext();
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="productWrapper">
      {products.map((product) => (
        <div className="productCard" key={product.id}>
          <h4>{product.title}</h4>
          <img src={product.img[0]} alt="" />
          <h4>{product.price}</h4>
          <button onClick={() => addToCart(product)}>Köp</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
