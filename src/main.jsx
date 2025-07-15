import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ProviderContainer from "./providers/ProviderContainer.jsx";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ProviderContainer>
        <RouterProvider router={router}/>
      </ProviderContainer>
  </StrictMode>
);
