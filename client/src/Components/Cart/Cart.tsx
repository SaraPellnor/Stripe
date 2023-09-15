import { IProducts } from "../../Context/ProductContext";
import { useOrderContext } from "../../Context/OrderContext";
import "./Cart.css";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Cart = () => {
  const { handleCheckout } = useOrderContext();

  const { isLoggedIn } = useUserContext();
  const [totalPrice, setTotalPrice] = useState();
  const navigateTo = useNavigate();
  const inCart = JSON.parse(localStorage.getItem("inCart") || "null");
  useEffect(() => {
    if (inCart) {
      const sum = inCart.reduce(
        (accumulator: number, item: { quantity: number; price: number }) => {
          return accumulator + item.quantity * item.price;
        },
        0
      );
      setTotalPrice(sum);
    }
  }, []);

  const handleCheckoutClick = () => {
    if (isLoggedIn) {
      handleCheckout();
    } else {
      navigateTo("/login");
    }
  };

  return (
    <div className="cartWrapper">
      {inCart != null ? (
        <div className="inCart">
          <table>
            <thead>
              <tr>
                <th>Titel</th>
                <th>Pris</th>
                <th>Antal</th>
              </tr>
            </thead>
            {inCart.map((item: IProducts) => {
              return (
                <tbody key={item.title}>
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div>Totalpris: {totalPrice} kr</div>

          <button onClick={handleCheckoutClick}>Gå till betalningen</button>
        </div>
      ) : (
        <h1>Här vart det tomt!</h1>
      )}
    </div>
  );
};

export default Cart;
