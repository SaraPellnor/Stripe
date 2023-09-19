import { useProductContext } from "../../Context/ProductContext";
import { useEffect } from "react";
import "./ProductList.css";

const ProductList = () => {
  const { products, fetchProducts, addToCart } = useProductContext();

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="productWrapper">
      {products.length == 0 ? (
        <div className="aanimationDiv">
          <div className="animation"></div>
          <h3>Laddar produkterna...</h3>
        </div>
      ) : (
        products.map((product) => (
          <div className="productCard" key={product.id}>
            <img src={product.img[0]} alt="" />
            <h4>{product.title}</h4>
            <h4>{product.price} kr</h4>
            <button onClick={() => addToCart(product)}>Köp</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
