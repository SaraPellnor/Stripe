import { createContext, useState, useContext, PropsWithChildren } from "react";

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
}>({
  products: [],
  setProducts: () => {},
  fetchProducts: async () => {},
});

// Krok
// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);

export function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<IProducts[]>([]);

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

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
