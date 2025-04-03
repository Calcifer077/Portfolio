import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { VisibilityProvider } from "./context/VisibilityContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VisibilityProvider>
      <App />
    </VisibilityProvider>
  </StrictMode>
);
