import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-info">
        <h3>Kontakta oss</h3>
        <p>Har du frågor? Skicka oss ett meddelande:</p>
        <input
          type="text"
          placeholder="Skriv din fråga här"
          className="input"
        />
        <button className="submit-button">Skicka</button>
      </div>
      <div className="info">
        <h3>Övrig information</h3>
        <ul>
          <li>Om oss</li>
          <li>Kundtjänst</li>
          <li>Frakt och leverans</li>
          <li>Returer och byten</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
