import {
  LiaOpencart,
  LiaUserSolid,
  LiaObjectUngroupSolid,
} from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useUserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import { useProductContext } from "../../Context/ProductContext";

const Header = () => {
  const { isLoggedIn, handleLogOut } = useUserContext();
  const { inCartLength } = useProductContext();
  useEffect(() => {}, [inCartLength]);
  return (
    <div className="header">
      <div className="logo"></div>
      <div className="cupong">
        <p>
          10% rabatt med rabattkoden
          <span style={{ fontWeight: "bold" }}> GITARR2023 </span>
        </p>
      </div>
      <div className="navMenu">
        <div>
          <NavLink to={"/orders"}>
            <LiaUserSolid className={"icon"} />
          </NavLink>
        </div>
        <div>
          <NavLink to={"/"}>
            <LiaObjectUngroupSolid className={"icon"} />
          </NavLink>
        </div>
        <div className="cart">
          <p className="cart-num">{inCartLength > 0 && inCartLength}</p>
          <NavLink to={"/cart"}>
            <div>
              <LiaOpencart className="icon" />
            </div>
          </NavLink>
        </div>
        <div>
          {isLoggedIn && (
            <IoLogOutOutline onClick={handleLogOut} className="icon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
