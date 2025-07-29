import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import ProviderContainer from "./providers/ProviderContainer.jsx";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProviderContainer>
      <Toaster toastOptions={{
        style: {
          zIndex: 99999999
        },
      }}></Toaster>
      <RouterProvider router={router} />
    </ProviderContainer>
  </StrictMode>
);
