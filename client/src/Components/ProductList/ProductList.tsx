import { useECommerceContext, IProducts } from "../../Context/Context";
import { useEffect, useState } from "react";
import "./ProductList.css"

const ProductList = () => {
  const { products, addToCart } = useECommerceContext() as { products: IProducts[], addToCart: (id: string) =>  void };
  const [prices, setPrices] = useState<Record<string, IPrice>>({});

  // Interface på prices
  interface IPrice {
      price: number,
      id: string
    }
  

  useEffect(() => {
    console.log(products);
    
    // Hämta priser för alla produkter
    const fetchPrices = async () => {
      const pricePromises = products.map(async (product) => {
        const response = await fetch(`http://localhost:3000/prices/${product.price_id}`);
        const data = await response.json();
        return { [product.price_id]: data };
      });

      // inväntar hämtningen av alla produktpriser
      const priceData = await Promise.all(pricePromises);
      // konventerar listan till ett objekt istället för att göra den mer lätthanterlig
      const priceMap = Object.assign({}, ...priceData);
      // sparar objectet i ett state
      setPrices(priceMap);
      console.log("prices",prices);
      
    };

    fetchPrices();
  }, [products]);

  return (
    <div className="productWrapper">
      {products.map((product) => (
        <div className="productCard" key={product.id}>
          <h4>{product.title}</h4>
          <img src={product.img[0]} alt="" />
          <h4>{prices[product.price_id] ? prices[product.price_id].price : "Laddar pris..."}</h4>
          <button onClick={ () => addToCart(product.id)}>Köp</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;