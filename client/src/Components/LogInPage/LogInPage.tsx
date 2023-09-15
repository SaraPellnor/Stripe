import { useUserContext } from "../../Context/UserContext";
import LogIn from "../LogIn/LogInForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import "./LogInPage.css";

const LogInPage = () => {
  const { isRegistrated } = useUserContext();

  return (
    <div className="formDiv">
      <h2>Välkommen till Gitarrbutiken!</h2>
      <h4>Du behöver identifiera dig innan du kan handla...</h4>
      {isRegistrated ? <LogIn /> : <RegistrationForm />}
    </div>
  );
};

export default LogInPage;
