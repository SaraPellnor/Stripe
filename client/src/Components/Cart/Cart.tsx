import { useOrderContext } from "../../Context/OrderContext";
import "./Cart.css";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IProductInCart,
  useProductContext,
} from "../../Context/ProductContext";

const Cart = () => {
  const { handleCheckout } = useOrderContext();

  const { isLoggedIn } = useUserContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const { inCart, setInCart, setInCartLength } = useProductContext();

  const navigateTo = useNavigate();

  const handleCheckoutClick = () => {
    if (isLoggedIn) {
      handleCheckout();
    } else {
      navigateTo("/login");
    }
  };

  const removeItem = (item: IProductInCart) => {
    if (inCart) {
      const productIndex = inCart.findIndex(
        (object: IProductInCart) => object.title === item.title
      );
      if (item.quantity > 1) {
        inCart[productIndex].quantity -= 1;
        setInCart(inCart);
        localStorage.setItem("inCart", JSON.stringify(inCart));
      } else {
        inCart.splice(productIndex, 1);
        setInCart(inCart);
        localStorage.setItem("inCart", JSON.stringify(inCart));
      }
      setInCartLength((prevLength) => {
        const updatedLength = prevLength - 1;

        localStorage.setItem("cartLength", JSON.stringify(updatedLength));
        return updatedLength;
      });
    }
  };

  useEffect(() => {
    setInCart(JSON.parse(localStorage.getItem("inCart") || "null"));
    window.scrollTo(0, 410);
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

  return (
    <div className="cartWrapper">
      {inCart != null ? (
        <div className="inCart">
          <h1>Din varukorg</h1>
          <table>
            <thead>
              <tr>
                <th>Titel</th>
                <th>Pris</th>
                <th>Antal</th>
                <th></th>
              </tr>
            </thead>
            {inCart.map((item: IProductInCart) => {
              return (
                <tbody key={item.title}>
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td onClick={() => removeItem(item)}>
                      <div className="trash"></div>
                    </td>
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
