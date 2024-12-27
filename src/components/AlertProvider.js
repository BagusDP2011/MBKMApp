import React, { createContext, useState, useContext, useCallback } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showAlert = useCallback((message, severity = "info") => {
    setAlert({ open: true, message, severity });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Snackbar
        open={alert.open}
        // autoHideDuration={4000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={hideAlert}
          severity={alert.severity}
          icon={<CheckIcon />}
        >
          <AlertTitle>{alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}</AlertTitle>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
