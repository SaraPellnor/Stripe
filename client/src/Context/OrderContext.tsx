import { createContext, useState, useContext, PropsWithChildren } from "react";

import { IProducts } from "./ProductContext";

interface IItemObj {
  amount_total: number;
  description: string;
  price: number;
  quantity: number;
}

interface IOrderCompleted {
  customer: string;
  items: IItemObj;
  orderDate: string;
  totalPrice: number;
}

const OrderContext = createContext<{
  inCart: IProducts[];
  setInCart: React.Dispatch<React.SetStateAction<IProducts[]>>;
  orderCompleted: IOrderCompleted;
  inCartLength: number

  addToCart: (product: IProducts) => void;
  handleCheckout: () => void;
  fetchOrderSuccess: () => void;
}>({
  inCart: [],
  setInCart: () => {},
  orderCompleted: {
    customer: "",
    items: {
      amount_total: 0,
      description: "",
      price: 0,
      quantity: 0,
    },
    orderDate: "",
    totalPrice: 0,
  },
  inCartLength: 0,

  addToCart: () => {},
  handleCheckout: () => {},
  fetchOrderSuccess: () => {},
});

// Krok
// eslint-disable-next-line react-refresh/only-export-components
export const useOrderContext = () => useContext(OrderContext);

export function OrderProvider({ children }: PropsWithChildren) {
  const [inCart, setInCart] = useState<IProducts[]>([]);
  const [orderCompleted, setOrderCompleted] = useState<IOrderCompleted>(Object);
  const [inCartLength, setInCartLength] = useState(0);
  const handleCheckout = async () => {
    try {
      const newArray = inCart.map((item) => ({
        price: item.default_price,
        quantity: item.quantity,
      }));

      const userId = JSON.parse(localStorage.getItem("userId") || "null");

      const response = await fetch(
        "http://localhost:3000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            order: newArray,
            user: userId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("order_id", JSON.stringify(data.session_id));
        window.location = data.url;
      } else {
        console.error("Något gick fel vid skapandet av checkout-session.");
      }
    } catch (error) {
      console.error("Ett fel inträffade:", error);
    }
  };

  const fetchOrderSuccess = async () => {
    try {
      const orderId = JSON.parse(localStorage.getItem("order_id") || "null");

      const response = await fetch(
        `http://localhost:3000/order-success/${orderId}`
      );

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      const itemArray = data.item.map((element: IItemObj) => ({
        description: element.description,
        price: element.amount_total,
        quantity: element.quantity,
      }));

      // Skapa ett objekt av typ IOrderResume
      const resumeObj = {
        customer: data.customer,
        orderDate: data.orderDate,
        totalPrice: data.totalPrice,
        items: itemArray,
      };

      setOrderCompleted(resumeObj);
      setInCart([]);
      localStorage.removeItem("order_id");
      localStorage.removeItem("inCart");
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product: IProducts) => {
    if (inCartLength > 9) {
      return alert("Nu är varukorgen full du!!!!");
    }
    const existingCart = localStorage.getItem("inCart");

    if (!existingCart) {
      const newArray = [product];
      localStorage.setItem("inCart", JSON.stringify(newArray));
      setInCart(newArray);
    } else {
      const cartArray = JSON.parse(existingCart);

      const productIndex = cartArray.findIndex(
        (item: IProducts) => item.id === product.id
      );
      if (productIndex !== -1) {
        cartArray[productIndex].quantity += 1;
      } else {
        cartArray.push(product);
      }

      setInCartLength(inCartLength + 1);
      console.log(inCartLength);

      setInCart(cartArray);
      localStorage.setItem("inCart", JSON.stringify(cartArray));
    }
  };

  return (
    <OrderContext.Provider
      value={{
        inCart,
        setInCart,
        orderCompleted,
        inCartLength,

        addToCart,
        handleCheckout,
        fetchOrderSuccess,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
