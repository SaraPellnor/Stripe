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
    
    // localStorage.setItem("userId", data);
    navigate("/login")

    data ? setIsRegistrated(true) : alert("Användaren finns redan registrerad");
  };

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
    navigate(-1);
  };

  const handleLogOut = async () => {
    try {
      await fetch("/api/logout");
      
      localStorage.clear();
      setIsLoggedIn(false);
      setIsRegistrated(false)
      navigate("/");
      
    } catch (error) {
      console.log(error);
    }
  };

  const ceckCookie = async () => {
    try {
      const response = await fetch("/api/check-cookie");
      if (response.ok) {
        // Kontrollera om förfrågan var framgångsrik
        const data = await response.json();

        if (data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate("/");
        }
      } else {
        console.error("Något gick fel med fetch-förfrågan.", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ceckCookie();
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
