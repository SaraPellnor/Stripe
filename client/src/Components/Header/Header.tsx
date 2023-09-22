import "./Header.css";

// Header logo och rabattkod. 

const Header = () => {
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
