import { IProducts } from "../../Context/ProductContext";
import { useOrderContext } from "../../Context/OrderContext";
import "./Cart.css";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  console.log("cart");

  const { inCart, handleCheckout } = useOrderContext();
  const { isLoggedIn } = useUserContext();
const navigateTo = useNavigate()
  const totalPrice = inCart.reduce((accumulator, item) => {
    return accumulator + item.quantity * item.price;
  }, 0);

  const handleCheckoutClick = () => {
    if (isLoggedIn) {
      handleCheckout();
    } else {
      navigateTo("/login");
    }
  };

  return (
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
            <tbody key={item.id}>
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
  );
};

export default Cart;
