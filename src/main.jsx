import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";


const customTheme = {
  button: {
    defaultProps: {
      color: "primary",
      variant: "filled",
    },
    styles: {
      base: {
        initial: {
          fontWeight: "font-medium",
          borderRadius: "rounded-lg",
        },
      },
    },
  },
  input: {
    defaultProps: {
      color: "primary",
      variant: "outlined",
    },
  },
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider value={customTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
