import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { ECommerceProvider } from "./Context/Context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ECommerceProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ECommerceProvider>
);
