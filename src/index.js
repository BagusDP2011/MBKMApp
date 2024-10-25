import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./assets/css/satoshi.css";
import { AuthProvider } from "./service/AuthContext";

const theme = createTheme({
  typography: {
    // fontFamily: "Poppins, Arial, sans-serif",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    fontSize: 16,
    // fontFamily: 'Satoshi, Arial, sans-serif',
    // allVariants: {
    //   fontWeight: 600,
    // },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
