import { ChangeEvent } from "react";
import "./LogInForm.css";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

// skickar loginformuläret till handleLogInSubmit function i user context

const LogIn = () => {
  const navigateTo = useNavigate();
  const { handleLogInSubmit, email, setEmail, password, setPassword } =
    useUserContext();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="logInDiv">
      <h1>Du behöver logga in</h1>
      <form className="LogInForm" onSubmit={handleLogInSubmit}>
        <label>Mail:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label>Lösenord:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button type="submit">Logga in</button>
      </form>
      <p>
        Inget konto ännu? Registrera dig{" "}
        <a onClick={() => navigateTo("/registration")}>här</a>
      </p>
    </div>
  );
};

export default LogIn;
