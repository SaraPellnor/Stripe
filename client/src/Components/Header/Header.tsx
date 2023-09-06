import "./Header.css"

const Header = () => {
    const isLoggedIn = true
  return (
    <div className="header">
        <div className="logo"></div>
        <div className="navMenu">
        <ul>
            <li>Min sida</li>
            <li>Produkter</li>
            <li>Kundkorg</li>
            {isLoggedIn && <li>Logga ut</li>}
        </ul>
        </div>
    </div>
  )
}

export default Header