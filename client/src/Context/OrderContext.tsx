import { createContext, useState, useContext, PropsWithChildren } from "react";
import { IProducts } from "../Interfaces/Interfaces";
import {IOrderCompleted, IOrders} from "../Interfaces/Interfaces"

const OrderContext = createContext<{
  orderCompleted: IOrderCompleted;
  orders: IOrders[];
  handleCheckout: () => void;
  fetchOrderSuccess: () => void;
  fetchOrders: () => void;
}>({
  orderCompleted: {
    orderId: "",
    customer: "",
    item: [
      {
        id: "",
        description: "",
        price: 0,
        quantity: 0,
      },
    ],
    orderDate: "",
    totalPrice: 0,
  },
  orders: [
    {
      orderId: "",
      orderDate: "",
      totalPrice: 0,
      item: [],
      customer: "",
    },
  ],
  handleCheckout: () => {},
  fetchOrderSuccess: () => {},
  fetchOrders: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useOrderContext = () => useContext(OrderContext);

export function OrderProvider({ children }: PropsWithChildren) {
  const [orderCompleted, setOrderCompleted] = useState<IOrderCompleted>(Object);
  const [orders, setOrders] = useState<IOrders[]>([]);

  // Skickar order till stripe checkout session 
  const handleCheckout = async () => {
    try {
      const inCart = JSON.parse(localStorage.getItem("inCart") || "null");

      const newArray = inCart.map((item: IProducts) => ({
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

  // Hanterar lyckad order och renderar ut ny genomförd order
  const fetchOrderSuccess = async () => {
    try {
      const orderId = JSON.parse(localStorage.getItem("order_id") || "null");
      if (!orderId) {
        return;
      }

      const response = await fetch(
        `http://localhost:3000/order-success/${orderId}`
      );

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      setOrderCompleted(data);

      localStorage.removeItem("inCart");
      localStorage.removeItem("cartLength");
      localStorage.removeItem("order_id");
    } catch (error) {
      console.error(error);
    }
  };

  //Hämtar alla orders från user och renderar ut dom på ordersidan
  const fetchOrders = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId") || "null");

      if (!userId) return;
      const response = await fetch(`http://localhost:3000/orders/${userId}`);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      if (response.headers.get("content-length") === "0") {
        console.warn("Din order är tom.");
        setOrders([]);
      } else {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderCompleted,
        orders,
        handleCheckout,
        fetchOrderSuccess,
        fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
