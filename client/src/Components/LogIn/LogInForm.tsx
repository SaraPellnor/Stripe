import { ChangeEvent } from "react";
import { useECommerceContext } from "../../Context/Context";
import "./LogInForm.css";

const LogIn = () => {
  const { setIsRegistrated, handleLogInSubmit, email, setEmail, password, setPassword } = useECommerceContext();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegistration = () => {
    setIsRegistrated(false);
  };

  return (
    <>
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
        <a onClick={handleRegistration}>här</a>
      </p>
    </>
  );
};

export default LogIn;
