import { useECommerceContext } from "../../Context/Context";
import {ImCart} from "react-icons/im/"
import "./Header.css";

const Header = () => {
  const { isLoggedIn, handleLogOut, inCart } = useECommerceContext();

  return (
    <div className="header">
      <div className="logo"></div>
      <div className="navMenu">
        <ul>
          <li>Min sida</li>
          <li>Produkter</li>
          <li>Kundkorg</li>
          {isLoggedIn && <li onClick={handleLogOut}>Logga ut</li>}
        </ul>

        <div className="cart">{inCart}</div>
        <ImCart className="large-icon" />
      </div>
    </div>
  );
};

export default Header;
