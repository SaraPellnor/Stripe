import {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
  FormEvent,
} from "react";

export interface IProducts {
  id: string;
  title: string;
  description: string;
  img: string[];
  price_id: string;
}

const ECommerceContext = createContext<{
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
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  inCart: number;
  setInCart: React.Dispatch<React.SetStateAction<number>>;

  handleCreateSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogInSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogOut: () => void;
  addToCart: (id: string) => void;
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
  products: [],
  setProducts: () => {},
  inCart: 0,
  setInCart: () => {},

  handleCreateSubmit: async () => {},
  handleLogInSubmit: async () => {},
  handleLogOut: () => {},
  addToCart: () => {},
});

// Krok
// eslint-disable-next-line react-refresh/only-export-components
export const useECommerceContext = () => useContext(ECommerceContext);

export function ECommerceProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistrated, setIsRegistrated] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState<IProducts[]>([]);
  const [inCart, setInCart] = useState(0);

  //  !localStorage.getItem("id") && localStorage.setItem("id", [])

  // const cart = localStorage.getItem("id");
  // if (cart) {
  //   setInCart(JSON.parse(cart).length);
  // }

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
  };

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/logout");
      const data = await response.json();
      console.log(data);

      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/get-all-products");

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      setProducts(data);
      console.log("products", data);
    } catch (error) {
      console.error(error);
    }
  }
  const ceckCookie = async () => {
    try {
      const response = await fetch("/api/check-cookie");
      if (response.ok) {
        // Kontrollera om förfrågan var framgångsrik
        const data = await response.json();
        console.log("in check data: ", data);

        if (data) {
          console.log("i ifsats i checkcookie", data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        console.error("Något gick fel med fetch-förfrågan.", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (id: string) => {
    const existingCart = localStorage.getItem("id");

    if (!existingCart) {
      const newArray = [id];
      localStorage.setItem("id", JSON.stringify(newArray));
    } else {
      const cartArray = JSON.parse(existingCart);

      cartArray.push(id);
      setInCart(cartArray.length);
      localStorage.setItem("id", JSON.stringify(cartArray));
    }
  };

  useEffect(() => {
    const cart = localStorage.getItem("id");
    if (cart) {
      setInCart(JSON.parse(cart).length);
    }

    fetchProducts();
    ceckCookie();
  }, []);

  return (
    <ECommerceContext.Provider
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
        products,
        setProducts,
        inCart,
        setInCart,

        handleCreateSubmit,
        handleLogInSubmit,
        handleLogOut,
        addToCart,
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
}
