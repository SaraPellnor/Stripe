import { ImCart } from "react-icons/im/";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useUserContext } from "../../Context/UserContext";
import { useOrderContext } from "../../Context/OrderContext";
import { useEffect } from "react";

const Header = () => {
  const { isLoggedIn, handleLogOut } = useUserContext();
  const { inCart, setInCart } = useOrderContext();
  useEffect(() => {
    const cart = localStorage.getItem("inCart");
    if (cart) {
      setInCart(JSON.parse(cart));
    } else if (!cart) {
      setInCart([]);
    }
  }, []);
  return (
    <div className="header">
      <div className="logo"></div>
      <div className="cupong">
        <p>10% rabatt med rabattkoden GITARR2023</p>
      </div>
      <div className="navMenu">
        <ul>
          <li>Min sida</li>
          <NavLink to={"/"}>
            <li>Produkter</li>{" "}
          </NavLink>
          <li>Kundkorg</li>
          {isLoggedIn ? (
            <li onClick={handleLogOut}>Logga ut</li>
          ) : (
            <NavLink to={"/login"}>
              <li>Logga in</li>
            </NavLink>
          )}
        </ul>
        <NavLink to={"/cart"}>
          <div className="cart">{inCart.length > 0 && inCart.length}</div>
          <ImCart className="cart-icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
