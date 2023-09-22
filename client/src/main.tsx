import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Context/UserContext.tsx";
import { ProductProvider } from "./Context/ProductContext.tsx";
import { OrderProvider } from "./Context/OrderContext.tsx";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <OrderProvider>
    <UserProvider>
      <ProductProvider>
          <App />
      </ProductProvider>
    </UserProvider>
    </OrderProvider>
  </BrowserRouter>
);
