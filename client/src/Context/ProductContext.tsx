import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { IProducts, IProductInCart } from "../Interfaces/Interfaces";

//ProductContext
const ProductContext = createContext<{
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  fetchProducts: () => Promise<void>;
  addToCart: (product: IProducts) => void;
  inCartLength: number;
  setInCartLength: React.Dispatch<React.SetStateAction<number>>;
  inCart: IProductInCart[];
  setInCart: React.Dispatch<React.SetStateAction<IProductInCart[]>>;
}>({
  products: [],
  setProducts: () => {},
  fetchProducts: async () => {},
  addToCart: () => {},
  inCartLength: 0,
  setInCartLength: () => {},
  inCart: [],
  setInCart: () => {},
});

// Krok
// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);

export function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [inCartLength, setInCartLength] = useState(0);
  const [inCart, setInCart] = useState<IProductInCart[]>([]);

  // hämtar produkterna från stripe
  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/get-all-products");

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  //Lägger till produkt till varukorgen
  const addToCart = (product: IProducts) => {
    if (inCartLength > 9) {
      return alert("Nu är varukorgen full du!!!!");
    }

    const existingCart = localStorage.getItem("inCart");
    const newObject = {
      title: product.title,
      default_price: product.default_price,
      price: product.price,
      quantity: product.quantity,
    };

    if (!existingCart) {
      localStorage.setItem("inCart", JSON.stringify([newObject]));
      setInCart([newObject]);
    } else {
      const cartArray = JSON.parse(existingCart);

      const productIndex = cartArray.findIndex(
        (item: IProducts) => item.title === product.title
      );

      if (productIndex !== -1) {
        cartArray[productIndex].quantity += 1;
      } else {
        cartArray.push(newObject);
      }

      localStorage.setItem("inCart", JSON.stringify(cartArray));
      setInCart(cartArray);
    }

    setInCartLength((prevLength) => {
      const updatedLength = prevLength + 1;

      localStorage.setItem("cartLength", JSON.stringify(updatedLength));
      return updatedLength;
    });
  };

  //sätter cartLength från LS
  useEffect(() => {
    const cartLength = JSON.parse(localStorage.getItem("cartLength") || "null");

    cartLength != null ? setInCartLength(cartLength) : setInCartLength(0);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        addToCart,
        inCartLength,
        setInCartLength,
        inCart,
        setInCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
