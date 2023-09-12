import { ChangeEvent } from "react";
import { useECommerceContext } from "../../Context/Context";
import "./RegistrationForm.css";

const Registration = () => {
  const { setIsRegistrated, username, setUsername, email, setEmail, password, setPassword, handleCreateSubmit } = useECommerceContext();

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // skickar data till server som genererar data.
  //Om data är false, betyder det att user redan finns i json-filen och
  // detta genererar en alert.
 

  return (
    <>
    <form className="registrationForm" onSubmit={handleCreateSubmit}>
      <h3>Skapa ny användare:</h3>
      <br />
      <label>Namn:</label>
      <input
      placeholder="namn"
        type="username"
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <label>Mail:</label>
      <input
      placeholder="name@mail.com"
        name="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
      />

      <br />
      <label>Lösenord:</label>
      <input
      placeholder="*****"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      <br />
      <button type="submit">Skapa konto</button>
    </form>
    <p className="return" onClick={()=>setIsRegistrated(true)}>Tillbaka</p>
    </>
  );
};

export default Registration;
