import {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
  FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isRegistrated: boolean;
  setIsRegistrated: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  checkCookie: () => Promise<void>;

  handleCreateSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogInSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogOut: () => void;
}>({
  password: "",
  setPassword: () => {},
  email: "",
  setEmail: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isRegistrated: true,
  setIsRegistrated: () => {},
  username: "",
  setUsername: () => {},
  checkCookie: async () => {},

  handleCreateSubmit: async () => {},
  handleLogInSubmit: async () => {},
  handleLogOut: () => {},
});

// Krok
// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistrated, setIsRegistrated] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isUrlRegistration, setIsUrlRegistration] = useState(false);
  const navigate = useNavigate();

  const handleCreateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validering av lösenord
    if (password.length < 8) {
      return alert("Lösenordet måste vara minst 8 karaktärer långt!");
    }
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLetter || !hasNumber) {
      return alert("Lösenordet måste innehålla bokstäver och siffror!");
    }

    //Skickar iväg formuläret
    const response = await fetch("http://localhost:3000/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    setIsUrlRegistration(true);
    navigate("/login");
    data ? setIsRegistrated(true) : alert("Användaren finns redan registrerad");
  };

  // Hanterar inloggningen
  const handleLogInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await response.json();

    if (data == "Användaren hittades inte.") {
      return alert("Användaren hittades inte.");
    }

    if (data == "Felaktigt lösenord.") {
      return alert("Felaktigt lösenord.");
    }

    setIsLoggedIn(true);
    localStorage.setItem("userId", JSON.stringify(data.id));
    isUrlRegistration ? navigate(-3) : navigate(-1);
    setIsUrlRegistration(false);
  };

  // Hanterar utloggningen
  const handleLogOut = async () => {
    try {
      await fetch("/api/logout");

      localStorage.clear();
      setIsLoggedIn(false);
      setIsRegistrated(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Kollar cookie och där med om man är inloggad.
  const checkCookie = async () => {
    try {
      const response = await fetch("/api/check-cookie");
      if (response.ok) {
        const data = await response.json();

        if (data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          // navigate("/");
        }
      } else {
        console.error("Något gick fel med fetch-förfrågan.", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
// checkcookie kontinuerligt
  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isRegistrated,
        setIsRegistrated,
        email,
        setEmail,
        password,
        setPassword,
        username,
        setUsername,

        handleCreateSubmit,
        handleLogInSubmit,
        handleLogOut,
        checkCookie,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
