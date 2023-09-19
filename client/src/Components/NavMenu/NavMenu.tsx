import {
  LiaOpencart,
  LiaUserSolid,
  LiaObjectUngroupSolid,
} from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import { useProductContext } from "../../Context/ProductContext";
import "./NavMenu.css";

const NavMenu = () => {
  const { isLoggedIn, handleLogOut } = useUserContext();
  const { inCartLength, setInCartLength } = useProductContext();

  const logOut = () => {
    setInCartLength(0)
    handleLogOut()
      }

  useEffect(() => {}, [inCartLength]);
  return (
    <div className="navMenu">
      <div>
        <NavLink to={"/"}>
          <LiaObjectUngroupSolid className={"icon"} />
        </NavLink>
      </div>
      <div className="user">
        {isLoggedIn && <p className="logedInDott"></p>}
        <NavLink to={"/orders"}>
          <div>
            <LiaUserSolid className={"icon"} />
          </div>
        </NavLink>
      </div>
      <div className="cart">
      {inCartLength > 0 && <p className="cart-num">{inCartLength}</p>}
        <NavLink to={"/cart"}>
          <div>
            <LiaOpencart className="icon" />
          </div>
        </NavLink>
      </div>
      <div>
        {isLoggedIn && (
          <IoLogOutOutline onClick={logOut} className="icon" />
        )}
      </div>
    </div>
  );
};

export default NavMenu;
