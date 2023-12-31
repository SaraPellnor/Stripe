import { ChangeEvent } from "react";
import "./RegistrationForm.css";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

// skickar registreringsformuläret till handleCreateSubmit function i user context

const Registration = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleCreateSubmit,
  } = useUserContext();
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="registrationDiv">
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
      <p className="return" onClick={() => navigate("/login")}>
        Tillbaka
      </p>
    </div>
  );
};

export default Registration;
