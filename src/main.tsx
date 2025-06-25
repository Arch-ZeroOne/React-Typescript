import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/output.css";
import "./css/loader.css";
import App from "./App.tsx";
import LoadingContext from "./context/LoadingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingContext>
      <App />
    </LoadingContext>
  </StrictMode>
);
