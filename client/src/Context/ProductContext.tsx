import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";

export interface IProducts {
  id: string;
  title: string;
  description: string;
  img: string[];
  price: number;
  quantity: number;
  default_price: string;
}

const ProductContext = createContext<{
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  fetchProducts: () => Promise<void>;
  addToCart: (product: IProducts) => void;
  inCartLength: number;
}>({
  products: [],
  setProducts: () => {},
  fetchProducts: async () => {},
  addToCart: () => {},
  inCartLength: 0,
});

// Krok
// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);

export function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [inCartLength, setInCartLength] = useState(0);

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

  const addToCart = (product: IProducts) => {
    if (inCartLength > 9) {
      return alert("Nu är varukorgen full du!!!!");
    }

    const existingCart = localStorage.getItem("inCart");
    const newObject = {
      title: product.title,
      price: product.default_price,
      quantity: product.quantity,
    };

    if (!existingCart) {
      localStorage.setItem("inCart", JSON.stringify([newObject]));
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
    }

    setInCartLength((prevLength) => {
      const updatedLength = prevLength + 1;
      console.log(updatedLength);

      localStorage.setItem("cartLength", JSON.stringify(updatedLength));
      return updatedLength;
    });
  };

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
