import { useEffect } from "react";
import { useProductContext } from "../../Context/ProductContext";
import "./Header.css";

const Header = () => {
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
    </div>
  );
};

export default Header;
