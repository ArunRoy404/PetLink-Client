import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ProviderContainer from "./providers/ProviderContainer.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ProviderContainer>
        <App />
      </ProviderContainer>
  </StrictMode>
);
