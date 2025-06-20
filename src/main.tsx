import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/output.css";
import "./css/loader.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
